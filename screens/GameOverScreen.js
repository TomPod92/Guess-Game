import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions } from 'react-native';

import TitleText from '../components/TitleText.js';
import BodyText from '../components/BodyText.js';
import MyButton from '../components/MainButton.js';
import colors from '../constants/colors.js';

const GameOverScreen = (props) => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>Game Over</TitleText>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.rounds}</Text> round to guess the number <Text style={styles.highlight}>{props.userChoice}</Text></BodyText>
                </View>
                
                <Image 
                    style={styles.image} 
                    source={require('../assets/original.png')} // dla lokalnych obrazkow 
                    // source={{ uri: 'https://www.yourdictionary.com/images/definitions/lg/12337.summit.jpg' }} // dla obrazkow z sieci (zawsze trzeba im podac "width" i "height")
                    resizeMode="cover"
                    fadeDuration={1000}
                />
                <MyButton style={styles.newGameButton} primary={false} onPress={props.handleNewGame}>NEW GAME</MyButton>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resultContainer: {
        marginHorizontal: 20,
        marginTop: 10,
    },
    image: {
        width: '80%',
        height: 300,
        marginVertical: 20,
        borderRadius: 120,
    },
    resultText: {
        textAlign: 'center'
    },
    highlight: {
        color: colors.primary,
        fontFamily: 'open-sans-bold'
    },
    newGameButton: {
        marginTop: 10
    },
});
 
export default GameOverScreen;