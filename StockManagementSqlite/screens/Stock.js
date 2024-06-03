import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);

  const handlePress = () => {
    setCount(count + 1);
    Alert.alert('Button Pressed!', `You have pressed the button ${count + 1} times.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, React Native!</Text>
      <Button
        title="Press me"
        onPress={handlePress}
      />
      <Text style={styles.count}>You have pressed the button {count} times.</Text>
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  count: {
    marginTop: 20,
    fontSize: 18,
  },
});


  