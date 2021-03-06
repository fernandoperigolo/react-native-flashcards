import React from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { lightgray } from '../utils/colors'
import CardCounter from './CardCounter'

class DeckListItem extends React.Component {
  navigateTo = (deck, cardsQty) => {
    this.props.navigation.navigate('DeckDetail', {deck, cardsQty})
  }

  render() {
    const { deck, cardsQty } = this.props

    return (
      <TouchableOpacity onPress={() => this.navigateTo(deck,cardsQty)}>
        <View style={styles.deckContainer}>
          <Text style={styles.deckName}>{deck.title}</Text>
          <CardCounter cardsQty={cardsQty} />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  deckContainer: {
    backgroundColor: lightgray,
    padding: 10,
    marginBottom: 10,
    marginTop: 0,
    borderRadius: 4,
  },
  deckName: {
    fontSize: 20,
  },
})

function mapStateToProps ({cards}, {deck}) {
  const deckCards = cards[deck.id]
  const cardsQty = deckCards ? Object.keys(deckCards).length : 0
  return {
    cardsQty
  }
}

export default connect(mapStateToProps)(withNavigation(DeckListItem))
