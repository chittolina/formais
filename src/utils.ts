import { FSM } from "./fsm";

export interface Token {
  content: string;
  result: string;
  type: "operator" | "sentence";
}

export const DELIMITERS = ["\n", "\t", " "];
export const OPERATORS = ["*", "+", "/", "-"];
export const SYMBOLS = ["a", "b", "c", "d", "e"];

// Realiza o parse da entrada do usuário em tokens
export function parseTokens(input: string): Token[] {
  let tokens: Token[][] = [];
  let currentSentence = "";

  // Corta a string baseado nos delimitadores
  // Exemplo: "abc d \n 3" -> ["abc", "d", "3"]
  const groups = input.split(/\s|\t|\n/);

  for (let i = 0; i < groups.length; i++) {
    let group = groups[i];
    let groupTokens: Token[] = [];

    for (let j = 0; j < group.length; j++) {
      let currentChar = group[j];

      // when an operator is found
      if (OPERATORS.includes(currentChar)) {
        groupTokens.push({
          content: currentSentence,
          type: "sentence",
          result: "",
        });

        groupTokens.push({
          content: currentChar,
          type: "operator",
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

// Valida se os tokens são reconhecidos pelo FSM, ou inválidos, ou se são operadores aritméticos
export function validateTokens(tokens: Token[], fsm: FSM): Token[] {
  const newTokens = [];

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === "operator") {
      newTokens.push({ ...tokens[i], result: "operador aritmético" });
    }

    if (tokens[i].type === "sentence") {
      const hasInvalidSymbol = !SYMBOLS.includes(tokens[i].content[0]);

      if (hasInvalidSymbol) {
        newTokens.push({
          ...tokens[i],
          result: "ERRO: símbolo(s) inválido(s)",
        });
      } else {
        newTokens.push({
          ...tokens[i],
          result: fsm.run(tokens[i].content)
            ? "sentença válida"
            : "ERRO: sentença inválida",
        });
      }
    }
  }

  return newTokens;
}
