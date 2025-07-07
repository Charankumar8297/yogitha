import React, { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, TextInput } from 'react-native';

export default function AssetFormScreen({ navigation }) {
  const [form, setForm] = useState({
    assetid: '',
    name: '',
    category: '',
    purchaseDate: ''
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const { assetid, name, category, purchaseDate } = form;

    if (!assetid || !name || !category || !purchaseDate) {
      Alert.alert('Validation', 'Please fill all fields');
      return;
    }

    const assetData = { assetid, name, category, purchaseDate };

    fetch('http://192.168.1.35:5000/assets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(assetData)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.error || 'Failed to save asset');
          });
        }
        return res.json();
      })
      .then(data => {
        Alert.alert('Success', `Asset ${data.data.assetid} created successfully`);

        // Navigate to details screen with full asset data and generated link
        navigation.navigate('AssetDetailsScreen', {
          data: data.data,
          link: data.link
        });
      })
      .catch(err => {
        Alert.alert('Error', err.message);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Asset ID"
        value={form.assetid}
        onChangeText={text => handleChange('assetid', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Asset Name"
        value={form.name}
        onChangeText={text => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={form.category}
        onChangeText={text => handleChange('category', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Purchase Date (YYYY-MM-DD)"
        value={form.purchaseDate}
        onChangeText={text => handleChange('purchaseDate', text)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12
  }
});
