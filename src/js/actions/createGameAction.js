export function createGame (clickedStart, gameType, score = 10000) {
  return function (dispatch) {
    dispatch({type: 'CREATE_GAME',
      payLoad: {
        clickedStart,
        gameType,
        score
      }
    })
  }
}
