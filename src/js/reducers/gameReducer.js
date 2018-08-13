const initialState = {
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GAME_LOADED':
      return {
        ...state,
        game: action.payLoad
      }
    case ('INC_CURRENT_COUNT') :
      console.log(state.game.currentCount)
      return {
        ...state,
        game: {
          currentCount: state.game.currentCount + 1
        }
      }
    default:
      return state
  }
}
