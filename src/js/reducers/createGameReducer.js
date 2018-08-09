const initialState = {
  createGame: {
    isStarted: false,
    gameType: null,
    score: null
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'CREATE_GAME':
      return {
        ...state,
        createGame: action.payLoad
      }
    default:
      return state
  }
}
