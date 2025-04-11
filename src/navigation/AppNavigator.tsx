// navigation/AppNavigator.tsx
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import WelcomeScreen from '../screens/WelcomeScreen';
import CustomerLogin from '../screens/auth/CustomerLogin';
import ProviderLogin from '../screens/auth/ProviderLogin';
import CustomerSignUp from '../screens/auth/CustomerSignUp';
import ProviderSignUp from '../screens/auth/ProviderSignUp';
import CustomerDrawerNavigator from './CustomerDrawerNavigator.tsx';
import ProviderDrawerNavigator from './ProviderDrawerNavigator.tsx';
import SplashScreen from '../screens/SplashScreen.tsx';
import { AuthStackParamList } from '../types.ts';


const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  const isProvider = user?.email?.includes('@provider.com');

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : user ? (
          isProvider ? (
            <Stack.Screen name="ProviderDrawerNavigator" component={ProviderDrawerNavigator} />
          ) : (
            <Stack.Screen name="CustomerDrawerNavigator" component={CustomerDrawerNavigator} />
          )
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="CustomerLogin" component={CustomerLogin} />
            <Stack.Screen name="ProviderLogin" component={ProviderLogin} />
            <Stack.Screen name="CustomerSignUp" component={CustomerSignUp} />
            <Stack.Screen name="ProviderSignUp" component={ProviderSignUp} />
          </>
        )}
      </Stack.Navigator>
  );
}


