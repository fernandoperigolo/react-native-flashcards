import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { veryberry } from '../utils/colors'

export default class CustomStatusBar extends React.Component {
  render() {
    return (
      <View style={styles.statusBarContainer}>
        <StatusBar style={styles.statusBar} translucent barStyle="light-content"  />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  statusBarContainer: {
    backgroundColor: veryberry,
    height: Constants.statusBarHeight,
  },
  statusBar: {
    backgroundColor: veryberry
  },
})
