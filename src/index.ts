export type Point = "0" | "15" | "30" | "40";
export type Player = "player1" | "player2";
export type AbstractGameState = {
  score: (player: Player) => GameState;
};
export type OnGoing = AbstractGameState & {
  player1: Point;
  player2: Point;
  type: "onGoingGame";
};
export type Advantage = AbstractGameState & {
  type: "advantageGame";
  player: Player;
};
export type Deuce = AbstractGameState & {
  type: "deuceGame";
};
export type Winner = AbstractGameState & {
  type: "finishedGame";
  winner: Player;
};

export type GameState = OnGoing | Advantage | Deuce | Winner;

const nextPoint: Record<Exclude<Point, "40">, Point> = {
  0: "15",
  15: "30",
  30: "40",
};

const computeOpponent = (player: Player) => {
  return player === "player1" ? "player2" : "player1";
};

export const createOnGoingGame = (actualScores: Record<Player, Point>): OnGoing => {
  return {
    type: "onGoingGame",
    ...actualScores,
    score: (scoringPlayer: Player) => {
      if (actualScores[scoringPlayer] === "30" && actualScores[computeOpponent(scoringPlayer)] === "40") {
        return createDeuceGame();
      }
      if (actualScores[scoringPlayer] === "40") {
        return createFinishedGame(scoringPlayer);
      }
      const newState = createOnGoingGame({ ...actualScores, [scoringPlayer]: nextPoint[actualScores[scoringPlayer]] });
      return newState;
    },
  };
};

export const createDeuceGame = (): Deuce => {
  return {
    type: "deuceGame",
    score: (scoringPlayer) => {
      return createAdvantageGame(scoringPlayer);
    },
  };
};

export const createAdvantageGame = (scoringPlayer: Player): Advantage => {
  return {
    type: "advantageGame",
    player: scoringPlayer,
    score: (nextScoringPlayer) => {
      if (scoringPlayer === nextScoringPlayer) {
        return createFinishedGame(nextScoringPlayer);
      }
      return createDeuceGame();
    },
  };
};

export const createFinishedGame = (winner: Player): Winner => {
  return {
    type: "finishedGame",
    winner,
    score: () => {
      throw new Error("Game already finished");
    },
  };
};
