import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'Flashcards:Decks'
const CARDS_STORAGE_KEY = 'Flashcards:Cards'

// Decks
export function fetchDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
}

export function submitDeck (deck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deck.id]: deck
  }))
}

export function removeDeck (key) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function clearAllDecks () {
  return AsyncStorage.removeItem(DECKS_STORAGE_KEY)
}

// Cards
export function fetchCards () {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then(JSON.parse)
}

export function submitCard (card) {
  return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
    [card.deckId]: card
  }))
}

export function removeCard () {
  return AsyncStorage.clear()
}

export function clearAllDeckCards () {
  return AsyncStorage.clear()
}

export function clearAllCards () {
  return AsyncStorage.removeItem(CARDS_STORAGE_KEY)
}
