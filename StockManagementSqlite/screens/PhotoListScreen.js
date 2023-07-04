import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { retrievePhotosFromDB } from './Database.js';

export default class PhotoListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: []
        };
    }

    renderItem = ({ item }) => {
        return (
          <View style={styles.container}>
            <Text>{item.designation}</Text>
            <Text>{item.quantity}</Text>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        );
      };
      

    componentDidMount() {
        retrievePhotosFromDB((photos) => {
            this.setState({ photos: photos });
        });
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.photos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={styles.container}>
                            <Text>{item.designation}</Text>
                            <Text>{item.quantity}</Text>
                            <Image source={{uri: item.image}} style={styles.image} />
                        </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
    }
    
});
