import React from 'react'
import { connect } from 'react-redux'
import { View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import { veryberry } from '../utils/colors'

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
        <View style={styles.container}>
          <Text>Result</Text>
          <Text>You points {rightAnswers} of {cardsQty}</Text>
          <TouchableOpacity onPress={() => this.restartQuiz()} style={styles.button}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.button}>
            <Text style={styles.buttonText}>Back To Deck</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View>
          <Text>Card {cardIndex + 1} of {cardsQty}</Text>
        </View>

        {showAnswer === false ?
          <View>
            <Text>Question:</Text>
            <Text>{cards[currentCardId].question}</Text>
            <TouchableOpacity onPress={() => this.showAnswer()} style={styles.button}>
              <Text style={styles.buttonText}>Show Answer</Text>
            </TouchableOpacity>
          </View>
        : <View>
            <Text>Correct answer is:</Text>
            <Text>{cards[currentCardId].answer}</Text>
            <TouchableOpacity onPress={() => this.correctAnswer()} style={styles.button}>
              <Text style={styles.buttonText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.nextCard()} style={styles.button}>
              <Text style={styles.buttonText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        }
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
