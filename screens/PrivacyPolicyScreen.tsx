import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      
      <Text style={styles.section}>Information We Collect</Text>
      <Text style={styles.content}>
        This app collects basic information necessary for its functionality. 
        We do not collect personal information without your consent.
      </Text>

      <Text style={styles.section}>How We Use Information</Text>
      <Text style={styles.content}>
        The information collected is used solely for the app's core functionality 
        and to improve user experience.
      </Text>

      <Text style={styles.section}>Data Security</Text>
      <Text style={styles.content}>
        We implement appropriate security measures to protect your information 
        against unauthorized access, alteration, or destruction.
      </Text>

      <Text style={styles.section}>Third-Party Services</Text>
      <Text style={styles.content}>
        This app may use third-party services for analytics and functionality. 
        These services have their own privacy policies.
      </Text>

      <Text style={styles.section}>Contact Us</Text>
      <Text style={styles.content}>
        If you have questions about this privacy policy, please contact us 
        at privacy@example.com
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  content: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
}); 