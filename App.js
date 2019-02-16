import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middlewares'
import { StyleSheet, View } from 'react-native'
import Navigator from './components/Navigator'
import CustomStatusBar from './components/CustomStatusBar'
import { setLocalNotification } from './utils/notification'

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
          <Navigator />
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
