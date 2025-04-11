import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to QuickServe</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CustomerLogin' as never)}>
        <Text style={styles.buttonText}>Login as Customer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProviderLogin' as never)}>
        <Text style={styles.buttonText}>Login as Provider</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('CustomerSignUp' as never)}>
        <Text style={styles.linkText}>Sign up as Customer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('ProviderSignUp' as never)}>
        <Text style={styles.linkText}>Sign up as Provider</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#34718F',
  },
  title: {
    fontSize: 28,
    marginBottom: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
  },
  buttonText: {
    color: '#34718F',
    textAlign: 'center',
    fontSize: 16,
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default WelcomeScreen;
