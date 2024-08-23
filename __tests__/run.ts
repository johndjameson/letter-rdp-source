import { Parser } from "../src/Parser.ts";

console.log(JSON.stringify(new Parser().parse("123"), null, 2));
console.log(JSON.stringify(new Parser().parse('"foo"'), null, 2));
