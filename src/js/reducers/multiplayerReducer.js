const initialState = {
  gameId: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GAME_ID':
      return {
        ...state,
        gameId: action.payLoad
      }
    default:
      return state
  }
}
  