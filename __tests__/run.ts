import { Parser } from "../src/Parser.ts";

console.log(JSON.stringify(new Parser().parse("123"), null, 2));
console.log(JSON.stringify(new Parser().parse("'single'"), null, 2));
console.log(JSON.stringify(new Parser().parse('"double"'), null, 2));
