// ProviderSignUp.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';


type AuthStackParamList = {
  ProviderLogin: undefined;
  ProviderSignUp: undefined;
};

type NavigationProp = StackNavigationProp<AuthStackParamList, 'ProviderSignUp'>;

const ProviderSignUp = () => {
  const navigation = useNavigation<NavigationProp>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [fees, setFees] = useState('');
  const [experience, setExperience] = useState('');
  const [availability, setAvailability] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState<{ uri: string; fileName?: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  useEffect(() => {
    fetchLocation();
  }, []);
  
  
  const fetchLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location permission is required.');
      return;
    }
  
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      error => {
        console.log('Location error:', error);
        Alert.alert('Location Error', 'Failed to fetch location.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };
  
  

  const handleImagePick = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets && result.assets.length > 0) {
      const selected = result.assets[0];
      if (selected.uri) {
        setImage({ uri: selected.uri, fileName: selected.fileName });
      } else {
        Alert.alert('Error', 'Image URI not found.');
      }
    }
  };

  const handleSignUp = async () => {
    // Validate password length before proceeding
    if (password.length < 8) {
      Alert.alert('Password must be at least 8 characters');
      return;
    }
  
    if (!name || !email || !password || !phone || !service || !fees || !experience || !availability || !address) {
      Alert.alert('Validation', 'Please fill all fields.');
      return;
    }
  
    try {
      const userCred = await auth().createUserWithEmailAndPassword(email, password);
      const userId = userCred.user.uid;
  
      let imageUrl = '';
      if (image?.uri) {
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const storageRef = storage().ref(`providerImages/${userId}.jpg`);
        await storageRef.put(blob);
        imageUrl = await storageRef.getDownloadURL();
      }
  
      await firestore().collection('providers').doc(userId).set({
        name,
        email,
        phone,
        fees,
        service,
        experience,
        availability,
        address,
        imageUrl: imageUrl || '', // Default to empty string if no image
        location: location ? {
          latitude: location.latitude,
          longitude: location.longitude,
        } : null,
      });
  
      // Update user profile with name
      await auth().currentUser?.updateProfile({ displayName: name });
  
      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('ProviderLogin');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    }
  };


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Provider Sign Up</Text>

        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.toggleText}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>

        <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Service" value={service} onChangeText={setService} />
        <TextInput style={styles.input} placeholder="Fees" value={fees} onChangeText={setFees} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Experience (in years)" value={experience} onChangeText={setExperience} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Availability Time (eg: 9 AM - 6 PM)" value={availability} onChangeText={setAvailability} />
        <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />

        <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
          <Text style={styles.imagePickerText}>{image ? 'Change Image' : 'Add Profile Photo'}</Text>
        </TouchableOpacity>

        {image && <Image source={{ uri: image.uri }} style={styles.imagePreview} />}

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ProviderLogin')} style={styles.loginToggle}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#34718F',
  },
  input: {
    height: 48,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  passwordInput: {
    flex: 1,
    height: 48,
  },
  toggleText: {
    color: '#34718F',
    fontWeight: '600',
    padding: 8,
  },
  imagePicker: {
    backgroundColor: '#34718F',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  imagePickerText: {
    color: '#fff',
    fontWeight: '600',
  },
  imagePreview: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 20,
  },
  signUpButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginToggle: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginText: {
    color: '#34718F',
    fontWeight: '600',
  },
});

export default ProviderSignUp;
