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
   * Obtains next token
   */
  getNextToken() {
    if (!this.hasMoreTokens()) {
      return null;
    }

    const string = this.#string.slice(this.#cursor);

    if (!Number.isNaN(Number(string[0]))) {
      let number = "";

      while (!Number.isNaN(Number(string[this.#cursor]))) {
        number += string[this.#cursor++];
      }

      return {
        type: "NUMBER",
        value: number,
      };
    }

    return null;
  }
}
