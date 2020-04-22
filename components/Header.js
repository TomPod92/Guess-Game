// @refresh reset
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import colors from '../constants/colors.js';

const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  header: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 70,
      paddingTop: 20,
      backgroundColor: colors.primary,
  },
  headerTitle: {
      color: 'white',
      fontSize: 18,
      textTransform: 'uppercase',
      letterSpacing: 1,
      fontFamily: 'open-sans-bold'
  }
});
 
export default Header;