import fs from "fs";

function readInput(path: string) {
  try {
    const data = fs.readFileSync(path, "utf8");
    return data;
  } catch (err) {
    console.error(err);
  }
}

export { readInput };
