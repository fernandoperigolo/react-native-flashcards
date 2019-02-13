import React from 'react'
import { connect } from 'react-redux'
import { handleFetchDecks } from '../actions/decks'
import { handleFetchCards } from '../actions/cards'
import { View, Text, StyleSheet } from 'react-native'
import DeckListItem from '../components/DeckListItem'

class DeckList extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleFetchDecks())
    this.props.dispatch(handleFetchCards())
  }

  render() {
    const { decks } = this.props
    return (
      <View style={styles.container}>
        {Object.keys(decks).map((id) => (
          <DeckListItem key={id} deck={decks[id]} />
        ))}
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
