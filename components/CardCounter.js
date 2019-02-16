import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native'

class CardCounter extends React.Component {
  render() {
    const { cardsQty } = this.props
    return (
      <Text style={styles.deckCardsQty}>
        {cardsQty === 0 && `No cards here :(`}
        {cardsQty === 1 && `1 Card`}
        {cardsQty > 1 && `${cardsQty} Cards`}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  deckCardsQty: {
    fontSize: 14,
  },
})

export default CardCounter
