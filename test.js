import parse from "./index.js";

const tests = [
  ["basic", "key: value", { key: "value" }],
  ["quoted value", "key: ' a value '", { key: " a value " }],
  ["quoted key", "'a key:': value", { "a key:": "value" }],
];

const compare = (a, b) => JSON.stringify(a) === JSON.stringify(b);

for (const [label, input, expected] of tests) {
  const res = parse(input);
  if (compare(res, expected)) console.log(label, ": pass");
  else console.log("fail", { label, input, expected, res });
}
