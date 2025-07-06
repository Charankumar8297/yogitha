
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

 // your component
import HomeScreen from './screens/HomeScreen';

import EmployeeFrom from './components/EmployeeFrom';
import AssetsFrom from './components/AssetsFrom';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
       
        <Stack.Screen name="EmployeeFrom" component={EmployeeFrom} />
        <Stack.Screen name="AssetsFrom" component={AssetsFrom} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
