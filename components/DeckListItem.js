import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { lightgray, white } from '../utils/colors'

export default class DeckListItem extends React.Component {
  render() {
    const { name, qty } = this.props
    return (
      <TouchableOpacity>
        <View style={styles.deckContainer}>
          <Text style={styles.deckName}>{name}</Text>
          <Text style={styles.deckCardsQty}>{qty} cards</Text>
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
