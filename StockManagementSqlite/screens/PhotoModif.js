import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { retrievePhotoFromDB, modifPhotoFromDB } from './Database.js';

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
        retrievePhotoFromDB(this.state.id, (photo) => {
            this.setState({ designation: photo.designation, quantity: photo.quantity });
        });
    };

    modifyPhoto = () => {
        const { id, designation, quantity } = this.state;
        modifPhotoFromDB(id, designation, quantity, (success) => {
            if (success) {
                this.props.navigation.goBack();
            } else {
                console.log('Erreur de modification de la photo');
            }
        });
    };

    render() {
        return (
            <View>
                <Text>Modifier Photo</Text>
                <TextInput
                    value={this.state.designation}
                    onChangeText={designation => this.setState({ designation })}
                />
                <TextInput
                    value={this.state.quantity}
                    onChangeText={quantity => this.setState({ quantity })}
                />
                <Button title="Valider" onPress={this.modifyPhoto} />
            </View>
        );
    }
}
