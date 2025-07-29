import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import FormScreen from '../screens/FormScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Add Item') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Privacy') {
            iconName = focused ? 'shield-checkmark' : 'shield-checkmark-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#2a2a2a',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'Characters',
          headerShown: false 
        }}
      />
      <Tab.Screen 
        name="Add Item" 
        component={FormScreen} 
        options={{ 
          title: 'Add Character',
          headerShown: false 
        }}
      />
      <Tab.Screen 
        name="Privacy" 
        component={PrivacyPolicyScreen} 
        options={{ 
          title: 'Privacy Policy',
          headerShown: false 
        }}
      />
    </Tab.Navigator>
  );
} 