import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import { veryberry, energos, barared, lightgray, white } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/notification'

class Quiz extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: `Quiz ${navigation.state.params.deck.title}`,
    }
  }

  state = {
    rightAnswers: 0,
    cardIndex: 0,
    showAnswer: false,
    finished: false,
  }

  showAnswer = () => {
    this.setState(() => ({
      showAnswer: true,
    }))
  }

  correctAnswer = () => {
    this.setState((state) => ({
      rightAnswers: state.rightAnswers + 1,
    }))
    this.nextCard()
  }

  nextCard = () => {
    if(this.state.cardIndex === this.props.cardsQty - 1){
      this.setState(() => ({
        finished: true,
      }))
      clearLocalNotification().then(setLocalNotification)
    } else {
      this.setState((state) => ({
        showAnswer: false,
        cardIndex: state.cardIndex + 1,
      }))
    }
  }

  restartQuiz = () => {
    this.setState(() => ({
      rightAnswers: 0,
      cardIndex: 0,
      showAnswer: false,
      finished: false,
    }))
  }

  render() {
    const { cards, cardSequence, cardsQty } = this.props
    const { cardIndex, showAnswer, rightAnswers, finished } = this.state
    const currentCardId = cardSequence[cardIndex]

    if(finished) {
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.cardTitle}>Result</Text>
          <Text style={styles.cardCount}>You points {rightAnswers} of {cardsQty}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={[styles.button, {backgroundColor:barared}]}>
              <Text style={styles.buttonText}>Back To Deck</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.restartQuiz()} style={[styles.button, {backgroundColor:energos}]}>
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )
    }

    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.cardCount}>Card {cardIndex + 1} of {cardsQty}</Text>
        </View>

        {showAnswer === false ?
          <View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Question:</Text>
              <Text>{cards[currentCardId].question}</Text>
            </View>
            <TouchableOpacity onPress={() => this.showAnswer()} style={[styles.button, {backgroundColor:energos}]}>
              <Text style={styles.buttonText}>Show Answer</Text>
            </TouchableOpacity>
          </View>
        : <View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Correct answer is:</Text>
              <Text>{cards[currentCardId].answer}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => this.nextCard()} style={[styles.button, {backgroundColor:barared}]}>
                <Text style={styles.buttonText}>Incorrect</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.correctAnswer()} style={[styles.button, {backgroundColor:energos}]}>
                <Text style={styles.buttonText}>Correct</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardCount: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    borderRadius: 20,
    backgroundColor: veryberry,
    color: white,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  card: {
    backgroundColor: lightgray,
    padding: 10,
    marginBottom: 10,
    textAlign: 'center',
    borderColor: veryberry,
    borderWidth: 2,
    borderRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    color: veryberry,
    fontWeight: 'bold',
    marginBottom: 5,
    flex: 1,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: veryberry,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10,
    height: 45,
    borderRadius: 4,
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
  const {deck} = navigation.state.params
  const deckCards = cards[deck.id]
  // If deckCards is a thing, then i get all keys and shuffle it
  const cardSequence = deckCards ? Object.keys(deckCards).sort(function(a, b){return 0.5 - Math.random()}) : null
  const cardsQty = cardSequence.length
  return {
    deck: decks[deck.id],
    cards: deckCards,
    cardsQty,
    cardSequence,
  }
}

export default connect(mapStateToProps)(Quiz)
