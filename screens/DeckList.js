import React from 'react'
import { connect } from 'react-redux'
import { handleFetchDecks } from '../actions/decks'
import { View, Text } from 'react-native'
import DeckListItem from '../components/DeckListItem'

class DeckList extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleFetchDecks())
  }

  render() {
    const { decks } = this.props
    return (
      <View>
        {Object.keys(decks).map((id) => (
          <DeckListItem key={id} name={decks[id].title} qty={8} />
        ))}
      </View>
    )
  }
}

function mapStateToProps ({decks}) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)