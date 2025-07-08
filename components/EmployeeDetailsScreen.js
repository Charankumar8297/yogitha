import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

const SERVER = 'http://192.168.1.32:3000';

export default function EmployeeDetailsScreen({ route }) {
  const { empid } = route.params;
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${SERVER}/emp/employee/${empid}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch employee data');
        return res.json();
      })
      .then(data => {
        setEmployee(data);
        let trainingArr = data.training;
        if (
          trainingArr &&
          trainingArr.length === 1 &&
          typeof trainingArr[0] === 'string' &&
          trainingArr[0].startsWith('[')
        ) {
          try {
            trainingArr = JSON.parse(trainingArr[0]);
          } catch (e) {
            // fallback: show as is
          }
        }
      })
      .catch(err => alert(err.message))
      .finally(() => setLoading(false));
  }, [empid]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (!employee) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#f00' }}>Employee not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {employee.photo ? (
          <Image
            source={{ uri: `${SERVER}/uploads/${employee.photo}` }}
            style={styles.bigPic}
          />
        ) : (
          <View style={[styles.bigPic, { backgroundColor: '#ccc' }]} />
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.text}>Employee ID: {employee.empid}</Text>
          <Text style={styles.text}>Name: {employee.name}</Text>
          <Text style={styles.text}>Department: {employee.dept}</Text>
          <Text style={styles.text}>Phone: {employee.phone}</Text>
          <Text style={styles.text}>Address: {employee.address}</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.trainingHeader}>Training Details</Text>
        <View>
          <Text style={styles.label}>Training:</Text>
          {employee.training && employee.training.length > 0 ? (
            employee.training.map((item, idx) => (
              <Text key={idx} style={styles.trainingItem}>
                {item}
              </Text>
            ))
          ) : (
            <Text style={styles.trainingItem}>None</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  bigPic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: '#ccc'
  },
  detailsContainer: { flex: 1 },
  text: {
    fontSize: 16,
    marginBottom: 6,
    color: '#222'
  },
  bottomContainer: { flex: 1 },
  trainingHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a73e8',
    marginBottom: 10
  },
  trainingBox: {
    backgroundColor: '#f0f4ff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#aaa',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }
  },
  trainingText: {
    fontSize: 16,
    color: '#333'
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6
  },
  trainingItem: {
    marginLeft: 10,
    fontSize: 15,
    color: '#333'
  }
});
