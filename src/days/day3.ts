import { readInput } from "../utils";

const input = readInput("inputs/day3.txt");

const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function day3() {
  if (!input) return;

  const rucksacks = input.split("\n");
  const rucksacksPoints = rucksacks.map((rucksack) =>
    getCharacterPoints(findRecurringCharacterPart1(rucksack)!)
  );
  const sumRucksacksPoints = rucksacksPoints.reduce((a, b) => a + b, 0);

  const rucksacksSplitBy3 = splitRucksacksIntoGroupsOf3(rucksacks);
  const rucksacksSplitBy3Points = rucksacksSplitBy3.map((rucksackGroup) =>
    getCharacterPoints(findRecurringCharacterPart2(rucksackGroup)!)
  );
  const sumRucksacksSplitBy3Points = rucksacksSplitBy3Points.reduce(
    (a, b) => a + b,
    0
  );

  const part1 = sumRucksacksPoints;
  const part2 = sumRucksacksSplitBy3Points;

  return { part1, part2 };
}

export { day3 };

function getCharacterPoints(character: string) {
  return characters.indexOf(character) + 1;
}

function findRecurringCharacterPart1(rucksack: string) {
  const compartmentLength = rucksack.length / 2;

  const compartment1 = rucksack.substring(0, compartmentLength);
  const compartment2 = rucksack.substring(compartmentLength, rucksack.length);

  for (let i = 0; i < compartment1.length; i++) {
    for (let j = 0; j < compartment2.length; j++) {
      if (compartment1[i] === compartment2[j]) {
        return compartment1[i];
      }
    }
  }
}

function splitRucksacksIntoGroupsOf3(rucksacks: string[]) {
  let groupedRucksacks: string[][] = [];
  for (let i = 0; i < rucksacks.length; i += 3) {
    groupedRucksacks.push([rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]]);
  }

  return groupedRucksacks;
}

function findRecurringCharacterPart2(rucksacks: string[]) {
  const rucksack1 = rucksacks[0];
  const rucksack2 = rucksacks[1];
  const rucksack3 = rucksacks[2];

  for (let i = 0; i < rucksack1.length; i++) {
    for (let j = 0; j < rucksack2.length; j++) {
      for (let k = 0; k < rucksack3.length; k++) {
        if (rucksack1[i] === rucksack2[j] && rucksack1[i] === rucksack3[k]) {
          return rucksack1[i];
        }
      }
    }
  }
}
