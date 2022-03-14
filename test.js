import parse from "./lib/index.js";

const tests = [
  ["basic", "key: value", {}, { key: "value" }],
  ["quoted value", "key: ' a value '", {}, { key: " a value " }],
  ["quoted key", "'a key:': value", {}, { "a key:": "value" }],
  ["delimiter: '='", "key=value", { delimiter: "=" }, { key: "value" }],
  [
    "multiple keys",
    "key1: value1 key2: value2",
    {},
    { key1: "value1", key2: "value2" },
  ],
  [
    "multiple keys, comma separated",
    "key1: value1, key2: value2",
    { IFS: /[\s,]+/ },
    { key1: "value1", key2: "value2" },
  ],
];

const compare = (a, b) => JSON.stringify(a) === JSON.stringify(b);

for (const [label, input, options, expected] of tests) {
  const res = parse(input, options);
  if (compare(res, expected)) console.log(label, ": pass", res);
  else console.log("fail", { label, input, expected, res });
}
