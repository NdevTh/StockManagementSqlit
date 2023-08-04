import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { retrievePhotosFromDB, modifPhotoFromDB } from './Database.js';

export default class PhotoModif extends React.Component {
  constructor(props) {
    super(props);
    const { route } = props;
    const photoId = route.params?.photoId || 0; // Ajouter une valeur par défaut si photoId n'est pas défini
    this.state = {
      id: photoId,
      designation: '',
      quantity: ''
    };
  }

  componentDidMount() {
    this.fetchPhoto();
  }
  
  fetchPhoto = () => {
    retrievePhotosFromDB((photos) => {
      const photo = photos.find((item) => item.id === this.state.id);
      if (photo) {
        this.setState({ designation: photo.designation, quantity: photo.quantity });
      }
    });
  };
  

  modifyPhoto = () => {
    const { id, designation, quantity } = this.state;
    modifPhotoFromDB(id, designation, quantity, (success) => {
      if (success) {
        this.props.navigation.navigate('PhotoListScreen'); // Navigue vers PhotoListScreen
        this.fetchPhoto(); // Met à jour la photo depuis la base de données
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
          placeholder="nom"
          style={styles.input}
          value={this.state.designation}
          onChangeText={(designation) => this.setState({ designation })}
        />
      <TextInput
  placeholder="quantité"
  keyboardType="numeric"
  style={styles.input}
  value={this.state.quantity.toString()}
  onChangeText={(quantity) => this.setState({ quantity: Number(quantity) })}
/>

        <Button
          title="Valider"
          onPress={() => {
            this.modifyPhoto();
            this.props.navigation.navigate('PhotoListScreen');
          }}
        />
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
