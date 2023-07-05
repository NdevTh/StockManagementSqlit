import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from "./screens/HomePage";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DashBoard from "./screens/DashBoard";
import ForgortPassWordScreen from "./screens/ForgotPassWordScreen";
import CameraScreen from "./screens/CameraScreen";
import { setupDB } from './screens/Database.js';
import PhotoListScreen from './screens/PhotoListScreen';
import PhotoModif from './screens/PhotoModif';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    setupDB(); // Appel de la fonction setupDB lors du montage du composant
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Loginscreen" component={LoginScreen} />
        <Stack.Screen name="Registerscreen" component={RegisterScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="ForgotPasswordscreen" component={ForgortPassWordScreen} />
        <Stack.Screen name="Dashboard" component={DashBoard} />
        <Stack.Screen name="PhotoListScreen" component={PhotoListScreen} />
        <Stack.Screen name="PhotoModif" component={PhotoModif} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
