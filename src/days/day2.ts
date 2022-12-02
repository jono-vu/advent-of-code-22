import { readInput } from "../utils";

const input = readInput("inputs/day2.txt");

enum RPS {
  rock = "ROCK",
  paper = "PAPER",
  scissors = "SCISSORS",
}

type OpponentRPSInput = string | "A" | "B" | "C";
type YourRPSInput = string | "X" | "Y" | "Z";

function day2() {
  if (!input) return;

  const rounds = input.split("\n").map((round) => round.split(" "));

  const sumRoundsPart1 = rounds
    .map(
      ([opponentRPSInput, yourRPSInput]: (OpponentRPSInput | YourRPSInput)[]) =>
        resolvePointsPart1({
          opponentRPSInput,
          yourRPSInput,
        })
    )
    .reduce((a, b) => a + b, 0);

  const sumRoundsPart2 = rounds
    .map(
      ([opponentRPSInput, yourRPSInput]: (OpponentRPSInput | YourRPSInput)[]) =>
        resolvePointsPart2({
          opponentRPSInput,
          yourRPSInput,
        })
    )
    .reduce((a, b) => a + b, 0);

  const part1 = sumRoundsPart1;
  const part2 = sumRoundsPart2;

  return { part1, part2 };
}

export { day2 };

function resolvePointsPart1({
  opponentRPSInput,
  yourRPSInput,
}: {
  opponentRPSInput: OpponentRPSInput;
  yourRPSInput: YourRPSInput;
}) {
  const opponentRPS = resolveOpponentRPS(opponentRPSInput);
  const yourRPS = resolveYourRPS(yourRPSInput);

  let points = 0;

  if (yourRPS === RPS.rock) {
    points += 1;

    if (opponentRPS === RPS.paper) {
      points += 0;
    } else if (opponentRPS === RPS.scissors) {
      points += 6;
    }
  } else if (yourRPS === RPS.paper) {
    points += 2;

    if (opponentRPS === RPS.rock) {
      points += 6;
    } else if (opponentRPS === RPS.scissors) {
      points += 0;
    }
  } else if (yourRPS === RPS.scissors) {
    points += 3;

    if (opponentRPS === RPS.rock) {
      points += 0;
    } else if (opponentRPS === RPS.paper) {
      points += 6;
    }
  }

  if (yourRPS === opponentRPS) {
    points += 3;
  }

  return points;
}

function resolveOpponentRPS(opponentRPSInput: OpponentRPSInput) {
  if (opponentRPSInput === "A") {
    return RPS.rock;
  } else if (opponentRPSInput === "B") {
    return RPS.paper;
  } else if (opponentRPSInput === "C") {
    return RPS.scissors;
  }
}

function resolveYourRPS(yourRPSInput: YourRPSInput) {
  if (yourRPSInput === "X") {
    return RPS.rock;
  } else if (yourRPSInput === "Y") {
    return RPS.paper;
  } else if (yourRPSInput === "Z") {
    return RPS.scissors;
  }
}

const opponentResults = {
  [RPS.rock.toString()]: {
    ["0" as string]: RPS.scissors,
    ["3" as string]: RPS.rock,
    ["6" as string]: RPS.paper,
  },
  [RPS.paper.toString()]: {
    ["0" as string]: RPS.rock,
    ["3" as string]: RPS.paper,
    ["6" as string]: RPS.scissors,
  },
  [RPS.scissors.toString()]: {
    ["0" as string]: RPS.paper,
    ["3" as string]: RPS.scissors,
    ["6" as string]: RPS.rock,
  },
};

function resolvePointsPart2({
  opponentRPSInput,
  yourRPSInput,
}: {
  opponentRPSInput: OpponentRPSInput;
  yourRPSInput: YourRPSInput;
}) {
  const opponentRPS = resolveOpponentRPS(opponentRPSInput);
  const yourScore = resolveScore(yourRPSInput);

  let points = 0;

  points += yourScore;

  const yourRPS = opponentResults[opponentRPS as RPS][yourScore.toString()];

  if (yourRPS === RPS.rock) {
    points += 1;
  } else if (yourRPS === RPS.paper) {
    points += 2;
  } else if (yourRPS === RPS.scissors) {
    points += 3;
  }

  return points;
}

function resolveScore(yourRPSInput: YourRPSInput) {
  let score = 0;

  if (yourRPSInput === "X") {
    score += 0;
  } else if (yourRPSInput === "Y") {
    score += 3;
  } else if (yourRPSInput === "Z") {
    score += 6;
  }
  return score;
}
