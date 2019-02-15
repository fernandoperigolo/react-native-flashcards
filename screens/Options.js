import React from 'react'
import { connect } from 'react-redux'
import { handleClearAllCards } from '../actions/cards'
import { handleClearAllDecks } from '../actions/decks'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { redpigment } from '../utils/colors'

class Options extends React.Component {
  clearAll = (e) => {
    this.props.dispatch(handleClearAllDecks())
    this.props.dispatch(handleClearAllCards())
  }

  clearAllCards = (e) => {
    this.props.dispatch(handleClearAllCards())
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={this.clearAll} style={styles.button}>
          <Text style={styles.buttonText}>Clear All Data</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.clearAllCards} style={styles.button}>
          <Text style={styles.buttonText}>Clear All Cards</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    backgroundColor: redpigment,
    padding: 10,
    marginBottom: 10,
    height: 45,
    borderRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default connect()(Options)
