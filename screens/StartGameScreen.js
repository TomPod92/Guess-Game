// @refresh reset
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';

import colors from '../constants/colors.js';
import Card from '../components/Card.js';
import Input from '../components/Input.js';
import NumberContainer from '../components/NumberContainer.js';
import MainButton from '../components/MainButton.js';
// import BodyText from '../components/BodyText.js'; // Zeby dodac font style do wszystkich <Text> wystarczy zamienic je na ten importowany komponent, opcja 1
import defaultStyles from '../constants/default-styles.js'; // opcja 2

const StartGameScreen = (props) => {
    const [ enteredValue, setEnteredValue ] = useState('');
    const [ confirmed, setConfirmed ] = useState(false);
    const [ userChoice, setUserChoice ] = useState();

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
        setUserChoice(parseInt(enteredValue));
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if(confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text style={defaultStyles.title}>You selected</Text>
                <NumberContainer number={userChoice}/>
                <MainButton primary={true} onPress={() => props.handleStartGame(userChoice)}>START GAME</MainButton>
            </Card>
        );
    }

    return (
        <ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
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
                    <MainButton style={styles.button} primary={false} onPress={handleReset}>RESET</MainButton>
                    <MainButton style={styles.button} primary={true} onPress={handleConfirm}>CONFIRM</MainButton>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
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
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    buttonContainer: {
        width: '100%',
        flexDirection: Dimensions.get('window').width > 410 ? 'row' : 'column',
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginRight:  Dimensions.get('window').width > 410 ? 10 : 0,
        // marginRight:  10,
        marginBottom:  Dimensions.get('window').width > 410 ? 0 : 10,
        width: 120,
        alignItems: 'center'
    },
    summaryContainer: {
        alignItems: 'center',
        marginTop: 20,
    }
  });
 
export default StartGameScreen;