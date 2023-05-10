import { FSM } from "./fsm";

export function minimizeFSM(fsm: FSM): FSM {
  // Step 1: Create the initial partition
  const nonFinalStates = Array.from(fsm.states).filter(
    (state) => !fsm.finalStates.has(state)
  );
  const partitions = [fsm.finalStates, new Set(nonFinalStates)];

  // Step 2: Iterate until no more partitions can be created
  let isPartitioning = true;
  while (isPartitioning) {
    isPartitioning = false;

    for (let partition of partitions) {
      const newPartitions = splitPartition(fsm, partition, partitions);
      if (newPartitions.length > 1) {
        isPartitioning = true;
        partitions.splice(partitions.indexOf(partition), 1);
        partitions.push(...newPartitions);
      }
    }
  }

  // Step 3: Construct the minimized FSM
  const newStates = new Set<string>();
  const newTransitions = new Map();
  let newStartState = "";
  const newFinalStates = new Set<string>();

  for (let partition of partitions) {
    const partitionStates = Array.from(partition);
    const newStateName = partitionStates.join("-");
    newStates.add(newStateName);

    if (partition.has(fsm.startState)) {
      newStartState = newStateName;
    }

    if (partition.has(fsm.finalStates.values().next().value)) {
      newFinalStates.add(newStateName);
    }

    for (let symbol of fsm.alphabet) {
      const nextStates = new Set();
      for (let state of partitionStates) {
        const nextState = fsm.transitions.get(state)?.get(symbol);
        if (nextState) {
          nextStates.add(nextState);
        }
      }

      if (nextStates.size > 0) {
        const nextStateName = Array.from(nextStates).join("-");
        const transitionKey = `${newStateName}-${symbol}`;
        newTransitions.set(transitionKey, nextStateName);
      }
    }
  }

  return new FSM(
    newStates,
    fsm.alphabet,
    newTransitions,
    newStartState,
    newFinalStates
  );
}

function splitPartition(
  fsm: FSM,
  partition: Set<string>,
  allPartitions: Set<string>[]
): Set<string>[] {
  const partitions = [partition];

  for (let symbol of fsm.alphabet) {
    const partitionMap = new Map<string, Set<string>>();
    for (let state of partition) {
      const nextState = fsm.transitions.get(state)?.get(symbol);
      if (nextState) {
        const existingPartition = partitionMap.get(nextState);
        if (existingPartition) {
          existingPartition.add(state);
        } else {
          partitionMap.set(nextState, new Set([state]));
        }
      }
    }

    if (partitionMap.size > 1) {
      const newPartitions = Array.from(partitionMap.values());
      for (let newPartition of newPartitions) {
        let foundPartition = false;
        for (let existingPartition of partitions) {
          if (setEquals(newPartition, existingPartition)) {
            foundPartition = true;
            break;
          }
        }
        if (!foundPartition) {
          partitions.push(newPartition);
        }
      }
      allPartitions.push(...newPartitions.map((p) => Array.from(p).join("-")));
    }
  }

  return partitions;
}

function setEquals(set1: Set<any>, set2: Set<any>): boolean {
  if (set1.size !== set2.size) {
    return false;
  }

  for (let item of set1) {
    if (!set2.has(item)) {
      return false;
    }
  }

  return false;
}
