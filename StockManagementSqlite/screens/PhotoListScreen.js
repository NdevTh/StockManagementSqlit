import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { retrievePhotosFromDB, deletePhotoFromDB } from './Database.js';

export default class PhotoListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: []
        };
    }

    // Méthode appelée lorsque le composant est monté ou lorsqu'il reçoit le focus
    componentDidMount() {
        // Ajout d'un écouteur de focus pour appeler fetchPhotos à chaque fois que le composant reçoit le focus
        this.props.navigation.addListener('focus', this.fetchPhotos);
        this.fetchPhotos();
    }



    fetchPhotos = () => {
        retrievePhotosFromDB((photos) => {
            this.setState({ photos: photos });
        });
    };

    deletePhoto = (id) => {
        deletePhotoFromDB(id, (success) => {
            if (success) {
                this.fetchPhotos();
            } else {
                console.log('Erreur de suppression de la photo');
            }
        });
    };

    renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <Text>{item.designation}</Text>
                <Text>{item.quantity}</Text>
                <Image source={{ uri: item.image }} style={styles.image} />
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => this.deletePhoto(item.id)}>
                    <Text style={styles.deleteButtonText}>Supprimer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.modifButton}
                    onPress={() => this.props.navigation.navigate('PhotoModif', { photoId: item.id })}>
                    <Text style={styles.deleteButtonText}>Modifier</Text>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.photos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={this.renderItem}
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
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modifButton: {
        backgroundColor: 'blue',
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
});
