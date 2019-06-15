# Wikipedia Crawler

## About

Explore how all [Wikipedia](https://en.wikipedia.org/) articles seemingly lead to [philosophy](https://en.wikipedia.org/wiki/Philosophy).

## CLI

```shell
npx wikipedia-crawler start -v -s Canada
```

## Demo

<img alt="demo" src="https://i.imgur.com/PcR0sOb.gif">

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
