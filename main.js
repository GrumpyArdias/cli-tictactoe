#!/usr/bin/env node
import inquirer from "inquirer";
import { drawnBoard } from "./drawboard.js";
import {
  colors,
  players,
  rows,
  columns,
  board,
  getPlayersByPosition,
  checkWinOrDraw,
  IAMove,
} from "./lib.js";

const { prompt } = inquirer;

async function main() {
  const { player } = await prompt({
    type: "list",
    name: "player",
    message: "Seleccione Color",
    choices: [colors.BLUE, colors.RED],
  });

  if (player === colors.BLUE) {
    players.p1.color = colors.BLUE;
    players.p2.color = colors.RED;
  } else {
    players.p1.color = colors.RED;
    players.p2.color = colors.BLUE;
  }

  const { startPlaying } = await prompt({
    type: "confirm",
    name: "startPlaying",
    message: `Eres ${players.p1.color}, confirma para continuar`,
  });

  const { player2ControlledBy } = await prompt({
    type: "list",
    name: "player2ControlledBy",
    message: `Quién va a controlar ${players.p2.color}:`,
    choices: ["Jugador", "Máquina"],
  });

  players.p2.ia = player2ControlledBy === "Jugador" ? false : true;

  const startsWith = Math.floor(Math.random() * (3 - 1)) + 1;

  if (startsWith === 1) {
    players.p1.pos = 1;
    players.p2.pos = 2;
  } else {
    players.p1.pos = 2;
    players.p2.pos = 1;
  }

  if (startPlaying) {
    drawnBoard(
      board,
      getPlayersByPosition(startsWith).current,
      getPlayersByPosition(startsWith).other
    );
    console.log(`Comienza el jugador ${getPlayersByPosition(1).current.color}`);
  } else {
    console.log("Adiós.");
  }

  async function runGame(turn) {
    const { current, other } = getPlayersByPosition(turn);

    if (!current.ia) {
      const { row, col } = await prompt([
        {
          type: "list",
          name: "row",
          message: `${current.color} - Escoja una fila:`,
          choices: [rows.A.value, rows.B.value, rows.C.value],
        },
        {
          type: "list",
          name: "col",
          message: `Escoja una columna:`,
          choices: [columns["1"].value, columns["2"].value, columns["3"].value],
        },
      ]);

      if (board[rows[row].pos][columns[col].pos] === 0) {
        board[rows[row].pos][columns[col].pos] = turn;
        drawnBoard(board, current, other);

        const winner = checkWinOrDraw(board);

        if (winner) {
          console.log(`Ganó ${getPlayersByPosition(winner).current.color}.\n`);
          process.exit();
        }
      } else {
        console.log("La posicion esta ocupada");
        runGame(turn);
      }
    } else {
      const { row, col } = IAMove(board);
      board[row][col] = turn;
      drawnBoard(board, current, other);

      const winner = checkWinOrDraw(board);

      if (winner) {
        console.log(`Ganó ${getPlayersByPosition(winner).current.color}.\n`);
        process.exit();
      }
    }

    runGame(turn === 1 ? 2 : 1);
  }

  runGame(1, 1);
}

main();
