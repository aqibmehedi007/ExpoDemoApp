import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
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

interface FormData {
  name: string;
  status: string;
  species: string;
}

export default function FormScreen() {
  const navigation = useNavigation();
  const { addItem } = useStore();
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const buttonScale = useSharedValue(1);
  
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handleButtonPressIn = () => {
    buttonScale.value = withSpring(0.95);
  };

  const handleButtonPressOut = () => {
    buttonScale.value = withSpring(1);
  };

  const onSubmit = async (data: FormData) => {
    addItem(data);
    reset();
    
    // Send notification when item is added
    await NotificationService.sendItemAddedNotification(data.name);
    
    Alert.alert('Success', 'Item added successfully!', [
      { text: 'OK', onPress: () => (navigation as any).goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInDown.delay(100).springify()}>
        <Controller
          control={control}
          rules={{ required: 'Name is required' }}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              placeholderTextColor="#666"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(200).springify()}>
        <Controller
          control={control}
          rules={{ required: 'Status is required' }}
          name="status"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter status"
              placeholderTextColor="#666"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.status && <Text style={styles.error}>{errors.status.message}</Text>}
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).springify()}>
        <Controller
          control={control}
          rules={{ required: 'Species is required' }}
          name="species"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter species"
              placeholderTextColor="#666"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.species && <Text style={styles.error}>{errors.species.message}</Text>}
      </Animated.View>

      <Animated.View 
        entering={FadeInUp.delay(400).springify()}
        style={buttonAnimatedStyle}
      >
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSubmit(onSubmit)}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
        >
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 16,
  },
  input: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    fontSize: 16,
  },
  error: {
    color: '#ff6b6b',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 