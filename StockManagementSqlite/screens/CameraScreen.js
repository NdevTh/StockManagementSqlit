import React, { memo } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, button } from 'react-native';
import { Camera } from 'expo-camera';
import { savePhotoToDB } from './Database';


export default class CameraScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: null,
            type: Camera.Constants.Type.back,
            uri: null,
            designation :'',
            quantity :0,
        };
    }

    async componentDidMount(){
        const {status} = await Camera.requestCameraPermissionsAsync();
        this.setState({hasPermission: status === 'granted'});
    }

    async snap(){
      if (this.camera) {
          let photo = await this.camera.takePictureAsync();
          console.log(photo)
          this.setState({uri: photo.uri})
          // Enregistrer la photo dans la base de données
          savePhotoToDB(photo.uri, (success) => {
              if (success) {
                  this.props.navigation.navigate('PhotoListScreen');
              } else {
                  console.log('Erreur d\'enregistrement de la photo');
              }
          });
      }
  }


    render() {
        if (this.state.hasPermission === null) {
            return <View/>;
        }
        if (this.state.hasPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Désignation"
                    onChangeText={(text) => this.setState({designation: text})}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Quantité"
                    keyboardType="numeric"
                    onChangeText={(text) => this.setState({quantity: parseInt(text)})}
                />
            </View>
                <Camera style={styles.camera} type={this.state.type} ref={ref => {
                    this.camera = ref;
                }}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                this.setState({type:
                                    this.state.type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                });
                            }}>
                            <Text style={styles.text}> Selfi </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSnap}
                            onPress={() => {
                                this.snap()
                            }}>
                            <Text style={styles.text}> Prnedre une photo </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
                <View style={styles.buttonContainer}>
                    <Image style={{flex: 1}} source={{uri: this.state.uri ? this.state.uri : 'https://reactnative.dev/img/tiny_logo.png'}}/>
                </View>
            </View>
        );

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    buttonSnap: {
        marginTop: 20,
        flex: 0.3,
        alignSelf: 'flex-start',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
  },
  input: {
      flex: 1,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginRight: 10,
  },

});
