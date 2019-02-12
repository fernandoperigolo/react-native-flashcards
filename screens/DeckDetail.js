import React from 'react'
import { View, Text } from 'react-native'

export default class DeckDetail extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.deck.title,
    }
  }

  render() {
    return (
      <View>
        <Text>{this.props.navigation.state.params.deck.title}</Text>
        <Text>{JSON.stringify(this.props)}</Text>
      </View>
    )
  }
}
