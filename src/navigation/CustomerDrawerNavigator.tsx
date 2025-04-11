import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerHome from '../screens/CustomerHome';
import ServiceScreen from '../screens/ServiceScreen';
import ProviderProfile from '../screens/ProviderProfile';
import Booking from '../screens/Booking';
import Chat from '../screens/Chat';
import BookedServices from '../screens/BookedServices';
import CustomDrawerContent from '../components/CustomerDrawerContent';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const CustomerStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CustomerHome" component={CustomerHome} />
    <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
    <Stack.Screen name="ProviderProfile" component={ProviderProfile} />
    <Stack.Screen name="Booking" component={Booking} />
    <Stack.Screen name="Chat" component={Chat} />
    <Stack.Screen name="BookedServices" component={BookedServices} />
  </Stack.Navigator>
);

export default function CustomerDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="HomeStack" component={CustomerStack} />
    </Drawer.Navigator>
  );
}








