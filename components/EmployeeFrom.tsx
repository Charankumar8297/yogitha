import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function EmployeeForm({ navigation }) {
  const [data, setData] = useState({
    empid: '',
    name: '',
    dept: '',
    phone: '',
    address: '',
    training: []
  });

  const [trainingText, setTrainingText] = useState('');

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const addTraining = () => {
    if (trainingText.trim() !== '') {
      setData(prev => ({ ...prev, training: [...prev.training, trainingText.trim()] }));
      setTrainingText('');
    }
  };

  const removeTraining = (indexToRemove) => {
    setData(prev => ({
      ...prev,
      training: prev.training.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = () => {
    navigation.navigate('EmployeeDetailsScreen', { data });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Employee Form</Text>

      <TextInput
        style={styles.input}
        placeholder="Employee ID"
        value={data.empid}
        onChangeText={text => handleChange('empid', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={data.name}
        onChangeText={text => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Department"
        value={data.dept}
        onChangeText={text => handleChange('dept', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={data.phone}
        onChangeText={text => handleChange('phone', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={data.address}
        onChangeText={text => handleChange('address', text)}
      />

      {/* Training input and add button */}
      <View style={styles.trainingInputRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Add Training"
          value={trainingText}
          onChangeText={setTrainingText}
        />
        <Button title="Add" onPress={addTraining} />
      </View>

      {/* Show training list */}
      {data.training.map((item, index) => (
        <View key={index} style={styles.trainingItem}>
          <Text style={styles.trainingText}>{index + 1}. {item}</Text>
          <TouchableOpacity onPress={() => removeTraining(index)}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8
  },
  trainingInputRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  trainingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eef',
    padding: 10,
    borderRadius: 8,
    marginTop: 6
  },
  trainingText: {
    fontSize: 16
  },
  removeText: {
    color: 'red',
    fontWeight: '600'
  }
});
