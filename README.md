## Trabalho de Linguagens Formais

Implementação de uma interface web que reconheça a linguagem definida por:

```
(ab)^n c^m (de)^p

onde n é par e m + p é ímpar
```

### Autômato finito mínimo

|     | a   | b   | c   | d   | e   |
| --- | --- | --- | --- | --- | --- |
| q0  | q1  | -   | q5  | q9  | -   |
| q1  | -   | q2  | -   | -   | -   |
| q2  | q3  | -   | -   | -   | -   |
| q3  | -   | q4  | -   | -   | -   |
| q4  | q1  | -   | q5  | -   | -   |
| q5  | -   | -   | q6  | q7  | -   |
| q6  | -   | -   | q5  | q9  | -   |
| q7  | -   | -   | -   | -   | q8  |
| q8  | -   | -   | -   | q9  | -   |
| q9  | -   | -   | -   | -   | q10 |
| q10 | -   | -   | -   | q7  | -   |

![Alt text](/full-fsm "Optional Title")

### Acessando a aplicação

Não é necessário buildar a aplicação localmente, o sistema está hospedado na URL: https://example.com.
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
