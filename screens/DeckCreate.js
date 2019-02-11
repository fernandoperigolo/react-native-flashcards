import React from 'react'
import { connect } from 'react-redux'
import { handleAddDeck, handleClearAllDecks } from '../actions/decks'
import { View, Text } from 'react-native'

class DeckCreate extends React.Component {
  state = {
    title: 'Deck 1',
    submitedFlag: false,
  }

  handleSubmit = (e) => {
    this.props.dispatch(handleAddDeck(
      this.state.title
    ))

    this.setState(() => ({
      title: '',
      submitedFlag: true,
    }))
  }
  handleClearAll = (e) => {
    this.props.dispatch(handleClearAllDecks())
  }

  render() {
    return (
      <View>
        <Text onPress={this.handleSubmit}>DeckCreate</Text>
        <Text onPress={this.handleClearAll}>Clear All</Text>
      </View>
    )
  }
}

function mapStateToProps ({decks}) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckCreate)