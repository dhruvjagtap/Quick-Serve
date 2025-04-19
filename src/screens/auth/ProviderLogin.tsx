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
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'; // Import auth from Firebase React Native SDK
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const ProviderLogin: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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
      Alert.alert('Missing Fields', 'Email and password are required.');
      return;
    }

    if (isSignUp) {
      if (!name || !phone || !confirmPassword) {
        Alert.alert('Missing Fields', 'Please fill out all fields.');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Password Mismatch', 'Passwords do not match.');
        return;
      }

      // Start loading state
      setLoading(true);

      try {
        // Sign up using Firebase auth (React Native SDK)
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        await userCredential.user?.updateProfile({ displayName: name });
        Alert.alert('Success', 'Provider account created!');
        setIsSignUp(false);
        // Clear form after successful signup
        setName('');
        setPhone('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } catch (error: any) {
        const errorMessage = error.message || 'Something went wrong.';
        Alert.alert('Sign Up Failed', errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      // Start loading state
      setLoading(true);

      try {
        // Sign in using Firebase auth (React Native SDK)
        await auth().signInWithEmailAndPassword(email, password);
        // Navigate to the dashboard or provider-specific screen after successful login
        navigation.navigate("ProviderDrawerNavigator");
      } catch (error: any) {
        const errorMessage = error.message || 'Something went wrong.';
        Alert.alert('Login Failed', errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>{isSignUp ? 'Provider Sign Up' : 'Provider Login'}</Text>

      {isSignUp && (
        <>
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
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{isSignUp ? 'Continue' : 'Login'}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleMode()}>
        <Text style={styles.toggleText}>
          {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ProviderLogin;

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
