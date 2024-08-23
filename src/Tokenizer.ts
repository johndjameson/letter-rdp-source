import type { TokenType } from "./types.ts";

const Spec: [RegExp, TokenType: TokenType][] = [
  [/^\s+/, null], // Whitespace
  [/^\/\/.*/, null], // Single-line comment
  [/^\/\*[\s\S]*?\*\//, null], // Multi-line comment
  [/^\d+/, "NUMBER"], // Number
  [/^'[^']*'/, "STRING"], // Single-quoted string
  [/^"[^"]*"/, "STRING"], // Double-quoted string
];

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

    for (const [regexp, tokenType] of Spec) {
      const tokenValue = this.match(regexp, string);

      if (!tokenValue) {
        continue;
      }

      if (!tokenType) {
        return this.getNextToken();
      }

      return {
        type: tokenType,
        value: tokenValue,
      };
    }

    return null;
  }

  private match(regexp: RegExp, string: string) {
    const matched = string.match(regexp);

    if (!matched) {
      return null;
    }

    this.#cursor += matched[0].length;

    return matched[0];
  }
}
