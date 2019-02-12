import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middlewares'
import { StyleSheet, View } from 'react-native'
import { createMaterialTopTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import CustomStatusBar from './components/CustomStatusBar'

import DeckList from './screens/DeckList'
import DeckCreate from './screens/DeckCreate'
import DeckDetail from './screens/DeckDetail'
import Options from './screens/Options'
import CardCreate from './screens/CardCreate'
import Quiz from './screens/Quiz'

const HomeTabNavigator = createMaterialTopTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      title: 'My Decks',
    },
  },
  DeckCreate: {
    screen: DeckCreate,
    navigationOptions: {
      title: 'Create Decks',
    },
  },
  Options: {
    screen: Options,
    navigationOptions: {
      title: 'Options',
    },
  },
})

const StackNavigator = createStackNavigator({
  Home: HomeTabNavigator,
  DeckDetail,
  CardCreate,
  Quiz,
})

const AppContainer = createAppContainer(StackNavigator)

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
