import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';


export default class Dashboard extends React.Component {
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Header title="Vous êtes connecté" />
        <Paragraph>Bienvenue {this.props.route.params.username}</Paragraph>
        <Paragraph>Commencer à prendre une photo</Paragraph>

        <View style={styles.cameraContainer}>
          <CameraScreen />
        </View>

        <PhotoList />
        
        <Button
          onPress={() => this.props.navigation.navigate('HomePage')}
          title="Déconnexion"
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
  },
  cameraContainer: {
    height: 200,
    marginBottom: 16,
  },
});
