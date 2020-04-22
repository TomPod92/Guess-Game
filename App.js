// @refresh reset
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import * as font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header.js';
import StartGameScreen from './screens/StartGameScreen.js';
import GameScreen from './screens/GameScreen.js';
import GameOverScreen from './screens/GameOverScreen.js';

const fetchFonts = () => {
  return font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

const App = () => {
  const [ userChoice, setUserChoice ] = useState();
  const [ rounds, setRounds ] = useState(0);
  const [ dataLoaded, setDataLoaded ] = useState(false);

  // Ten komponent wydłuża ładowanie apki na tyle aby zdązyły załadowac sie pliki z font'ami
  if(!dataLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={(error) => console.log(error)}/>
  }

  const handleStartGame = (number) => {
    setUserChoice(number);
  }

  const handleGameOver = number => {
    setRounds(number);
  }

  const handleNewGame = () => {
    setRounds(0);
    setUserChoice(null);
  }

  let content = <StartGameScreen handleStartGame={handleStartGame}/>;

  if( userChoice && rounds <= 0) {
    content =  <GameScreen userChoice={userChoice} handleGameOver={handleGameOver} handleNewGame={handleNewGame}/>
  } else if (rounds > 0) {
    content = <GameOverScreen rounds={rounds} userChoice={userChoice} handleNewGame={handleNewGame}/>
  }

  return (
    // Czasami warto zmienic okalający cała apkę <View/> na <SafeAreaView/>. Wtedy elementy nie będą zasłaniane przez jakieś "wystające elementy obudowy"
    <SafeAreaView style={styles.screen}> 
    {/* <View style={styles.screen}> */}
      <Header title="Guess a number"/>
      { content }
    {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});

export default App;