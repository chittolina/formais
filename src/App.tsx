import { useState, useEffect } from "react";
import "./App.css";
import { Box, Button, Container, Textarea, Heading } from "@chakra-ui/react";
import { SYMBOLS, Token, parse } from "./parser";
import { fsm } from "./fsm";

function App() {
  const [input, setInput] = useState("");
  const [tokens, setTokens] = useState<Token[]>([]);
  const [results, setResults] = useState("");

  // Cria os tokens baseado no que o usuário digitou
  const tokenize = () => {
    const tokens = parse(input);
    setTokens(tokens);
  };

  // Limpa os dados na tela
  const clear = () => {
    setTokens([]);
    setInput("");
  };

  // Atualiza os resultados para cada token encontrado
  const updateResults = (tokens: Token[]): void => {
    let str: string = "";

    for (let i = 0; i < tokens.length; i++) {
      str += tokens[i].result + " : " + tokens[i].content + "\n";
    }

    setResults(str);
  };

  useEffect(() => {
    const newTokens = [];

    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === "operator") {
        newTokens.push({ ...tokens[i], result: "operador aritmético" });
      }

      if (tokens[i].type === "sentence") {
        const hasInvalidSymbol = tokens[i].content
          .split("")
          .some((symbol) => !SYMBOLS.includes(symbol));

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

    updateResults(newTokens);
  }, [tokens]);

  return (
    <div className="test">
      <Container
        display="flex"
        justifyContent="center"
        flexDirection="column"
        className="h-full"
      >
        <Heading size="lg" className="py-5">
          Reconhecedor de sentenças
        </Heading>
        <Box>
          <Textarea
            placeholder="Sentença"
            onChange={(e) => setInput(e.target.value)}
            defaultValue=""
            value={input}
            minHeight="200px"
          />
          <div className="float-right my-5">
            <Button className="mr-2" onClick={() => tokenize()}>
              Analisar
            </Button>
            <Button
              onClick={() => {
                clear();
              }}
            >
              Limpar
            </Button>
          </div>
        </Box>

        <Box>
          <Textarea placeholder="Tokens" value={results} minHeight="200px" />
        </Box>
      </Container>
    </div>
  );
}

export default App;
