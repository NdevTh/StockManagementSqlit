import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { retrievePhotosFromDB, deletePhotoFromDB } from './Database.js';

const PhotoListScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchPhotos);

    // Nettoyage de l'écouteur lors du démontage du composant
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // Effectuer la recherche à chaque fois que le texte de recherche change
    performSearch();
  }, [searchText]);

  const fetchPhotos = () => {
    retrievePhotosFromDB((photos) => {
      setPhotos(photos);
      setFilteredPhotos(photos);
    });
  };

  const deletePhoto = (id) => {
    deletePhotoFromDB(id, (success) => {
      if (success) {
        fetchPhotos();
      } else {
        console.log('Erreur de suppression de la photo');
      }
    });
  };

  const performSearch = () => {
    const filtered = photos.filter((photo) => {
      const designation = photo.designation.toLowerCase();
      const searchTextLower = searchText.toLowerCase();
      return designation.includes(searchTextLower);
    });
    setFilteredPhotos(filtered);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Text>{item.designation}</Text>
        <Text>{item.quantity}</Text>
        <Image source={{ uri: item.image }} style={styles.image} />
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deletePhoto(item.id)}>
          <Text style={styles.deleteButtonText}>Supprimer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modifButton}
          onPress={() => navigation.navigate('PhotoModif', { photoId: item.id })}>
          <Text style={styles.deleteButtonText}>Modifier</Text>
          // ajouter ? 
          <Text style={styles.deleteButtonText}>Ajouter des images</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <Button title="OK" onPress={performSearch} />
      </View>
      <FlatList
        data={filteredPhotos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    paddingHorizontal: 10,
  },
});

export default PhotoListScreen;
