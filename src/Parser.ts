import { Tokenizer } from "./Tokenizer.ts";

type TokenType = "NUMBER";

/**
 * Letter parser: recursive descent implementation
 */
export class Parser {
  #lookahead: ReturnType<Tokenizer["getNextToken"]>;
  #string = "";
  #tokenizer = new Tokenizer();

  /**
   * Parses a string into an AST
   */
  parse(string: string) {
    this.#string = string;
    this.#tokenizer.init(string);

    // Prime the tokenizer to obtain the first token, which is our lookahead.
    // The lookahead is used for predictive parsing
    this.#lookahead = this.#tokenizer.getNextToken();

    // Parse recursively starting from the main entry point, the Program
    return this.Program();
  }

  /**
   * Main entry point
   */
  private Program() {
    return {
      type: "Program",
      body: this.NumericLiteral(),
    };
  }

  private NumericLiteral() {
    const token = this.eat("NUMBER");

    return {
      type: "NumericLiteral",
      value: Number(token.value),
    };
  }

  /**
   * Expects a token of a given type
   */
  private eat(tokenType: TokenType) {
    const token = this.#lookahead;

    if (token === null || token === undefined) {
      throw new SyntaxError(`Unexpected end of input, expected "${tokenType}"`);
    }

    if (token.type !== tokenType) {
      throw new SyntaxError(
        `Unexpected token "${token.value}", expected "${tokenType}"`,
      );
    }

    // Advance to next token
    this.#lookahead = this.#tokenizer.getNextToken();

    return token;
  }
}
