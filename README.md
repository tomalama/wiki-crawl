# Wikipedia Crawler

## Usage

```javascript
const { wikipediaCrawler } = require("wikipedia-crawler");

wikipediaCrawler("Luigi", "Philosophy").then(res => console.log(res));

/*
[
  "Luigi",
  "Character (arts)",
  "Person",
  "Reason",
  "Consciousness",
  "Quality (philosophy)",
  "Philosophy"
];
*/
```
