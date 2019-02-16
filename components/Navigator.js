import { createMaterialTopTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import DeckList from '../screens/DeckList'
import DeckCreate from '../screens/DeckCreate'
import DeckDetail from '../screens/DeckDetail'
import Options from '../screens/Options'
import CardCreate from '../screens/CardCreate'
import Quiz from '../screens/Quiz'
import { veryberry, energos, white } from '../utils/colors'

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

export default createAppContainer(StackNavigator)
