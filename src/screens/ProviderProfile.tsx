import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import TopBar from '../components/TopBar';

const ProviderProfile = ({ route, navigation }: any) => {
  const { provider } = route.params;

  return (
    <View style={styles.container}>
      <TopBar title={provider.name} onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: provider.image_url }} style={styles.image} />

        <Text style={styles.name}>{provider.name}</Text>
        <Text style={styles.profession}>{provider.profession}</Text>
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profession: {
    fontSize: 20,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginVertical: 5,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  review: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  reviewName: {
    fontWeight: 'bold',
  },
  reviewText: {
    marginTop: 5,
  },
  reviewRating: {
    marginTop: 5,
    fontStyle: 'italic',
  },
});

export default ProviderProfile;
