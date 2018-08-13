const initialState = {
  createGame: {
    isStarted: false,
    gameType: null,
    score: null
  },
  imgLoaded: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'CREATE_GAME':
      return {
        ...state,
        createGame: action.payLoad
      }
    case ('LOAD_IMG') :
      return {
        ...state,
        imgLoaded: state.imgLoaded + 1
      }
    case ('MAX_IMG') :
      return {
        ...state,
        maxImg: action.payLoad
      }
    case ('START_GAME') :
      return {
        ...state,
        startGame: true
      }
    case ('RESET_GAME') :
      return {
        ...state,
        startGame: false,
        imgLoaded: 0
      }
    default:
      return state
  }
}
