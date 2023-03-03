import {
  Advantage,
  Deuce,
  GameState,
  Player,
  OnGoing,
  Winner,
  createOnGoingGame,
  createDeuceGame,
  createAdvantageGame,
} from ".";

const extractScore = (gameState: GameState) => {
  const onGoingGame = gameState as OnGoing;

  return { player1: onGoingGame.player1, player2: onGoingGame.player2 };
};

const extractWinner = (gameState: GameState) => {
  return (gameState as Winner).winner;
};
describe("tennis kata", () => {
  test("Increment score before 40", () => {
    // GIVEN
    const initialGame = createOnGoingGame({ player1: "0", player2: "0" });
    const scoringPlayer: Player = "player1";
    // WHEN
    const nextGameState = initialGame.score(scoringPlayer);

    // THEN
    expect(nextGameState.type).toEqual("onGoingGame");
    expect(extractScore(nextGameState).player1).toEqual("15");
    expect(extractScore(nextGameState).player2).toEqual("0");
  });
  test("Increment score before 40", () => {
    // GIVEN
    const initialGame = createOnGoingGame({ player1: "15", player2: "0" });
    const scoringPlayer: Player = "player1";
    // WHEN
    const nextGameState = initialGame.score(scoringPlayer);

    // THEN
    expect(nextGameState.type).toEqual("onGoingGame");
    expect(extractScore(nextGameState).player1).toEqual("30");
    expect(extractScore(nextGameState).player2).toEqual("0");
  });

  test("Increment score before 40", () => {
    // GIVEN
    const initialGame = createOnGoingGame({ player1: "30", player2: "0" });
    const scoringPlayer: Player = "player2";
    // WHEN
    const nextGameState = initialGame.score(scoringPlayer);

    // THEN
    expect(nextGameState.type).toEqual("onGoingGame");
    expect(extractScore(nextGameState).player1).toEqual("30");
    expect(extractScore(nextGameState).player2).toEqual("15");
  });

  test("Increment score after 40", () => {
    // GIVEN
    const initialGame = createOnGoingGame({ player1: "40", player2: "30" });
    const scoringPlayer: Player = "player1";
    // WHEN
    const nextGameState = initialGame.score(scoringPlayer);
    // THEN
    expect(nextGameState.type).toEqual("finishedGame");
    expect(extractWinner(nextGameState)).toEqual("player1");
  });

  test("Increment score after 40", () => {
    // GIVEN
    const initialGame = createOnGoingGame({ player1: "30", player2: "40" });
    const scoringPlayer: Player = "player2";
    // WHEN
    const nextGameState = initialGame.score(scoringPlayer);
    // THEN
    expect(nextGameState.type).toEqual("finishedGame");
    expect(extractWinner(nextGameState)).toEqual("player2");
  });

  test("Deuce after 40 30", () => {
    // GIVEN
    const initialGame = createOnGoingGame({ player1: "30", player2: "40" });
    const scoringPlayer: Player = "player1";
    // WHEN
    const nextGameState = initialGame.score(scoringPlayer);
    // THEN
    expect(nextGameState.type).toEqual("deuceGame");
  });

  test("Adv after deuce", () => {
    // GIVEN
    const initialGame = createDeuceGame();
    const scoringPlayer: Player = "player1";
    // WHEN
    const nextGameState = initialGame.score(scoringPlayer);
    // THEN
    expect(nextGameState.type).toEqual("advantageGame");
    expect((nextGameState as Advantage).player).toEqual("player1");
  });

  test("Deuce after adv", () => {
    // GIVEN
    const initialGame = createAdvantageGame("player1");
    const scoringPlayer: Player = "player2";
    // WHEN
    const nextGameState = initialGame.score(scoringPlayer);
    // THEN
    expect(nextGameState.type).toEqual("deuceGame");
  });

  test("Winner after adv", () => {
    // GIVEN
    const initialGame = createAdvantageGame("player1");
    const scoringPlayer: Player = "player1";
    // WHEN
    const nextGameState = initialGame.score(scoringPlayer);
    // THEN
    expect(nextGameState.type).toEqual("finishedGame");
    expect(extractWinner(nextGameState)).toEqual("player1");
  });
});
