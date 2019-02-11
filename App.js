import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middlewares'
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

const store = createStore(reducer, middleware)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <CustomStatusBar />
          <AppContainer />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
