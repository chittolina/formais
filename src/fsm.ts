export class FSM {
  public states: Set<string>;
  public alphabet: Set<string>;
  public transitions: Map<string, Map<string, string>>;
  public startState: string;
  public finalStates: Set<string>;
  public currentState: string;

  constructor(
    states: Set<string>,
    alphabet: Set<string>,
    transitions: Map<string, Map<string, string>>,
    startState: string,
    finalStates: Set<string>
  ) {
    this.states = states;
    this.alphabet = alphabet;
    this.transitions = transitions;
    this.startState = startState;
    this.finalStates = finalStates;
    this.currentState = startState;
  }

  // Método para rodar a sentença no FSM e dizer se é válida ou não
  public run(input: string): boolean {
    for (let symbol of input) {
      if (!this.alphabet.has(symbol)) {
        return false;
      }

      const nextState = this.transitions.get(this.currentState)?.get(symbol);
      if (!nextState) {
        return false;
      }

      this.currentState = nextState;
    }

    return this.finalStates.has(this.currentState);
  }
}

// Máquina de estados da linguagem solicitada.
const startState = "q0";
const finalStates = new Set(["q5", "q10"]);
const states = new Set([
  "q0",
  "q1",
  "q2",
  "q3",
  "q4",
  "q5",
  "q6",
  "q7",
  "q8",
  "q9",
  "q10",
]);
const alphabet = new Set(["a", "b", "c", "d", "e"]);
const transitions = new Map([
  [
    "q0",
    new Map([
      ["a", "q1"],
      ["c", "q5"],
      ["d", "q9"],
    ]),
  ],
  ["q1", new Map([["b", "q2"]])],
  ["q2", new Map([["a", "q3"]])],
  ["q3", new Map([["b", "q4"]])],
  [
    "q4",
    new Map([
      ["c", "q5"],
      ["a", "q1"],
    ]),
  ],
  [
    "q5",
    new Map([
      ["c", "q6"],
      ["d", "q7"],
    ]),
  ],
  [
    "q6",
    new Map([
      ["c", "q5"],
      ["d", "q9"],
    ]),
  ],
  ["q7", new Map([["e", "q8"]])],
  ["q8", new Map([["d", "q9"]])],
  ["q9", new Map([["e", "q10"]])],
  ["q10", new Map([["d", "q7"]])],
]);

export const fsm = new FSM(
  states,
  alphabet,
  transitions,
  startState,
  finalStates
);
