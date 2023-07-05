import React from 'react';
import { View, Text, Button, TextInput,StyleSheet } from 'react-native';
import { retrievePhotosFromDB, modifPhotoFromDB } from './Database.js';

export default class PhotoModif extends React.Component {
    constructor(props) {
        super(props);
        const { route } = this.props;
        this.state = {
            id: route.params.photoId,
            designation: '',
            quantity: ''
        };
    }

    componentDidMount() {
        this.fetchPhoto();
    }

    fetchPhoto = () => {
        retrievePhotosFromDB(this.state.id, (photo) => {
            this.setState({ designation: photo.designation, quantity: photo.quantity });
        });
    };
    
    modifyPhoto = () => {
        const { id, designation, quantity } = this.state;
        modifPhotoFromDB(id, designation, quantity, (success) => {
            if (success) {
                this.fetchPhotos(); // Met à jour la liste des photos depuis la base de données
                this.props.navigation.navigate('PhotoListScreen'); // Navigue vers PhotoListScreen
            } else {
                console.log('Erreur de modification de la photo');
            }
        });
    };
    

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Modifier Photo</Text>
                <TextInput
                placeholder='nom'
                    style={styles.input}
                    value={this.state.designation}
                    onChangeText={designation => this.setState({ designation })}
                />
                <TextInput
                placeholder='quantité'
                keyboardType='numeric'
                    style={styles.input}
                    value={this.state.quantity}
                    onChangeText={quantity => this.setState({ quantity })}
                />
<Button title="Valider" onPress={() => { this.modifyPhoto(); this.props.navigation.navigate('PhotoListScreen'); }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});