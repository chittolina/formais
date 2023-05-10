import { FSM } from "./fsm";

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
      ["d", "q9"],
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
