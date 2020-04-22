import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    bodyText: {
        fontFamily: 'open-sans',
    },
});

// Teraz w jakims komponencie mozemy to zaiportować
// -- import defaultStyles from'...'
// I użyć w stylach jakiegos komponentu
// -- const styles = StyleSheet.create({
//       myText: {
//         fontStyle: defaultStyles.title,
//       }
//    });