import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// this is a class based component that has a state
/* export default class Header extends React.Component {

} */

// this is a stateless header, component
// props is an object of the properties passed in from App.js
const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{ props.title }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#ffffea',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#111',
        fontSize: 28,
        fontWeight: '900',
        textTransform: 'uppercase'
    }
});

export default Header;