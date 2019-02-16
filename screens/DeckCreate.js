import React from 'react'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions/decks'
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { veryberry, energos } from '../utils/colors'

class DeckCreate extends React.Component {
  state = {
    title: '',
    submitedFlag: false,
  }

  handleSubmit = (e) => {
    this.props.dispatch(handleAddDeck(
      this.state.title
    )).then(result => {
      this.props.navigation.navigate('DeckDetail', { deck: result.deck, cardsQty:0 })
    })

    this.setState(() => ({
      title: '',
      submitedFlag: true,
    }))
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.label}>Deck Name:</Text>
        <TextInput
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
          style={styles.input}
        />
        <TouchableOpacity onPress={this.handleSubmit} style={[styles.button, {backgroundColor:energos}]}>
          <Text style={styles.buttonText}>Create Deck</Text>
        </TouchableOpacity>
      </ScrollView>
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
    borderRadius: 4,
  },
  button: {
    backgroundColor: veryberry,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default connect()(DeckCreate)
