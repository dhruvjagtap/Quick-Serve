import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, Feather, etc.

type TopBarProps = {
  title: string;
};

const TopBar: React.FC<TopBarProps> = ({ title}) => {
  const navigation = useNavigation();

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={styles.container}>
      {/* Back or Menu Icon */}
      <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
        <Image
          source={require('../assets/stack.png')} // Make sure the path is correct
          style={styles.menuIcon}
        />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.font}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#023047',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: '100%',
  },
  iconContainer: {
    marginRight: 16,
  },
  font: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  menuIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  menuButton: {
    marginRight: 12,
  },
});

export default TopBar;
