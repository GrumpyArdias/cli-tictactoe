import { colors } from "./lib.js";

export const drawnBoard = (b, current, other) => {
  console.clear();
  const withNumbers = b.map((row, i) => {
    let char;
    if (i === 0) char = "A";
    if (i === 1) char = "B";
    if (i === 2) char = "C";

    return [char, ...row];
  });
  const board = [[" ", " 1", " 2", " 3"], ...withNumbers];

  console.log(
    board
      .map((row) => {
        return row
          .map((col) => {
            if (col === 0) return colors.WHITE;
            if (col === current.pos) return current.color;
            if (col === other.pos) return other.color;
            return col;
          })
          .join("");
      })
      .join("\n")
  );
};
