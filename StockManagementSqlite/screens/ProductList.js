import React, { useState, useEffect } from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Camera } from 'expo-camera';

const db = SQLite.openDatabase('db.db'); // Ouvrir la base de données

const ProductList = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `create table if not exists products (
          id integer primary key not null,
          designation text,
          date text,
          quantity integer,
          deleted integer,
          modified integer
        );`
      );
    });
  }, []);

  const handleAddProduct = (productName, date, quantity, deleted, modified) => {
    db.transaction(
      tx => {
        tx.executeSql('insert into products (designation, date, quantity, deleted, modified) values (?,?,?,?,?)', 
        [productName, date, quantity, deleted, modified]);
      },
      null,
      updateProductList
    );
  };

  const updateProductList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from products;', [], (_, { rows: { _array } }) =>
        setProductList(_array)
      );
    });
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View>
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={async () => {
              if (this.camera) {
                let photo = await this.camera.takePictureAsync();
                // NOTE: You'll need to define values for the other fields here
                let date = "2023-07-01"; // Example date
                let quantity = 1; // Example quantity
                let deleted = 0; // Example deleted flag
                let modified = 0; // Example modified flag
                handleAddProduct(photo.uri, date, quantity, deleted, modified);
              }
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Capture </Text>
          </TouchableOpacity>
        </View>
      </Camera>

      {productList.map((product, index) => (
        <Text key={index}>{product.designation}</Text>
