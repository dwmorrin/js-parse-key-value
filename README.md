# Parse Key Value

- For parsing simple key value pairs.
- Keys and values do not have to be quoted like JSON.
- Keys and values can be quoted to include whitespace in the token.

## Usage

```js
import parse from "js-parse-key-value";

const ex1 = parse("key: value");
// ex1 is {key: "value"}
const ex2 = parse("key=value", { delimiter: "=" });
// ex2 is {key: "value"}
const ex3 = parse('"quoted key": "quoted value"');
// ex3 is {"quoted key": "quoted value"}

// IFS option must be a regular expression.
const ex4 = parse("a: 1, b: 2", { IFS: /[\s,]+/ });
// ex3 is { a: 1, b: 2 }
```
