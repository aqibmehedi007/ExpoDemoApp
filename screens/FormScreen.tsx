import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

interface FormData {
  name: string;
  status: string;
  species: string;
}

export default function FormScreen() {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    Alert.alert('Success', 'Item added successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
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

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
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