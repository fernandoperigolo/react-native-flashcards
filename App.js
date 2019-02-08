import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import CustomStatusBar from './components/CustomStatusBar'
import DeckList from './screens/DeckList'
import DeckCreate from './screens/DeckCreate'

const TabNavigator = createMaterialTopTabNavigator({
  DeckList: {
    screen: DeckList,
  },
  DeckCreate: {
    screen: DeckCreate,
  },
})

const AppContainer = createAppContainer(TabNavigator)

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomStatusBar />

        <AppContainer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
