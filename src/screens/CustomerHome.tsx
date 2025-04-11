// src/screens/CustomerHome.tsx
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import TopBar from '../components/TopBar';
import Search from '../components/Search';
import CategoryGrid from '../components/CategoryGrid';



const CustomerHome: React.FC = () => {
  
  return (
    <View style={styles.container}>
      {/* Menu TopBar */}
      <TopBar
        title="Quick Serve"  
      />

      {/* Search Component */}
      <Search />

      {/* Category Grid */}
      <ScrollView>
        <CategoryGrid />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default CustomerHome;
