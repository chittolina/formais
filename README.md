## Trabalho de Linguagens Formais

Implementação de uma interface web que reconheça a linguagem definida por:

```
(ab)^n c^m (de)^p

onde n é par e m + p é ímpar
```

### Autômato finito

#### Tabela de transição

|     | a   | b   | c   | d   | e   |
| --- | --- | --- | --- | --- | --- |
| q0  | q1  | -   | q5  | q9  | -   |
| q1  | -   | q2  | -   | -   | -   |
| q2  | q3  | -   | -   | -   | -   |
| q3  | -   | q4  | -   | -   | -   |
| q4  | q1  | -   | q5  | q9  | -   |
| q5  | -   | -   | q6  | q7  | -   |
| q6  | -   | -   | q5  | q9  | -   |
| q7  | -   | -   | -   | -   | q8  |
| q8  | -   | -   | -   | q9  | -   |
| q9  | -   | -   | -   | -   | q10 |
| q10 | -   | -   | -   | q7  | -   |

#### Diagrama de transição

![Alt text](/fsm-full.png "Optional Title")

### Arquivos relevantes

- [src/fsm.ts](/src/fsm.ts)
  - classe representando um autômato finito determinístico, utilizada para reconhecer as sentenças.
- [src/utils.ts](/src/utils.ts)
  - possui métodos auxiliares
    - `parseTokens` - processa a entrada do usuário e separa em grupos (ou tokens)
    - `validateTokens` - processa os tokens e verifica se a sentença é válida, inválida, verifica os símbolos e operadores

### Acessando a aplicação

Não é necessário buildar a aplicação localmente, você pode acessar a aplicação acessando [aqui](https://formais-cel2zft2s-chittolina.vercel.app/).
Você pode apenas acessar esse link e utilizá-lo para realizar testes.

### Executando a aplicação localmente (opcional)

1. É necessário ter o NodeJS instalado, bem como NPM ou yarn.
2. Na pasta raíz do projeto, execute:

```bash
npm install
```

3. Em seguida, execute:

```bash
npm run dev
```

E no seu console uma mensagem aparecerá com a URL para acessar.
