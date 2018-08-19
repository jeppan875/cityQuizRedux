export function getGameId (gameId) {
  return function (dispatch) {
    dispatch({type: 'GAME_ID',
      payLoad: gameId
    })
  }
}
