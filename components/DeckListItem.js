import React from 'react'
import { withNavigation } from 'react-navigation'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { lightgray } from '../utils/colors'

class DeckListItem extends React.Component {
  navigateTo = (deck) => {
    console.log('props DeckListItem:', this.props)
    this.props.navigation.navigate('DeckDetail', {deck})
  }

  render() {
    const { id, title, cardsQty } = this.props.deck
    return (
      <TouchableOpacity onPress={() => this.navigateTo(this.props.deck)}>
        <View style={styles.deckContainer}>
          <Text style={styles.deckName}>{title} - {id}</Text>
          <Text style={styles.deckCardsQty}>{cardsQty} cards</Text>
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
  },
  deckName: {
    fontSize: 20,
  },
  deckCardsQty: {
    fontSize: 14,
  },
})

export default withNavigation(DeckListItem)