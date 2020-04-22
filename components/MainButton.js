import React from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';

import colors from '../constants/colors.js';

const MainButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.6}>
            <View style={{...styles.button, ...props.style, backgroundColor: props.primary ? colors.primary : colors.accent}}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontSize: 14
    }
});
 
export default MainButton;