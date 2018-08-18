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
export function imgLoaded () {
  return function (dispatch) {
    dispatch({type: 'LOAD_IMG'
    })
  }
}
export function getMaxImg (maxImg) {
  return function (dispatch) {
    dispatch({type: 'MAX_IMG',
      payLoad: maxImg
    })
  }
}
export function startNewGame () {
  return function (dispatch) {
    dispatch({type: 'START_GAME'
    })
  }
}
export function resetLoadedGame () {
  return function (dispatch) {
    dispatch({type: 'RESET_LOADED_GAME'
    })
  }
}
