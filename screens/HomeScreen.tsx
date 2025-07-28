import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../store/useStore';
import { NotificationService } from '../utils/notifications';
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

export default function HomeScreen() {
  const navigation = useNavigation();
  const { items, loading, error, fetchItems } = useStore();

  React.useEffect(() => {
    fetchItems();
  }, []);

  const renderItem = ({ item, index }: { item: Item; index: number }) => {
    return (
      <Animated.View
        entering={FadeInDown.delay(index * 100).springify()}
        style={styles.item}
      >
        <TouchableOpacity 
          onPress={() => (navigation as any).navigate('Details', { item })}
          style={styles.touchable}
          activeOpacity={0.7}
        >
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemStatus}>{item.status} - {item.species}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={fetchItems}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <Animated.View 
        entering={FadeInUp.delay(500).springify()}
        style={styles.buttonContainer}
      >
        <TouchableOpacity 
          style={styles.button}
          onPress={() => (navigation as any).navigate('Form')}
        >
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => (navigation as any).navigate('PrivacyPolicy')}
        >
          <Text style={styles.buttonText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.testButton]}
          onPress={() => NotificationService.sendTestNotification()}
        >
          <Text style={styles.buttonText}>Test Notification</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  list: {
    flex: 1,
  },
  item: {
    backgroundColor: '#2a2a2a',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  touchable: {
    padding: 16,
  },
  itemName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemStatus: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
  buttonContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  testButton: {
    backgroundColor: '#ff6b6b',
  },
}); 