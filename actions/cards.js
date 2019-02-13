import {
  fetchCards as fetchCardsAPI,
  submitCard as submitCardAPI,
  removeCard as removeCardAPI,
  clearAllDeckCards as clearAllDeckCardsAPI,
  clearAllCards as clearAllCardsAPI,
} from '../utils/api'

export const FETCH_CARDS = 'FETCH_CARDS'
export const SUBMIT_CARD = 'SUBMIT_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'
export const CLEAR_ALL_DECK_CARDS = 'CLEAR_ALL_DECK_CARDS'
export const CLEAR_ALL_CARDS = 'CLEAR_ALL_CARDS'

function fetchCards (cards) {
  return {
    type: FETCH_CARDS,
    cards
  }
}

function submitCard (card) {
  return {
    type: SUBMIT_CARD,
    card,
  }
}

function removeCard (deckId, cardId) {
  return {
    type: REMOVE_CARD,
    deckId,
    cardId,
  }
}

function clearAllDeckCards (deckId) {
  return {
    type: CLEAR_ALL_DECK_CARDS,
    deckId,
  }
}

function clearAllCards () {
  return {
    type: CLEAR_ALL_CARDS,
  }
}

export function handleFetchCards () {
  return (dispatch) => {
    return fetchCardsAPI().then((cards) => {
      dispatch(fetchCards(cards))
    })
    .catch(error =>  console.warn(error))
  }
}

export function handleClearAllDeckCards (deckId) {
  return (dispatch) => {
    clearAllDeckCardsAPI(deckId)
    .then(() => dispatch(clearAllDeckCards(deckId)))
    .catch(error => console.warn(error))
  }
}

export function handleAddCard (deckId, question, answer) {
  return (dispatch) => {
    const cardData = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      deckId,
      timestamp: Date.now(),
      question,
      answer,
    }

    submitCardAPI(cardData)
    .then(() => dispatch(submitCard(cardData)))
    .catch(error => console.warn(error))
  }
}

export function handleEditCard (card) {
  return (dispatch) => {
    const cardData = {
      ...card,
      timestamp: Date.now(),
    }

    dispatch(submitCard(cardData))

    return submitCardAPI(cardData)
      .catch(error =>  console.warn(error))
  }
}

export function handleDeleteCard (card) {
  return (dispatch) => {
    return removeCardAPI(card.parentId, card.id)
      .then(dispatch(removeCard(card.parentId, card.id)))
      .catch(error =>  console.warn(error))
  }
}

export function handleClearAllCards () {
  return (dispatch) => {
    clearAllCardsAPI()
    .then(() => dispatch(clearAllCards()))
    .catch(error => console.warn(error))
  }
}
