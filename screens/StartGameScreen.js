import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import colors from '../constants/colors.js';
import Card from '../components/Card.js';
import Input from '../components/Input.js';
import NumberContainer from '../components/NumberContainer.js';

const StartGameScreen = () => {
    const [ enteredValue, setEnteredValue ] = useState('');
    const [ confirmed, setConfirmed ] = useState(false);
    const [ gameNumber, setGameNumber ] = useState();

    const handleChangeNumber = (inputText) => setEnteredValue(inputText.replace(/[^0-9]/g, ''));

    const handleReset = () => {
        setEnteredValue('');
        setConfirmed('');
    };

    const handleConfirm = () => {
        const chosenNumber = parseInt(enteredValue);
        if( isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number', 
                        'Number has to be a number between 1 and 99', 
                        [{
                            text: 'Okey', style: 'destructive', onPress: handleReset
                        }])
            return;
        }

        setConfirmed(true);
        setEnteredValue('')
        setGameNumber(parseInt(enteredValue));
        Keyboard.dismiss();
    };

    let confiremdOutput;

    if(confirmed) {
        confiremdOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer number={gameNumber}/>
                <Button title="Start game" color={colors.primary}/>
            </Card>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.screen}>
            <Text style={styles.title}>Select a number</Text>
            <Card style={styles.inputContainer}>
                <Input 
                    style={styles.input} 
                    onChangeText={handleChangeNumber} 
                    value={enteredValue} 
                    blurOnSubmit 
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    keyboardType="number-pad" 
                    maxLength={2} 
                />

                <View style={styles.buttonContainer}>
                    <View  style={styles.button}>
                        <Button title="Reset" color={colors.accent} onPress={handleReset}/>    
                    </View>
                    <View style={styles.button}>
                        <Button title="Confirm" color={colors.primary} onPress={handleConfirm}/>
                    </View>
                </View>
            </Card>
            {confiremdOutput}
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
    },
    summaryContainer: {
        alignItems: 'center',
        marginTop: 20,
    }
  });
 
export default StartGameScreen;