import {
  FETCH_CARDS,
  SUBMIT_CARD,
  REMOVE_CARD,
  CLEAR_ALL_DECK_CARDS,
  CLEAR_ALL_CARDS,
} from '../actions/cards'

export default function cards(state = {}, action) {
  switch(action.type){
    case FETCH_CARDS:
      return {
        ...action.cards,
      }
    case SUBMIT_CARD:
      return {
        ...state,
        [action.card.deckId]: {
          ...state[action.card.deckId],
          [action.card.id]: action.card
        },
      }
    case REMOVE_CARD:
      const newStateCardRemoved = {...state}
      delete newStateCardRemoved[action.deckId][action.cardId]
      return newStateCardRemoved
    case CLEAR_ALL_DECK_CARDS:
      const newStateNoCards = {...state}
      delete newStateNoCards[action.deckId]
      return newStateNoCards
    case CLEAR_ALL_CARDS:
      return {}
    default:
      return state
  }
}
