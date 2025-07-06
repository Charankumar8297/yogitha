import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import apiClient from '../utils/apiClient';

export default function EmployeeListScreen({ navigation }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    apiClient('emp/employees')
      .then(data => setEmployees(data))
      .catch(err => console.error(err));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('EmployeeDetails', { data: item })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.sub}>{item.empid} • {item.dept}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee List</Text>
      <FlatList
        data={employees}
        keyExtractor={item => item.empid}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  item: {
    padding: 16,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 10
  },
  name: { fontSize: 18, fontWeight: '600' },
  sub: { fontSize: 14, color: '#666' }
});
