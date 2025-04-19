import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth'; // Firebase Auth for React Native
import firestore from '@react-native-firebase/firestore'; // Firebase Firestore for React Native
import categories from '../data/category.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomerDrawerContent = ({ navigation }: any) => {
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth().currentUser;
      if (user) {
        try {
          const userRef = firestore().doc(`users/${user.uid}`);
          const userSnap = await userRef.get();

          if (userSnap.exists) {
            const userData = userSnap.data();
            setUserName(userData?.name || user.email || '');
          } else {
            setUserName(user.email || '');
          }
        } catch (error) {
          console.error('Error fetching user name:', error);
          setUserName(user.email || '');
        }
      }
    };

    fetchUserName();
  }, []);

  const handleNavigate = (screenName: string, params = {}) => {
    navigation.navigate('HomeStack', {
      screen: screenName,
      params,
    });
  };

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        });
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <DrawerContentScrollView contentContainerStyle={styles.container}>
      <View style={styles.userInfoSection}>
        <Image
          source={require('../assets/profile.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('BookedServices')}>
        <Icon name="calendar-check-outline" size={20} style={styles.icon} />
        <Text style={styles.menuText}>Booked Services</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('Chats')}>
        <Icon name="message-outline" size={20} style={styles.icon} />
        <Text style={styles.menuText}>Chats</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Services</Text>
      <ScrollView>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.menuItem}
            onPress={() =>
              handleNavigate('ServiceScreen', { serviceName: category.name })
            }
          >
            <Icon name="wrench-outline" size={20} style={styles.icon} />
            <Text style={styles.menuText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Icon name="logout" size={20} style={styles.icon} />
        <Text style={styles.menuText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#34718F',
  },
  userInfoSection: {
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#6DA9BF',
    paddingBottom: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D6EAF8',
    marginTop: 20,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  icon: {
    marginRight: 10,
    color: '#fff',
  },
  menuText: {
    fontSize: 16,
    color: '#fff',
  },
  logout: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#6DA9BF',
    paddingTop: 15,
  },
});

export default CustomerDrawerContent;
