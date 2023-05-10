export interface Token {
  content: string;
  result: string;
  type: "operator" | "sentence";
}

export const DELIMITERS = ["\n", "\t", " "];
export const OPERATORS = ["*", "+", "/", "-"];
export const SYMBOLS = ["a", "b", "c", "d", "e"];

export function parse(input: string): Token[] {
  let tokens: Token[][] = [];
  let currentSentence = "";

  /* 
    sentence = ''

    case 1:
      current char is operator
        add to tokens with operator type
        add to tokens current sentence
      current char is not operator
        add it to the current sentence
    case 2:
      end of string
        add to tokens current sentence
  */

  // split string based on the delimiters
  // ie, "abc d \n 3" -> ["abc", "d", "3"]
  const groups = input.split(/\s|\t|\n/);

  for (let i = 0; i < groups.length; i++) {
    let group = groups[i];
    let groupTokens: Token[] = [];

    for (let j = 0; j < group.length; j++) {
      let currentChar = group[j];

      // when an operator is found
      if (OPERATORS.includes(currentChar)) {
        groupTokens.push({
          content: currentChar,
          type: "operator",
          result: "",
        });

        groupTokens.push({
          content: currentSentence,
          type: "sentence",
          result: "",
        });

        currentSentence = "";

        continue;
      }

      currentSentence += currentChar;

      // this is where the string ends
      if (j === group.length - 1) {
        groupTokens.push({
          content: currentSentence,
          type: "sentence",
          result: "",
        });

        currentSentence = "";
      }
    }

    tokens = [...tokens, groupTokens];
  }

  return tokens
    .reduce((previousValue, currentValue) => {
      previousValue = [...previousValue, ...currentValue];
      return previousValue;
    })
    .filter((token) => token.content !== "");
}
