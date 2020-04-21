// @refresh reset
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer.js';
import Card from '../components/Card.js';
import MyButton from '../components/MainButton.js';

const generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const randomNumber = Math.floor((Math.random() * (max - min)) + min);

    if(randomNumber === exclude) {
        return generateRandomNumber(min, max, exclude)
    } else {
        return randomNumber
    }
}

const GameScreen = (props) => {
    const [ currentGuess, setCurrentGuess ] = useState(generateRandomNumber(1, 100, props.userChoice));
    const [ rounds, setRounds ] = useState(0);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, handleGameOver } = props;

    useEffect(() => {
        if(currentGuess === userChoice) {
            handleGameOver(rounds)
        }
    }, [currentGuess, userChoice, handleGameOver])

    const createNextGuess = (direction) => {
        if( (direction === 'lower' && currentGuess < props.userChoice) || 
            (direction === 'greater' && currentGuess > props.userChoice) 
        ) {
            Alert.alert('Don\'t lie!', 
                        "You know that is is wrong...",
                        [{
                            test: "Sorry :(", style: 'cancel'
                        }]);
            return;
        }

        if(direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }

        const nextGuess = generateRandomNumber(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextGuess);
        setRounds((prevRounds) => prevRounds + 1)
    }

    return (
        <View style={styles.screen}>
            <Text>Game guess:</Text>
            <NumberContainer number={currentGuess}/>
            <Text>You number: {props.userChoice}</Text>
            
            <Card style={styles.buttonContainer}>
                <MyButton primary={true} onPress={() => createNextGuess('lower')}>LOWER</MyButton>
                <MyButton primary={false} onPress={() => createNextGuess('greater')}>GREATER</MyButton>
            </Card>

            <MyButton style={styles.newGameButton} primary={true} onPress={props.handleNewGame}>NEW GAME</MyButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    },
    newGameButton: {
        marginTop: 20,
    }
});
 
export default GameScreen;