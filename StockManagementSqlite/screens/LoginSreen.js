import React from 'react';
import { Alert, TouchableOpacity, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Header from '../Components/Header';
import InputText from '../Components/InputText'
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import * as SQLite from 'expo-sqlite' 

<View style={styles.container}>
<Text>Bienvenue {}</Text>
<Text>Cliquez pour vous connectez</Text>

<Button onPress={()=> navigate('LoginScreen')}
title='Connexion'></Button>

<StatusBar style="auto" />
</View>

