// navigation/ProviderDrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProviderProfile from '../screens/ProviderProfile';
import Chat from '../screens/Chat';
import ProviderDrawerContent from '../components/ProviderDrawerContent';
import ServiceScreen from '../screens/ServiceScreen';
import Booking from '../screens/Booking';
import Chats from '../screens/Chats';
import BookedServices from '../screens/BookedServices';
import CustomerHome from '../screens/CustomerHome';
import Community from '../screens/Community';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const ProviderStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CustomerHome" component={CustomerHome} />
    <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
    <Stack.Screen name="ProviderProfile" component={ProviderProfile} />
    <Stack.Screen name="Booking" component={Booking} />
    <Stack.Screen name="Chat" component={Chat} />
    <Stack.Screen name="Community" component={Community} />
    <Stack.Screen name="Chats" component={Chats} />
    <Stack.Screen name="BookedServices" component={BookedServices} />
  </Stack.Navigator>
);

export default function ProviderDrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <ProviderDrawerContent {...props} />} screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="HomeStack" component={ProviderStack} />
    </Drawer.Navigator>
  );
}
