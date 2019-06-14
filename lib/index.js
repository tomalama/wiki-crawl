const axios = require("axios");
const Crawler = require("crawler");

const BASE_WIKIPEDIA_API = "https://en.wikipedia.org/w/api.php";
const BASE_WIKIPEDIA_URL = "https://en.wikipedia.org";

const getWikipediaArticleURL = async searchString => {
  try {
    const url = `${BASE_WIKIPEDIA_API}`;
    const response = await axios.get(url, {
      params: {
        action: "opensearch",
        format: "json",
        limit: 1,
        namespace: 0,
        search: searchString
      }
    });
    const reponseURL = response.data[3][0];
    return reponseURL;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const wikipediaCrawler = (searchString, endTitle) => {
  return new Promise(async (resolve, reject) => {
    const startURL = await getWikipediaArticleURL(searchString);
    if (!startURL) {
      reject("Could not find Wikipedia article.");
    }
    const titles = [];
    const crawler = new Crawler({
      callback: (err, res, done) => {
        if (err) {
          done();
          return reject(err);
        }
        const $ = res.$;
        const rawTitle = $("title").text();
        const index = rawTitle.indexOf("-");
        const title = rawTitle.substr(0, index).trim();
        titles.push(title);

        if (title === endTitle) {
          done();
          return resolve(titles);
        }

        const content = $(".mw-parser-output")[0];
        const mainContent = content.children;

        let contentLength = mainContent.length;
        let counter = 0;
        let hyperlink = null;

        while (!hyperlink) {
          if (mainContent[counter].name === "p") {
            let p = mainContent[counter];
            hyperlink = p.children.find(child => child.name === "a");
          }
          counter++;

          if (counter === contentLength) {
            return reject("Could not find hyperlink.");
          }
        }

        const href = hyperlink.attribs.href;
        const url = href.includes("http")
          ? href
          : `${BASE_WIKIPEDIA_URL}${href}`;
        crawler.queue(url);

        done();
      }
    });
    crawler.queue(startURL);
  });
};

module.exports = {
  wikipediaCrawler
};
