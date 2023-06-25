import React from 'react';
import {View, Button} from 'react-native';
import CameraScreen from './CameraScreen'
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';

export default class Dashboard extends React.Component{
    render(){

        console.log(this.props)
            return (
                <View>
                    <Header title="Vous êtes connecté"/>
                    <Paragraph>
                        Bienvenu {this.props.route.params.username}
                    </Paragraph>
                    <Paragraph>commencer à prendre une photo</Paragraph>
                    <View style={styles.container}>
                        <CameraScreen/>
                    </View>
                    <Button onPress={() => this.props.navigation.navigate('HomePage')} title="Déconnexion"/>
                </View>
            );
    }
};
