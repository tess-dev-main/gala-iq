import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FrontPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Gala IQ</Text>
      </View>
      <View style={styles.subheader}>
        <Text style={styles.subheaderText}>Elevated Event Management</Text>
      </View>
      <Link
        style={styles.button}
        href="/(tabs)/agents">
        <Text style={styles.buttonText}>Manage Your Agents</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  subheader: {
    marginBottom: 40,
  },
  subheaderText: {
    fontSize: 18,
    color: '#666666',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default FrontPage;
