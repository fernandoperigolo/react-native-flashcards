import {
  FETCH_DECKS,
  SUBMIT_DECK,
  REMOVE_DECK,
  CLEAR_ALL_DECKS,
} from '../actions/decks'

export default function decks(state = {}, action) {
  switch(action.type){
    case FETCH_DECKS:
      return {
        ...action.decks
      }
    case SUBMIT_DECK:
      return {
        ...state,
        [action.deck.id]: action.deck,
      }
    case REMOVE_DECK :
      const newState = {...state}
      delete newState[action.deck.id]
      return newState
    case CLEAR_ALL_DECKS:
      return {}
    default:
      return state
  }
}