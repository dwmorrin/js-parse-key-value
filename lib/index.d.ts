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
declare function parse(s: string, options?: ParseOptions): Record<string, string>;
export default parse;
