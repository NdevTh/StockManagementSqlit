import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as Sqlite from 'expo-sqlite';
import { useState, UseEffect } from 'react';
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Bienvenue sur mon app de gestion</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
