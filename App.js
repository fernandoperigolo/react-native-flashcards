import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomStatusBar from './components/CustomStatusBar'
import DeckListItem from './components/DeckListItem'

export default class App extends React.Component {
  render() {
    return (
      <View>
        <CustomStatusBar />

        <DeckListItem name='React' qty={8} />
        <DeckListItem name='Redux' qty={12} />
        <DeckListItem name='Javascript' qty={21} />
        <DeckListItem name='Ruby' qty={9} />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
