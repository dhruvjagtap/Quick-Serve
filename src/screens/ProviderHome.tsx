import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Switch } from 'react-native';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';

const upcomingBookings = [
  { id: '1', customer: 'Riya Sharma', date: 'April 2, 10:00 AM', service: 'Home Cleaning' },
  { id: '2', customer: 'Aman Gupta', date: 'April 3, 2:00 PM', service: 'Electrician' },
];

const ProviderHome = () => {
  const [status, setStatus] = React.useState(true);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome, Provider!</Text>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Service Status: {status ? 'Active' : 'Inactive'}</Text>
        <Switch value={status} onValueChange={setStatus} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Upcoming Bookings</Text>
        <FlatList
          data={upcomingBookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookingItem}>
              <Text style={styles.bookingText}>{item.service} with {item.customer}</Text>
              <Text style={styles.bookingDate}>{item.date}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Earnings</Text>
        <Text style={styles.earningsText}>Today: ₹1,200</Text>
        <Text style={styles.earningsText}>This Week: ₹5,800</Text>
      </View>

      <View style={styles.navButtons}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Booking Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Reviews</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#ff4d4d' }]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProviderHome;

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20,
  },
  statusContainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 16, elevation: 2,
  },
  cardTitle: {
    fontSize: 18, fontWeight: 'bold', marginBottom: 10,
  },
  bookingItem: {
    marginBottom: 10,
  },
  bookingText: {
    fontSize: 16,
  },
  bookingDate: {
    fontSize: 14, color: '#666',
  },
  earningsText: {
    fontSize: 16,
  },
  navButtons: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50', padding: 12, borderRadius: 8, marginBottom: 10,
  },
  buttonText: {
    color: '#fff', textAlign: 'center', fontSize: 16,
  },
});
