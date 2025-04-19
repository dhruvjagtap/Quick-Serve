import React from 'react';
import {
  StyleSheet,
  FlatList,
} from 'react-native';

import providers from '../data/updated_service_providers_with_images.json';
import { useNavigation } from '@react-navigation/native';
import ProviderCard from './ProviderCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { ServiceProvider } from '../types'; // adjust path as needed

export type AuthStackParamList = {
  ProviderProfile: { provider: ServiceProvider };
};

const ProvidersGrid = () => {

    
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  return (
    <FlatList
      data={providers}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ProviderCard
          name={item.name}
          image_url={item.image_url}
          rating={item.rating}
          onPress={() => navigation.navigate('ProviderProfile', { provider: item })}
        />
      )}
      contentContainerStyle={styles.grid}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    padding: 10,
  },
});

export default ProvidersGrid;
