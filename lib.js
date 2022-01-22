export const rows = {
  A: {
    value: "A",
    pos: 0,
  },
  B: {
    value: "B",
    pos: 1,
  },
  C: {
    value: "C",
    pos: 2,
  },
};

export const columns = {
  1: {
    value: "1",
    pos: 0,
  },
  2: {
    value: "2",
    pos: 1,
  },
  3: {
    value: "3",
    pos: 2,
  },
};

export const players = {
  p1: {
    pos: -1,
    color: "",
    ia: false,
  },
  p2: {
    pos: -1,
    color: "",
    ia: false,
  },
};

export const getPlayersByPosition = (turn) => {
  let current;
  let other;

  if (players.p1.pos === turn) {
    current = players.p1;
    other = players.p2;
  } else {
    current = players.p2;
    other = players.p1;
  }

  return {
    current,
    other,
  };
};

export const colors = {
  BLUE: "🔵",
  RED: "🔴",
  WHITE: "⬜",
};

export const board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

export const checkWinOrDraw = (b) => {
  // check rows
  if (b[0][0] !== 0 && b[0][1] !== 0 && b[0][2] !== 0) {
    if (b[0][0] === b[0][1] && b[0][1] === b[0][2]) {
      return b[0][0];
    }
  }
  if (b[1][0] !== 0 && b[1][1] !== 0 && b[1][2] !== 0) {
    if (b[1][0] === b[1][1] && b[0][1] === b[1][2]) {
      return b[1][0];
    }
  }
  if (b[2][0] !== 0 && b[2][1] !== 0 && b[2][2] !== 0) {
    if (b[2][0] === b[2][1] && b[2][1] === b[2][2]) {
      return b[2][0];
    }
  }

  //check columns
  if (b[0][0] !== 0 && b[1][0] !== 0 && b[2][0] !== 0) {
    if (b[0][0] === b[1][0] && b[1][0] === b[2][0]) {
      return b[0][0];
    }
  }
  if (b[0][1] !== 0 && b[1][1] !== 0 && b[2][1] !== 0) {
    if (b[0][1] === b[1][1] && b[1][1] === b[2][1]) {
      return b[0][1];
    }
  }
  if (b[0][2] !== 0 && b[1][2] !== 0 && b[2][2] !== 0) {
    if (b[0][2] === b[1][2] && b[1][2] === b[2][2]) {
      return b[0][2];
    }
  }

  // diagonal
  if (b[0][0] !== 0 && b[1][1] !== 0 && b[2][2] !== 0) {
    if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
      return b[0][0];
    }
  }
  if (b[0][2] !== 0 && b[1][1] !== 0 && b[2][0] !== 0) {
    if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
      return b[0][2];
    }
  }

  return false;
};

export const IAMove = (board) => {
  // [
  //   [1, 1, 0],
  //   [0, 0, 0],
  //   [0, 0, 0],
  // ];

  let row = 0;
  let col = 0;

  for (let rowIndex = 0; rowIndex === 2; rowIndex++) {
    for (let colIndex = 0; colIndex === 2; colIndex++) {
      if (board[rowIndex][colIndex] === 0) {
        for (let r in rows) {
          if (rows[r].pos === rowIndex) {
            row = rowIndex;
          }
        }
        for (let c in columns) {
          if (columns[c].pos === colIndex) {
            col = colIndex;
          }
        }
      }
    }
  }

  return {
    row,
    col,
  };
};
