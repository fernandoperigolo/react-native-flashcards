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
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
  .then(data => {
    const currentCards = JSON.parse(data)
    if(currentCards === null || !currentCards[card.deckId]){
      AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
        [card.deckId]: {
          [card.id]:card
        }
      }))
    } else {
      const newCards = {
        ...currentCards,
        [card.deckId]: {
          ...currentCards[card.deckId],
          [card.id]: card
        },
      }
      AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(newCards))
    }
  })
}

export function removeCard () {
  return AsyncStorage.clear()
}

export function clearAllDeckCards (deckId) {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
  .then(data => {
    const currentCards = JSON.parse(data)
    const newCards = {
      ...currentCards,
      [deckId]: {},
    }
    AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(newCards))
  })
}

export function clearAllCards () {
  return AsyncStorage.removeItem(CARDS_STORAGE_KEY)
}
