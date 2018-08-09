import dispatcher from '../dispatcher'

export function startGame () {
  dispatcher.dispatch({
    type: 'START_GAME'
  })
}
export function gameType (gameType) {
  dispatcher.dispatch({
    type: 'GAME_TYPE',
    gameType: gameType
  })
}
export function maxPlayers (maxPlayers) {
  console.log(gameType)
  dispatcher.dispatch({
    type: 'MAX_PLAYERS',
    maxPlayers: maxPlayers
  })
}
export function gameId (gameId) {
  console.log(gameId)
  dispatcher.dispatch({
    type: 'GAMEID',
    gameId: gameId
  })
}
export function loadedQuiz (quizGame) {
  dispatcher.dispatch({
    type: 'QUIZ_LOADED',
    game: quizGame
  })
}
export function loadedMultiplayerQuiz (quizGame, gameId) {
  dispatcher.dispatch({
    type: 'MULTIPLAYER_QUIZ_LOADED',
    game: quizGame,
    gameId: gameId
  })
}

export function multiplayerScores (scores) {
  dispatcher.dispatch({
    type: 'MULTIPLAYER_SCORES',
    scores: scores
  })
}

export function multiplayerNextQuestion (quizGame, gameId) {
  dispatcher.dispatch({
    type: 'MULTIPLAYER_NEXT_QUESTION'
  })
}

export function imgLoaded () {
  dispatcher.dispatch({
    type: 'IMG_LOADED'
  })
}

export function timeup () {
  dispatcher.dispatch({
    type: 'TIMEUP'
  })
}

export function nextPic () {
  dispatcher.dispatch({
    type: 'NEXTPIC'
  })
}
export function endGame (answers, score) {
  dispatcher.dispatch({
    type: 'ENDGAME',
    answers: answers,
    score: score
  })
}
