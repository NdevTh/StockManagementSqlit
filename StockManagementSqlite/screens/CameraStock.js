import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

// Fonction pour initialiser la base de données SQLite
const setupDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users
        (id INTEGER PRIMARY KEY NOT NULL,
        username TEXT,
        password TEXT,
        photo BLOB);`,
        [],
        resolve,
        (_, error) => reject(error)
      );
    });
  });
};

// Fonction pour ajouter une photo à la base de données SQLite
const addPhotoToDB = (username, password, photo) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO users (username, password, photo) values (?, ?, ?);`,
        [username, password, photo],
        (_, { rows }) => resolve(rows),
        (_, error) => reject(error)
      );
    });
  });
};

// Composant principal
export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  // Initialisation de la base de données et demande d'autorisation pour la caméra
  useEffect(() => {
    setupDatabaseAsync();
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  // Fonction pour prendre une photo
  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Fonction pour se connecter
  const handleLogin = async () => {
    await addPhotoToDB(username, password, image);
    // Ici, vérifiez les informations d'identification de l'utilisateur et naviguez vers la prochaine page
  }

  return
