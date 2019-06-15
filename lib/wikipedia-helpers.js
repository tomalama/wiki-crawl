const axios = require("axios");
const BASE_WIKIPEDIA_API = "https://en.wikipedia.org/w/api.php";

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

module.exports = {
  getWikipediaArticleURL
};
