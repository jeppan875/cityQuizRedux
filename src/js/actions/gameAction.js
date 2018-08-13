export function gameLoaded (game) {
  return function (dispatch) {
    dispatch({type: 'GAME_LOADED',
      payLoad: game
    })
  }
}
export function incCurrentCount (imgLoaded = 0) {
  return function (dispatch) {
    dispatch({type: 'INC_CURRENT_COUNT'
    })
  }
}
