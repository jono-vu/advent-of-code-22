import { readInput } from "../utils";

const input = readInput("inputs/day1.txt");

function day1() {
  if (!input) return;

  const elves = input
    .split("\n\n")
    .map((elf) => elf.split("\n").map((calorie) => Number(calorie)));

  const elvesBySumCalories = elves.map((calories) =>
    calories.reduce((a, b) => a + b, 0)
  );

  const mostCalories = Math.max(...elvesBySumCalories);

  const elvesSorted = elvesBySumCalories.sort((a, b) => b - a);
  const top3Elves = elvesSorted.filter((_, i) => i <= 2);
  const sumTop3Elves = top3Elves.reduce((a, b) => a + b, 0);

  const part1 = mostCalories;
  const part2 = sumTop3Elves;

  return { part1, part2 };
}

export { day1 };
