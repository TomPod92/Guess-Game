import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';

import colors from '../constants/colors.js';
import Card from '../components/Card.js';
import Input from '../components/Input.js';

const StartGameScreen = () => {
    const [ enteredValue, setEnteredValue ] = useState('');

    const handleChangeNumber = (inputText) => setEnteredValue(inputText.replace(/[^0-9]/g, ''));

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.screen}>
            <Text style={styles.title}>Select a number</Text>
            <Card style={styles.inputContainer}>
                <Input style={styles.input} onChangeText={handleChangeNumber} value={enteredValue} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType="number-pad" maxLength={2} />

                <View style={styles.buttonContainer}>
                    <View  style={styles.button}>
                        <Button title="Reset" color={colors.accent} onPress={() => {}}/>    
                    </View>
                    <View style={styles.button}>
                        <Button title="Confirm" color={colors.primary} onPress={() => {}}/>
                    </View>
                </View>
            </Card>
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    input: {
        width: 50,
        marginBottom: 20,
        textAlign: 'center'
    },
    title: {
        fontSize: 20, 
        marginVertical: 10
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        width: 100,
        marginRight: 10
    }
  });
 
export default StartGameScreen;