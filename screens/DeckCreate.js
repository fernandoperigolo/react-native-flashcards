import React from 'react'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions/decks'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { veryberry } from '../utils/colors'

class DeckCreate extends React.Component {
  state = {
    title: '',
    submitedFlag: false,
  }

  handleSubmit = (e) => {
    this.props.dispatch(handleAddDeck(
      this.state.title
    ))

    this.setState(() => ({
      title: '',
      submitedFlag: true,
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
          style={styles.input}
        />
        <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Create Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: veryberry,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default connect()(DeckCreate)