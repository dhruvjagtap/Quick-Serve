// screens/CustomerSignUp.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthStackParamList } from '../../types';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const CustomerSignUp = () => {
  const navigation = useNavigation<NavigationProp>();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!name || !phone || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      // Set displayName (optional — native SDK doesn’t always update immediately)
      await userCredential.user.updateProfile({ displayName: name });

      await firestore().collection('users').doc(userCredential.user.uid).set({
        name,
        email,
        phone,
        role: 'customer',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('CustomerLogin');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Sign Up Failed', error.message || 'Something went wrong.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CustomerLogin')}>
        <Text style={styles.switchText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default CustomerSignUp;

// styles remain the same as you had
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#34718F',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#34718F',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  switchText: {
    marginTop: 20,
    color: '#34718F',
    alignSelf: 'center',
    fontSize: 14,
  },
});
