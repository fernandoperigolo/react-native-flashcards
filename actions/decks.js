import {
  fetchDecks as fetchDecksAPI,
  submitDeck as submitDeckAPI,
  removeDeck as removeDeckAPI,
  clearAllDecks as clearAllDecksAPI
} from '../utils/api'

export const FETCH_DECKS = 'FETCH_DECKS'
export const SUBMIT_DECK = 'SUBMIT_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const CLEAR_ALL_DECKS = 'CLEAR_ALL_DECKS'

function fetchDecks (decks) {
  return {
    type: FETCH_DECKS,
    decks
  }
}

function submitDeck (deck) {
  return {
    type: SUBMIT_DECK,
    deck,
  }
}

function removeDeck (deckId) {
  return {
    type: REMOVE_DECK,
    deckId,
  }
}

function clearAllDecks () {
  return {
    type: CLEAR_ALL_DECKS,
  }
}

export function handleFetchDecks () {
  return (dispatch) => {
    return fetchDecksAPI().then((decks) => {
      dispatch(fetchDecks(decks))
    })
    .catch(error =>  console.warn(error))
  }
}

export function handleClearAllDecks () {
  return (dispatch) => {
    clearAllDecksAPI()
    .then(() => dispatch(clearAllDecks()))
    .catch(error => console.warn(error))
  }
}

export function handleAddDeck (title) {
  return (dispatch) => {
    const deckData = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      timestamp: Date.now(),
      title,
      cardsQty: 0,
    }

    submitDeckAPI(deckData)
    .then(() => dispatch(submitDeck(deckData)))
    .catch(error => console.warn(error))
  }
}

export function handleEditDeck (deck) {
  return (dispatch) => {
    const deckData = {
      ...deck,
      timestamp: Date.now(),
    }

    dispatch(submitDeck(deckData))

    return submitDeckAPI(deckData)
      .catch(error =>  console.warn(error))
  }
}

export function handleDeleteDeck (deckId) {
  return (dispatch) => {
    return removeDeckAPI(deckId)
      .then((deckId) => dispatch(removeDeck(deckId)))
      .catch(error =>  console.warn(error))
  }
}
