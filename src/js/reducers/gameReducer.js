const initialState = {
  game: {},
  currentCount: 0,
  answers: [],
  score: 0,
  timeLeft: 30,
  picCount: 0,
  gameEnded: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GAME_LOADED':
      return {
        ...state,
        game: action.payLoad
      }
    case ('INC_CURRENT_COUNT') :
      return {
        ...state,
        currentCount: state.currentCount + 1
      }
    case ('ADD_ANSWER') :
      return {
        ...state,
        answers: [...state.answers, action.payLoad]
      }
    case ('UPDATE_SCORE') :
      return {
        ...state,
        score: state.score + action.payLoad
      }
    case ('DEC_TIME') :
      return {
        ...state,
        timeLeft: state.timeLeft - 1
      }
    case ('INC_PIC_COUNT') :
      return {
        ...state,
        picCount: state.picCount + 1
      }
    case ('RESET_QUESTION') :
      return {
        ...state,
        timeLeft: action.payLoad.timeLeft,
        picCount: 0
      }
    case ('GAME_ENDED') :
      return {
        ...state,
        gameEnded: true
      }
    case ('RESET_GAME') :
      return {
        ...state,
        game: {},
        currentCount: 0,
        answers: [],
        score: 0,
        timeLeft: 30,
        picCount: 0,
        gameEnded: false
      }
    default:
      return state
  }
}
