#!/usr/bin/env node
const argv = require("yargs")
  .usage("Usage: $0 <command> [options]")
  .command("start", "Start the crawl")
  .options({
    s: {
      alias: "string",
      demandOption: true,
      describe: "Name of the Wikipedia article to start the crawl with",
      type: "string",
      nargs: 1
    },
    v: {
      alias: "verbose",
      demandOption: false,
      describe: "Set verbose level to INFO",
      type: "boolean"
    }
  })
  .example("$0 start -s Canada")
  .help("h")
  .alias("h", "help").argv;

const { wikipediaCrawler } = require("./crawl");
const searchString = argv.s;
const verboseLevel = argv.verbose;

wikipediaCrawler(searchString, { verboseLevel })
  .then(res => console.log(res))
  .catch(err =>
    console.error(`Could not crawl with "${searchString}": ` + err)
  );
