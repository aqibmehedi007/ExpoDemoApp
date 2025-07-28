import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

interface Item {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export default function DetailsScreen() {
  const route = useRoute();
  const { item } = route.params as { item: Item };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.status}>Status: {item.status}</Text>
        <Text style={styles.species}>Species: {item.species}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  details: {
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  status: {
    color: '#ccc',
    fontSize: 18,
    marginBottom: 5,
  },
  species: {
    color: '#ccc',
    fontSize: 18,
  },
}); 