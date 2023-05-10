import { useState } from "react";
import "./App.css";
import { Box, Button, Container, Textarea, Heading } from "@chakra-ui/react";
import { SYMBOLS, Token, parseTokens, validateTokens } from "./utils";
import { fsm } from "./languageFsm";

function App() {
  const [input, setInput] = useState("");
  const [tokens, setTokens] = useState<Token[]>([]);
  const [results, setResults] = useState("");

  // Cria os tokens baseado no que o usuário digitou
  const tokenize = () => {
    const tokens = parseTokens(input);
    setTokens(tokens);
    updateResults(validateTokens(tokens, fsm));
  };

  // Limpa os dados na tela
  const clear = () => {
    setTokens([]);
    setInput("");
    setResults("");
  };

  // Atualiza os resultados para cada token encontrado
  const updateResults = (tokens: Token[]): void => {
    let str: string = "";

    for (let i = 0; i < tokens.length; i++) {
      str += tokens[i].result + " : " + tokens[i].content + "\n";
    }

    setResults(str);
  };

  return (
    <div className="bg">
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
