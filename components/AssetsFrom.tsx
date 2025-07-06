import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button, ScrollView } from 'react-native';

export default function AssetFormScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    id: '',
    category: '',
    purchaseDate: ''
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // const documents = [
    //   { id: '1', title: 'Invoice', image: require('./assets/images/document.png') },
    //   { id: '2', title: 'Warranty', image: require('./assets/images/document.png') }
    // ];

    navigation.navigate('AssetDetailsScreen', {
      data: {
        ...form,
        documents
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Asset Name"
        value={form.name}
        onChangeText={text => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Asset ID"
        value={form.id}
        onChangeText={text => handleChange('id', text)}
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
    padding: 20,
    gap: 12
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8
  }
});
