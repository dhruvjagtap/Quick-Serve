// src/navigation/AppNavigator.tsx
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext } from '../context/AuthContext';

import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import CustomerLogin from '../screens/auth/CustomerLogin';
import ProviderLogin from '../screens/auth/ProviderLogin';
import CustomerSignUp from '../screens/auth/CustomerSignUp';
import ProviderSignUp from '../screens/auth/ProviderSignUp';
import CustomerHome from '../screens/CustomerHome';
import ProviderHome from '../screens/ProviderHome';
import ServiceScreen from '../screens/ServiceScreen';
import ProviderProfile from '../screens/ProviderProfile';


export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  CustomerLogin: undefined;
  ProviderLogin: undefined;
  CustomerSignUp: undefined;
  ProviderSignUp: undefined;
  CustomerHome: undefined;
  ProviderHome: undefined;
  ServiceScreen: { serviceName: string }; 
  ProviderProfile: { provider: any };    
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  const isProvider = user?.email?.includes('@provider.com');

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
  {loading ? (
    <Stack.Screen name="Splash" component={SplashScreen} />
  ) : user ? (
    isProvider ? (
      <>
        <Stack.Screen name="ProviderHome" component={ProviderHome} />
        {/* Optional: Add more provider-specific screens here */}
      </>
    ) : (
      <>
        <Stack.Screen name="CustomerHome" component={CustomerHome} />
        <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
        <Stack.Screen name="ProviderProfile" component={ProviderProfile} />
      </>
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
};


export default AppNavigator;
