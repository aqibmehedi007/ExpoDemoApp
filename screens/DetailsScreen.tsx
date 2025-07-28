import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated';

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

  const imageScale = useSharedValue(0.8);
  
  React.useEffect(() => {
    imageScale.value = withSpring(1, { damping: 15, stiffness: 100 });
  }, []);

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View 
        entering={FadeInDown.delay(200).springify()}
        style={[styles.imageContainer, imageAnimatedStyle]}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
      </Animated.View>
      
      <Animated.View 
        entering={FadeInUp.delay(400).springify()}
        style={styles.details}
      >
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.status}>Status: {item.status}</Text>
        <Text style={styles.species}>Species: {item.species}</Text>
      </Animated.View>
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
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
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