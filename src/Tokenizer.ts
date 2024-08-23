/**
 * Tokenizer class: Lazily pulls a token from a string
 */
export class Tokenizer {
  #cursor = 0;
  #string: string;

  /**
   * Initializes the string
   */
  init(string: string) {
    this.#string = string;
  }

  /**
   * Whether we still have more tokens
   */
  private hasMoreTokens() {
    return this.#cursor < this.#string.length;
  }

  /**
   * Whether the tokenization has reached the end of the file
   */

  private isEOF() {
    return this.#cursor === this.#string.length;
  }

  /**
   * Obtains next token
   */
  getNextToken() {
    if (!this.hasMoreTokens()) {
      return null;
    }

    const string = this.#string.slice(this.#cursor);

    let matched = /^\d+/.exec(string); // Number literal

    if (matched) {
      this.#cursor += matched[0].length;

      return {
        type: "NUMBER",
        value: matched[0],
      };
    }

    matched = /^(['"])((?!\1).)*\1$/.exec(string); // Double quote string literal

    if (matched) {
      this.#cursor += matched[0].length;

      return {
        type: "STRING",
        value: matched[0],
      };
    }

    return null;
  }
}
