import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header.js';
import StartGameScreen from './screens/StartGameScreen.js';

const App = () => {
  return (
    <View style={styles.screen}>
      <Header title="Quess a number"/>
      <StartGameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});

export default App;