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
import { veryberry, energos, white } from './utils/colors'
import { setLocalNotification } from './utils/notification'

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
},{
  tabBarOptions: {
    indicatorStyle: {
      backgroundColor: energos,
    },
    style: {
      backgroundColor: veryberry,
    }
  }
})

const navigationOptions = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: veryberry,
      height: 60,
    },
    headerTintColor: white,
    headerForceInset: { top: 'never', bottom: 'never' }
  }
}

const StackNavigator = createStackNavigator({
  Home: {
    screen: HomeTabNavigator,
    navigationOptions: {
      header: null
    },
  },
  DeckDetail: {
    screen: DeckDetail,
    ...navigationOptions,
  },
  CardCreate: {
    screen: CardCreate,
    ...navigationOptions,
  },
  Quiz: {
    screen: Quiz,
    ...navigationOptions,
  },
},{})

const AppContainer = createAppContainer(StackNavigator)

const store = createStore(reducer, middleware)

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
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
    flex: 1,
  },
})
