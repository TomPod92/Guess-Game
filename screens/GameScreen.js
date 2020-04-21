// @refresh reset
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer.js';
import Card from '../components/Card.js';
import colors from '../constants/colors.js';

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
                <Button title="LOWER" color={colors.primary} onPress={() => createNextGuess('lower')}/>
                <Button title="GREATER" color={colors.accent} onPress={() => createNextGuess('greater')}/>
            </Card>
            <View style={styles.newGameButton}>
                <Button title="New game" onPress={props.handleNewGame}/>
            </View>
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
        // borderRadius: 10,
        // borderColor: colors.primary,
        // borderWidth: 2,
    }
});
 
export default GameScreen;