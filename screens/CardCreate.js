import React from 'react'
import { connect } from 'react-redux'
import { handleAddCard } from '../actions/cards'
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { veryberry, energos } from '../utils/colors'

class CardCreate extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'New Card',
    }
  }

  state = {
    question: '',
    answer: '',
    submitedFlag: false,
  }

  handleSubmit = (e) => {
    this.props.dispatch(handleAddCard(
      this.props.navigation.state.params.deckId,
      this.state.question,
      this.state.answer,
    ))

    this.setState(() => ({
      question: '',
      answer: '',
      submitedFlag: true,
    }))

    this.props.navigation.goBack()
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.label}>Question:</Text>
        <TextInput
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
          style={styles.input}
        />
        <Text style={styles.label}>Answer:</Text>
        <TextInput
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
          style={styles.input}
        />
        <TouchableOpacity onPress={this.handleSubmit} style={[styles.button, {backgroundColor:energos}]}>
          <Text style={styles.buttonText}>Create Card</Text>
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

export default connect()(CardCreate)
