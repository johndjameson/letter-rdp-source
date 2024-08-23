import { Parser } from "../src/Parser.ts";

console.log(JSON.stringify(new Parser().parse("123"), null, 2)); // NUMBER
console.log(JSON.stringify(new Parser().parse("'single'"), null, 2)); // STRING
console.log(JSON.stringify(new Parser().parse('"double"'), null, 2)); // STRING
console.log(JSON.stringify(new Parser().parse("     333    "), null, 2)); // Whitespace (null)
console.log(
  JSON.stringify(
    new Parser().parse(`// single line comment
    42`),
    null,
    2,
  ),
); // Single-line comment (null)

// Multi-line comment
console.log(
  JSON.stringify(
    new Parser().parse(`/*
    Multi-line comment
    */
    42`),
    null,
    2,
  ),
);
