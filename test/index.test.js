const { wikiCrawl } = require("../lib/index");

it("should equal expected array", async () => {
  const END_TITLE = "Philosophy";
  const expected = [
    "Luigi",
    "Character (arts)",
    "Person",
    "Reason",
    "Consciousness",
    "Quality (philosophy)",
    "Philosophy"
  ];
  const res = await wikiCrawl("Luigi", END_TITLE);
  expect(res).toEqual(expected);
});
