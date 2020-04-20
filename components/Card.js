import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = (props) => {
    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 7,
    backgroundColor: 'white',
    borderRadius: 10,
  }
});
 
export default Card;