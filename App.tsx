import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import ServiceScreen from './src/screens/ServiceScreen';
import ProviderProfile from './src/screens/ProviderProfile';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
          <Stack.Screen name="ProviderProfile" component={ProviderProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
