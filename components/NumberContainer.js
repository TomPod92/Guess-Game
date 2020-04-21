import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../constants/colors.js';

const NumberContainer = (props) => {
    return ( 
        <View style={styles.container}>
            <Text style={styles.number}>{props.number}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.accent
    },
    number: {
        color: colors.accent,
        fontSize: 22,
    }
  });
 
export default NumberContainer;
