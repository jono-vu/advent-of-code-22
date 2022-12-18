import { readInput } from "../utils";

const input = readInput("inputs/day6.txt");

function day6() {
  if (!input) return;

  const targetChunk = findMarker(input, 4);
  const markerIndex = input.indexOf(targetChunk!) + targetChunk!.length;

  const targetChunkPart2 = findMarker(input, 14);
  const markerIndexPart2 =
    input.indexOf(targetChunkPart2!) + targetChunkPart2!.length;

  const part1 = markerIndex;
  const part2 = markerIndexPart2;

  return { part1, part2 };
}

export { day6 };

function findMarker(data: string, messageLength: number) {
  for (let i = 0; i < data.length; i++) {
    const chunk = data.substring(i, i + messageLength);

    if (hasDuplicates(chunk)) {
      continue;
    }

    return chunk;
  }
}

function hasDuplicates(data: string) {
  let hasDuplicates = false;

  for (let i = 0; i < data.length; i++) {
    const duplicateChar = data[i];

    if (data.replace(duplicateChar, "").includes(duplicateChar)) {
      hasDuplicates = true;
    }
  }

  return hasDuplicates;
}
