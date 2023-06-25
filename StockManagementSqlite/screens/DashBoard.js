import React from 'react';
import {View, Button} from 'react-native';
import { Camera } from 'expo-camera';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';

export default class Dashboard extends React.Component{
    render(){

        console.log(this.props)
            return (
                <View>
                    <Header title="Vous etes connecté"/>
                    <Paragraph>
                        Bienvenu {this.props.route.params.username}
                    </Paragraph>
                    <Paragraph>commencer à prendre une photo</Paragraph>
                    <Button onPress={() => this.props.navigation.navigate('Homescreen')} title="Déconnexion"/>
                </View>
            );
    }
};
