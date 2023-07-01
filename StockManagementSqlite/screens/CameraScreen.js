import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Button, Modal, TextInput, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';


import { savePhotoToDB } from './Database';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [designation, setDesignation] = useState("");
  const [quantity, setQuantity] = useState("");

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const base64Image = data.base64;
      
      setPreviewVisible(true);
      setCapturedImage(base64Image);
    }
  }

  const savePhoto = async () => {
    savePhotoToDB(designation, quantity, capturedImage);
    setPreviewVisible(false);
    setCapturedImage(null);
    setDesignation("");
    setQuantity("");
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
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
            onPress={takePicture}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Take Picture </Text>
          </TouchableOpacity>
        </View>
      </Camera>

      <Modal
        animationType="slide"
        transparent={false}
        visible={previewVisible}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ flex: 1 }} source={{ uri: `data:image/gif;base64,${capturedImage}` }} />
          <TextInput 
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => setDesignation(text)}
            value={designation}
            placeholder="Designation"
          />
          <TextInput 
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => setQuantity(text)}
            value={quantity}
            placeholder="Quantity"
          />
          <Button title="Save" onPress={savePhoto} />
        </View>
      </Modal>
    </View>
  );
}
