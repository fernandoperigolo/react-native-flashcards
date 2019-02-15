import React from 'react'
import { connect } from 'react-redux'
import { View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import { handleDeleteDeck } from '../actions/decks'
import { veryberry } from '../utils/colors'

class DeckDetail extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.deck.title,
    }
  }

  startQuiz = (e) => {
    this.props.dispatch(handleAddDeck())
  }

  newCard = (deckId) => {
    this.props.navigation.navigate('CardCreate', {deckId})
  }

  deleteDeck = (deck) => {
    this.props.dispatch(handleDeleteDeck(deck)).then(this.props.navigation.goBack())
  }

  render() {
    const { deck, cardsQty } = this.props

    return (
      <View style={styles.container}>
        <Text>
          {cardsQty === 0 && `No cards here :(`}
          {cardsQty === 1 && `1 Card`}
          {cardsQty > 1 && `${cardsQty} Cards`}
        </Text>

        <TouchableOpacity onPress={this.startQuiz} style={styles.button}>
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.newCard(deck.id)} style={styles.button}>
          <Text style={styles.buttonText}>Add New Card</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.deleteDeck(deck)} style={styles.button}>
          <Text style={styles.buttonText}>Delete This Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    backgroundColor: veryberry,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
})


function mapStateToProps ({decks, cards}, {navigation}) {
  const deckId = navigation.state.params.deck.id
  const deckCards = cards[deckId]
  const cardsQty = deckCards ? Object.keys(deckCards).length : 0
  return {
    deck: decks[deckId],
    cardsQty
  }
}

export default connect(mapStateToProps)(DeckDetail)
