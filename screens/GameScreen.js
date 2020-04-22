// @refresh reset
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer.js';
import Card from '../components/Card.js';
import MyButton from '../components/MainButton.js';
import BodyText from '../components/BodyText.js';
import TitleText from '../components/TitleText.js';
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
    const initialGuess = generateRandomNumber(1, 100, props.userChoice);
    const [ currentGuess, setCurrentGuess ] = useState(initialGuess);
    const [ pastGuesses, setPastGuesses ] = useState([initialGuess]);
    const [ availableDeviceHeight, setAvailableDeviceHeight ] = useState(Dimensions.get('window').height)
    const [ availableDeviceWidth, setAvailableDeviceWidth ] = useState(Dimensions.get('window').width)

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, handleGameOver } = props;

    // Zmienimy layout w zależności od wysokości okna
    // ------------Wykład 95------------
    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    useEffect(() => {
        if(currentGuess === userChoice) {
            handleGameOver(pastGuesses.length)
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
            currentLow.current = currentGuess + 1;
        }

        const nextGuess = generateRandomNumber(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextGuess);

        setPastGuesses(prevPastGuesses => [nextGuess,...prevPastGuesses]);
    }

    // Zmienimy layout w zależności od wysokości okna
    // ------------Wykład 95------------
    if(availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
            <Text>Game guess:</Text>

            <View style={styles.controls}>
                <MyButton primary={true} onPress={() => createNextGuess('lower')}><Ionicons name="md-remove" size={Dimensions.get('window').width > 480 ? 24 : 16} color="white"/></MyButton>
                <NumberContainer  style={styles.gameNumber} number={currentGuess}/>
                <MyButton primary={false} onPress={() => createNextGuess('greater')}><Ionicons name="md-add" size={Dimensions.get('window').width > 480 ? 24 : 16} color="white"/></MyButton>
            </View>

            <Text>Your number: {props.userChoice}</Text>

            <MyButton style={styles.newGameButton} primary={true} onPress={props.handleNewGame}>NEW GAME</MyButton>

            <TitleText style={styles.gameGuessesTitle}>Game guesses:</TitleText>

            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map( (current, index) => (
                        <View style={styles.listItem} key={current}>
                            <BodyText>#{pastGuesses.length - index}</BodyText>
                            <BodyText>{current}</BodyText>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Text>Game guess:</Text>
            <NumberContainer number={currentGuess}/>
            <Text>Your number: {props.userChoice}</Text>
            
            <Card style={styles.buttonContainer}>
                <MyButton primary={true} onPress={() => createNextGuess('lower')}><Ionicons name="md-remove" size={Dimensions.get('window').width > 480 ? 24 : 16} color="white"/></MyButton>
                <MyButton primary={false} onPress={() => createNextGuess('greater')}><Ionicons name="md-add" size={Dimensions.get('window').width > 480 ? 24 : 16} color="white"/></MyButton>
            </Card>

            <MyButton style={styles.newGameButton} primary={true} onPress={props.handleNewGame}>NEW GAME</MyButton>

            <TitleText style={styles.gameGuessesTitle}>Game guesses:</TitleText>

{/* --------- Jeżli chcemy kontrolować wysokość albo szerokość listy/ScrollVew lepiej opakować to w <View>--------------- */}
{/* --------- WAŻNE!!! Otaczające <View> musi mięc "flex: 1" --------------- */}
{/* --------- <FlatList> jest lepsze jeżeli nie wiemy ile item'ów będziemy mieli. Wtedy zamiast <ScrollView> wewnatrze <View> dajemy to co jest na dole--------------- */}
            <View style={styles.listContainer}>
                {/* Żeby dodać style trzeba/lepiej użyć props'a "contentContainerStyle={ styles.(...) }" */}
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map( (current, index) => (
                        <View style={styles.listItem} key={current}>
                            <BodyText>#{pastGuesses.length - index}</BodyText>
                            <BodyText>{current}</BodyText>
                        </View>
                    ))}
                </ScrollView>
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
    gameNumber: {
        marginHorizontal: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    gameGuessesTitle: {
        marginTop: Dimensions.get('window').width > 480 ? 20 : 10
    },
    listContainer: {
        flex: 1,
        width: '80%',
        marginTop: 10,
    },
    list: {
        // flexGrow: 1, // gydbyśmy chceli żeby rosło od początku
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        borderColor: colors.primary,
        borderWidth: 2,
        borderRadius: 15,
        paddingVertical: Dimensions.get('window').width > 480 ? 6 : 3,
        paddingHorizontal: 15,
        marginBottom: Dimensions.get('window').width > 480 ? 5 : 2,
        backgroundColor: 'white'
    },
    newGameButton: {
        marginTop: 20,
        paddingVertical: Dimensions.get('window').width > 480 ? 8 : 6,
        paddingHorizontal: Dimensions.get('window').width > 480 ? 24 : 16,
    }
});
 
export default GameScreen;

// // -------Wykład 83-------
// <FlatList data={pastGuesses} keyExtractor={item => item.toString()} renderItem={renderListItem} />