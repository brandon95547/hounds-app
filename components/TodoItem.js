import React from 'react';
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';

export default class TodoItem extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const TodoItem = this.props.TodoItem;

        return (
            <TouchableOpacity 
                style={StyleSheet.TodoItem}
                onPress={() => this.props.toggleDone()}
            >
                <Text style={(TodoItem.done) ? { color: '#AAAAAA' } : { color: '#313131' }}>
                    { TodoItem.title }
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    TodoItem: {
        width: '100%',
        height: 40,
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15
    }
})