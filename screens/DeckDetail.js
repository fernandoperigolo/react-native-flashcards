import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import { handleDeleteDeck } from '../actions/decks'
import CardCounter from '../components/CardCounter'
import { veryberry, lightgray, energos, barared } from '../utils/colors'

class DeckDetail extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.deck.title,
    }
  }

  startQuiz = (deck) => {
    this.props.navigation.navigate('Quiz', {deck})
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
      <ScrollView style={styles.container}>
        <View style={styles.deckContainer}>
          <CardCounter cardsQty={cardsQty} />
        </View>

        {cardsQty > 0 &&
          <TouchableOpacity onPress={() => this.startQuiz(deck)} style={[styles.button, {backgroundColor:energos}]}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        }

        <TouchableOpacity onPress={() => this.newCard(deck.id)} style={[styles.button, {backgroundColor:energos}]}>
          <Text style={styles.buttonText}>Add New Card</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.deleteDeck(deck)} style={[styles.button, {backgroundColor:barared}]}>
          <Text style={styles.buttonText}>Delete This Deck</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  deckContainer: {
    backgroundColor: lightgray,
    padding: 10,
    marginBottom: 10,
    marginTop: 0,
    borderRadius: 4,
  },
  button: {
    backgroundColor: veryberry,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10,
    height: 45,
    borderRadius: 2,
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
    cardsQty,
  }
}

export default connect(mapStateToProps)(DeckDetail)
