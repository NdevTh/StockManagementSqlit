import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from "./screens/HomePage";
import LoginScreen from "./screens/LoginSreen";
import RegisterScreen from "./screens/RegisterScreen";
import DashBoard from "./screens/DashBoard";
import ForgortPassWordScreen from "./screens/ForgorPassWordScreen";
const Stack = createNativeStackNavigator();
import { Provider } from 'react-redux';
import Store from './store/configStore'

//import { StatusBar } from 'expo-status-bar'; 
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

const App = () => {
  return (
      <Provider store={Store}>
          <NavigationContainer>
              <Stack.Navigator>
                  <Stack.Screen
                      name="HomePage"
                      component={HomePage}
                  />
                  <Stack.Screen name="Loginscreen" component={LoginScreen} />
                  <Stack.Screen name="Registerscreen" component={RegisterScreen} />
                  <Stack.Screen name="ForgotPasswordscreen" component={ForgortPassWordScreen} />
                  <Stack.Screen name="Dashboard" component={DashBoard} />
              </Stack.Navigator>
          </NavigationContainer>
      </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
