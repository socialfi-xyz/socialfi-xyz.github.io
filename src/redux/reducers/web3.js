import { UPDATE_COUNT } from '../actions/web3'

const initState = {
  updateCount: 0,
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case UPDATE_COUNT:
      return {
        ...state,
        updateCount: state.updateCount + 1,
      }
    default:
      return state
  }
}
