export interface ParseOptions {
  delimiter?: string;
  IFS?: RegExp;
  quotes?: string;
  debug?: boolean;
}

/**
 * parse "'key': 'value'" input
 *
 * language syntax:
 *  delimiter: default ':', can be any string
 *  IFS: default /\s+/, can be any RegExp
 *  quotes: default `"'`, can be any string
 *
 * The string "key1: value1 key2: value2" is parsed as
 * {key1: "value1", key2: "value2"}
 */
function parse(
  s: string,
  options = {} as ParseOptions
): Record<string, string> {
  const {
    delimiter = ":",
    IFS = /\s+/,
    quotes = `"'`,
    debug = false,
  } = options;
  const chars = s.split("");
  chars.reverse();
  let key = "";
  let word = "";
  let quote = false;
  const res: Record<string, string> = {};
  while (chars.length) {
    if (debug) console.log({ chars, res, key, word, quote });
    const token = chars.pop() || ""; // should never be undefined
    if (quotes.includes(token)) quote = !quote;
    else if (token === delimiter) {
      if (quote) word += token;
      else {
        if (!word) throw new Error("syntax error");
        key = word;
        word = "";
      }
    } else if (IFS.test(token)) {
      if (quote) word += token;
      else {
        while (IFS.test(chars[chars.length - 1])) chars.pop();
        if (key && word) {
          res[key] = word;
          key = "";
          word = "";
        }
      }
    } else word += token;
  }
  if (quote) throw new Error("unterminated quote");
  if (key && word) res[key] = word;
  else throw new Error("unexpected end of input");
  return res;
}

export default parse;
