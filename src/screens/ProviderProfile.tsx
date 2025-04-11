// ProviderProfile.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';
import TopBar from '../components/TopBar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
// import RootStackParamList from "..";
import { RootStackParamList } from '../types';


// Interfaces
interface Review {
  customer_name: string;
  comment: string;
  rating: number;
}

interface ServiceProvider {
  id: number;
  name: string;
  profession: string;
  mobile_number: string;
  email: string;
  fees: number;
  rating: number;
  experience_years: number;
  location: string;
  availability: string;
  verified: boolean;
  reviews: Review[];
  latitude: number;
  longitude: number;
  image_url: string;
  past_work_photos?: string[];
}

// Props
type ProviderProfileProps = {
  route: RouteProp<RootStackParamList, 'ProviderProfile'>;
  navigation: StackNavigationProp<RootStackParamList, 'ProviderProfile'>;
};

const ProviderProfile: React.FC<ProviderProfileProps> = ({ route, navigation }) => {
  const { provider } = route.params;

  const handleCall = () => {
    Linking.openURL(`tel:${provider.mobile_number}`);
  };

  const handleBookNow = () => {
    navigation.navigate('Booking', { provider });
  };

  const handleChat = () => {
    navigation.navigate('Chat', { provider });
  };

  const handleQuickService = () => {
    Alert.alert('Quick service requested!');
  };

  return (
    <View style={styles.container}>
      <TopBar title={provider.name}  />

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: provider.image_url }} style={styles.image} />
        <Text style={styles.name}>{provider.name}</Text>
        <Text style={styles.profession}>{provider.profession}</Text>

        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={20} color="#FFD700" />
          <Text style={styles.ratingText}>{provider.rating}</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <MaterialIcons name="email" size={20} color="#555" />
            <Text style={styles.infoText}>{provider.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="work" size={20} color="#555" />
            <Text style={styles.infoText}>
              {provider.experience_years} years of experience
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Feather name="phone" size={20} color="#555" />
            <Text style={styles.infoText}>{provider.mobile_number}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="location-on" size={20} color="#555" />
            <Text style={styles.infoText}>{provider.location}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleBookNow}>
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleCall}>
            <Image
              source={require('../assets/telephone.png')}
              style={styles.iconImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.tertiaryButton]}
            onPress={handleChat}>
            <Image
              source={require('../assets/chat.png')}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.quickServiceButton}
          onPress={handleQuickService}>
          <Text style={styles.quickServiceText}>Get a Quick Service</Text>
        </TouchableOpacity>

        {/* Reviews */}
        <Text style={styles.sectionTitle}>Customer Reviews</Text>
        {provider.reviews &&
          provider.reviews.map((review: Review, index: number) => (
            <View key={index} style={styles.reviewCard}>
              <Text style={styles.reviewName}>{review.customer_name}</Text>
              <View style={styles.reviewRatingContainer}>
                <FontAwesome name="star" size={16} color="#FFD700" />
                <Text style={styles.reviewRatingText}>{review.rating}</Text>
              </View>
              <Text style={styles.reviewText}>{review.comment}</Text>
            </View>
          ))}

        {/* Past Work Gallery */}
        {provider.past_work_photos && provider.past_work_photos.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Past Work</Text>
            <View style={styles.galleryContainer}>
              {provider.past_work_photos.map((photo: string, index: number) => (
                <Image
                  key={index}
                  source={{ uri: photo }}
                  style={styles.galleryImage}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
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
    marginBottom: 5,
  },
  profession: {
    fontSize: 20,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 18,
    marginLeft: 5,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
  },
  secondaryButton: {
    backgroundColor: '#2196F3',
  },
  tertiaryButton: {
    backgroundColor: '#FF9800',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  quickServiceButton: {
    backgroundColor: '#d62828',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 25,
  },
  quickServiceText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  reviewCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  reviewName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  reviewRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewRatingText: {
    marginLeft: 5,
    fontSize: 14,
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  galleryImage: {
    width: '32%',
    aspectRatio: 1,
    marginBottom: '2%',
    borderRadius: 5,
  },
});

export default ProviderProfile;
