import React from 'react'
import { connect } from 'react-redux'
import { handleFetchDecks, handleClearAllDecks } from '../actions/decks'
import { View, Text, StyleSheet } from 'react-native'
import DeckListItem from '../components/DeckListItem'

class DeckList extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleFetchDecks())
  }

  handleClearAll = (e) => {
    this.props.dispatch(handleClearAllDecks())
  }

  render() {
    const { decks } = this.props
    return (
      <View style={styles.container}>
        {Object.keys(decks).map((id) => (
          <DeckListItem key={id} deck={decks[id]} />
        ))}

        <Text onPress={this.handleClearAll}>Clear All</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

function mapStateToProps ({decks}) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)