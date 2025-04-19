// screens/auth/CustomerLogin.tsx

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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import { AuthStackParamList } from '../../types';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const CustomerLogin = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isSignUp, setIsSignUp] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setName('');
    setPhone('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Please fill in all required fields');
      return;
    }

    if (isSignUp) {
      if (!name || !phone || !confirmPassword) {
        Alert.alert('Please fill in all fields for sign up');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Passwords do not match');
        return;
      }

      try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        
        await auth().currentUser?.updateProfile({ displayName: name });

        Alert.alert('Account created! You can now log in.');
        setIsSignUp(false);
      } catch (error: any) {
        Alert.alert('Error', error.message);
      }
    } else {
      try {
        await auth().signInWithEmailAndPassword(email, password);
        // navigation.navigate('CustomerDrawerNavigator');
      } catch (error: any) {
        Alert.alert('Login failed', error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Login'}</Text>

      {isSignUp && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </>
      )}

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

      {isSignUp && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>
          {isSignUp ? 'Continue' : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleMode}>
        <Text style={styles.toggleText}>
          {isSignUp
            ? 'Already have an account? Login'
            : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default CustomerLogin;

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
  toggleText: {
    marginTop: 20,
    color: '#34718F',
    alignSelf: 'center',
    fontSize: 14,
  },
});
