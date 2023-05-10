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
    this.currentState = "q0";

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
