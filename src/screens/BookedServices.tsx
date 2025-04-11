import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import TopBar from '../components/TopBar';

// Dummy data for booked services
const mockBookedServices = [
  {
    id: '1',
    serviceName: 'Plumbing',
    provider: 'John Doe',
    date: '2025-04-12',
    time: '10:00 AM',
    status: 'Confirmed',
  },
  {
    id: '2',
    serviceName: 'Electrician',
    provider: 'Jane Smith',
    date: '2025-04-14',
    time: '2:30 PM',
    status: 'Pending',
  },
];

const BookedServices = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching booked services from a database
    setTimeout(() => {
      setBookings(mockBookedServices);
      setLoading(false);
    }, 1000);
  }, []);

  const renderBooking = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.serviceName}>{item.serviceName}</Text>
      <Text style={styles.detail}>Provider: {item.provider}</Text>
      <Text style={styles.detail}>Date: {item.date}</Text>
      <Text style={styles.detail}>Time: {item.time}</Text>
      <Text style={[styles.status, item.status === 'Confirmed' ? styles.confirmed : styles.pending]}>
        {item.status}
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
      <View style={styles.container}>
        <TopBar title = {"Booked services"}/>
        <FlatList
          data={bookings}
          renderItem={renderBooking}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fa',
    // paddingHorizontal: 16,
    // paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    paddingHorizontal: 16,

  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  status: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: 'bold',
  },
  confirmed: {
    color: 'green',
  },
  pending: {
    color: '#ff8c00',
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookedServices;
