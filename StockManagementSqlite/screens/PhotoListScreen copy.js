import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { retrievePhotosFromDB, deletePhotoFromDB } from './Database.js';

const PhotoListScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const fetchedPhotos = await retrievePhotosFromDB();
      setPhotos(fetchedPhotos);
      setFilteredPhotos(fetchedPhotos);
    };

    const unsubscribe = navigation.addListener('focus', fetchPhotos);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const performSearch = () => {
      const filtered = photos.filter((photo) => {
        const designation = photo.designation.toLowerCase();
        const searchTextLower = searchText.toLowerCase();
        return designation.includes(searchTextLower);
      });
      setFilteredPhotos(filtered);
    };

    performSearch();
  }, [photos, searchText]);

  const deletePhoto = async (id) => {
    const success = await deletePhotoFromDB(id);
    if (success) {
      const fetchedPhotos = await retrievePhotosFromDB();
      setPhotos(fetchedPhotos);
      setFilteredPhotos(fetchedPhotos);
    } else {
      console.log('Erreur de suppression de la photo');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Text>{item.designation}</Text>
      <Text>{item.quantity}</Text>
      <Image source={{ uri: item.image }} style={styles.image} />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deletePhoto(item.id)}
      >
        <Text style={styles.deleteButtonText}>Supprimer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modifButton}
        onPress={() => navigation.navigate('PhotoModif', { photoId: item.id })}
      >
        <Text style={styles.deleteButtonText}>Modifier</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <Button title="OK" onPress={() => {}} />
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
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor:'#ccc',
    marginRight: 10,
    padding: 5,
  },
});

export default PhotoListScreen;
