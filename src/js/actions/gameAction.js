export function gameLoaded (game) {
  return function (dispatch) {
    dispatch({type: 'GAME_LOADED',
      payLoad: game
    })
  }
}
export function incCurrentCount () {
  return function (dispatch) {
    dispatch({type: 'INC_CURRENT_COUNT'})
  }
}
export function incPicCount () {
  return function (dispatch) {
    dispatch({type: 'INC_PIC_COUNT'})
  }
}
export function addAnswer (answer) {
  return function (dispatch) {
    dispatch({type: 'ADD_ANSWER',
      payLoad: answer
    })
  }
}
export function updateScore (score) {
  return function (dispatch) {
    dispatch({type: 'UPDATE_SCORE',
      payLoad: score
    })
  }
}
export function decTime () {
  return function (dispatch) {
    dispatch({type: 'DEC_TIME'
    })
  }
}
export function resetQuestion (timeLeft) {
  return function (dispatch) {
    console.log(timeLeft)
    dispatch({type: 'RESET_QUESTION',
      payLoad: {
        timeLeft: timeLeft
      }
    })
  }
}
export function renderEndGame () {
  return function (dispatch) {
    dispatch({type: 'GAME_ENDED'
    })
  }
}
export function resetGame () {
  return function (dispatch) {
    dispatch({type: 'RESET_GAME'
    })
  }
}
