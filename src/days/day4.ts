import { readInput } from "../utils";

const input = readInput("inputs/day4.txt");

function day4() {
  if (!input) return;

  const elfPairs = input
    .split("\n")
    .map((elfPairString) => elfPairString.split(","));

  const elfPairsFormatted = elfPairs.map(([elf1String, elf2String]) => ({
    elf1: getElfHoursBounds(elf1String),
    elf2: getElfHoursBounds(elf2String),
  }));

  const containedPairs = getNumContainedPairs(elfPairsFormatted);
  const overlappingPairs = getOverlappingPairs(elfPairsFormatted);

  const part1 = containedPairs;
  const part2 = overlappingPairs;

  return { part1, part2 };
}

export { day4 };

function getElfHoursBounds(elfString: string) {
  const [lower, upper] = elfString.split("-");

  return { lower: Number(lower), upper: Number(upper) };
}

interface ElfPair {
  elf1: {
    lower: number;
    upper: number;
  };
  elf2: {
    lower: number;
    upper: number;
  };
}

function getNumContainedPairs(pairs: ElfPair[]) {
  let containedPairs = 0;

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];

    if (
      pair.elf1.lower <= pair.elf2.lower &&
      pair.elf1.upper >= pair.elf2.upper
    ) {
      containedPairs += 1;
    } else if (
      pair.elf2.lower <= pair.elf1.lower &&
      pair.elf2.upper >= pair.elf1.upper
    ) {
      containedPairs += 1;
    }
  }

  return containedPairs;
}

function getOverlappingPairs(pairs: ElfPair[]) {
  return pairs.filter((pair) => {
    for (let i = pair.elf1.lower; i <= pair.elf1.upper; i++) {
      if (pair.elf2.lower <= i && pair.elf2.upper >= i) {
        return true;
      }
    }
  }).length;
}
