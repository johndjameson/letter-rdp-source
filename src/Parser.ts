/**
 * Letter parser: recursive descent implementation
 */
export class Parser {
  #string: string;

  /**
   * Parses a string into an AST
   */
  parse(string: string) {
    this.#string = string;

    // Parse recursively starting from the main entry point, the Program
    return this.Program();
  }

  /**
   * Main entry point
   */
  Program() {
    return this.NumericLiteral();
  }

  NumericLiteral() {
    return {
      type: "NumericLiteral",
      value: Number(this.#string),
    };
  }
}
