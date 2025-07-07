import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AssetsFrom from './components/AssetsFrom';
import EmployeeDetailsScreen from './components/EmployeeDetailsScreen';
import AssetDetailsScreen from './components/AssetsDetailsScreen';
import EmployeeFrom from './components/EmployeeFrom';
import AssetListScreen from './screens/AssetListScreen';
import EmployeeListScreen from './screens/EmployeeListScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        {/* Main Home */}
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'QR Scanner' }} />

        {/* Forms */}
        <Stack.Screen name="EmployeeFrom" component={EmployeeFrom} options={{ title: 'Employee Form' }} />
        <Stack.Screen name="AssetsFrom" component={AssetsFrom} options={{ title: 'Assets Form' }} />

        {/* Details Screens */}
        <Stack.Screen name="EmployeeDetails" component={EmployeeDetailsScreen} options={{ title: 'Employee Details' }} />
        {/* <Stack.Screen name="AssetDetails" component={AssetsDetailsScreen} options={{ title: 'Asset Details' }} /> */}
        <Stack.Screen name="AssetsDetailsScreen" component={AssetDetailsScreen} />

        {/* Lists (optional) */}
        <Stack.Screen name="Employees" component={EmployeeListScreen} options={{ title: 'Employees List' }} />
        <Stack.Screen name="Assets" component={AssetListScreen} options={{ title: 'Assets List' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
