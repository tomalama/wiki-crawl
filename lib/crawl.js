const Crawler = require("crawler");
const { getWikipediaArticleURL } = require("./wikipedia-helpers");

const BASE_WIKIPEDIA_URL = "https://en.wikipedia.org";
const DEFAULT_END_TITLE = "Philosophy";

const wikipediaCrawler = (searchString, options) => {
  const { endTitle = DEFAULT_END_TITLE, verboseLevel = 0 } = options;

  const INFO = message => {
    if (verboseLevel >= 1) {
      console.log(message);
    }
  };

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

        INFO(title);

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
            hyperlink = p.children.find(
              child =>
                child.name === "a" && !child.attribs.href.includes("wiktionary")
            );
          }
          counter++;

          if (counter === contentLength) {
            return reject(
              `Could not find hyperlink at the "${title}" article.`
            );
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

module.exports = { wikipediaCrawler };
