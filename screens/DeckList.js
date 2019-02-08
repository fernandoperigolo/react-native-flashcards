import React from 'react'
import { View, Text } from 'react-native'
import DeckListItem from '../components/DeckListItem'


export default class DeckList extends React.Component {
  render() {
    return (
      <View>
        <DeckListItem name='React' qty={8} />
        <DeckListItem name='Redux' qty={12} />
        <DeckListItem name='Javascript' qty={21} />
        <DeckListItem name='Ruby' qty={9} />
      </View>
    )
  }
}
