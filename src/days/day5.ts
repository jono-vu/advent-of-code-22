import { _, readInput } from "../utils";

const input = readInput("inputs/day5.txt");

interface Instruction {
  numCrates: number;
  origCol: number;
  targetCol: number;
}

function day5() {
  if (!input) return;

  const [cratesInputRaw, instructionsInputRaw] = input.split("\n\n");

  const instructions: Instruction[] = parseInstructions(instructionsInputRaw);

  const finalCrates = operateCrane(parseCrates(cratesInputRaw), instructions);
  const topCrates = finalCrates.map((stack) => _.last(stack)).join("");

  const finalCratesPart2 = operateCranePart2(
    parseCrates(cratesInputRaw),
    instructions
  );
  const topCratesPart2 = finalCratesPart2
    .map((stack) => _.last(stack))
    .join("");

  const part1 = topCrates;
  const part2 = topCratesPart2;

  return { part1, part2 };
}

export { day5 };

function parseCrates(cratesInputRaw: string) {
  const cratesRows = cratesInputRaw.split("\n");
  const numCratesLines = _.last(cratesRows).split("   ");
  const numCrates = Number(_.last(numCratesLines));

  let crates = _.arrayFrom<string[]>(numCrates, () => []) as string[][];

  for (
    let i = 0;
    i < cratesRows.length - 1 /* exclude last line of numbers */;
    i += 1
  ) {
    for (let j = 1; j < cratesRows[0].length; j += 4) {
      const char = cratesRows[i][j];

      const column = (j - 1) / 4;

      if (char === " ") continue;

      if (!crates[column]) {
        crates[column] = [char];
      } else {
        crates[column] = [char, ...crates[column]];
      }
    }
  }

  return crates;
}

function parseInstructions(instructionsInputRaw: string) {
  const instructionsLines = instructionsInputRaw.split("\n");

  const instructions = instructionsLines.map((line) => {
    const [_move, numCrates, _from, origCol, _to, targetCol] = line.split(" ");

    return {
      numCrates: Number(numCrates),
      origCol: Number(origCol) - 1,
      targetCol: Number(targetCol) - 1,
    };
  });

  return instructions;
}

function operateCrane(cratesInput: string[][], instructions: Instruction[]) {
  let crates = cratesInput;

  for (let i = 0; i < instructions.length; i++) {
    const { numCrates, origCol, targetCol } = instructions[i];

    for (let j = 0; j < numCrates; j++) {
      const crateToBeMoved = _.last(crates[origCol]);

      crates[origCol] = crates[origCol].filter(
        (_, k) => k < crates[origCol].length - 1
      );

      if (!crates[targetCol]) {
        crates[targetCol] = [crateToBeMoved];
      } else {
        crates[targetCol] = [...crates[targetCol], crateToBeMoved];
      }
    }
  }

  return crates;
}

function operateCranePart2(
  cratesInput: string[][],
  instructions: Instruction[]
) {
  let crates = cratesInput;

  for (let i = 0; i < instructions.length; i++) {
    const { numCrates, origCol, targetCol } = instructions[i];

    const cratesToBeMoved = crates[origCol].filter(
      (_, j) => j >= crates[origCol].length - numCrates
    );

    crates[origCol] = crates[origCol].filter(
      (_, j) => j < crates[origCol].length - numCrates
    );

    if (!crates[targetCol]) {
      crates[targetCol] = [...cratesToBeMoved];
    } else {
      crates[targetCol] = [...crates[targetCol], ...cratesToBeMoved];
    }
  }

  return crates;
}
