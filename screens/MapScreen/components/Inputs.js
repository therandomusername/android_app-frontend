import React, {Component} from 'react'
import {TextInput, View, Text, StyleSheet, Button} from 'react-native'

class Inputs extends Component {
    render() {
        return <View style={styles.container}>
            <View style={styles.input}><Text>Nazwa:</Text>
                <TextInput style={styles.text} placeholder={"Nazwij swoja miejsce!"} value={this.props.name} onChangeText={this.props.onNameChange}/></View>
            <View style={styles.input}><Text>Opis:</Text>
                <TextInput style={styles.text} placeholder={"Opisz to miejsce!"} value={this.props.description} onChangetext={this.props.onDescChange}/></View>
            <Button title={"Zapisz"} onPress={this.props.onPress} disabled={this.props.buttonDisabled}/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
        width: '100%'
    },
    input: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%'
    },
    text: {
        width: '100%'
    }
});

export default Inputs