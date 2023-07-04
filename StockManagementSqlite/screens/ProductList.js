import React from 'react';
import { View, Text, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

export default class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        db.transaction(tx => {
            tx.executeSql('select * from items', [], (_, { rows }) =>
                this.setState({ items: rows._array })
            );
        });
    }

    renderItem = ({ item }) => (
        <View key={item.id}>
            <Text>{item.designation}</Text>
            <Text>{item.quantity}</Text>
            <Text>{item.uri}</Text>
        </View>
    )

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.items}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        );
    }
}
