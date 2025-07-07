// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

// export default function EmployeeDetailsScreen({ route }) {
//   const { empid } = route.params;
//   const [employee, setEmployee] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`http://192.168.97.113:5000/emp/employee/${empid}`)

//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch employee data');
//         return res.json();
//       })
//       .then(data => setEmployee(data))
//       .catch(err => alert(err.message))
//       .finally(() => setLoading(false));
//   }, [empid]);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#6200ee" />
//       </View>
//     );
//   }

//   if (!employee) {
//     return (
//       <View style={styles.container}>
//         <Text style={{ color: '#f00' }}>Employee not found.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.topContainer}>
//         {employee.profilePicUrl ? (
//           <Image source={{ uri: employee.profilePicUrl }} style={styles.bigPic} />
//         ) : (
//           <View style={[styles.bigPic, { backgroundColor: '#ccc' }]} />
//         )}
//         <View style={styles.detailsContainer}>
//           <Text style={styles.text}>Employee ID: {employee.empid}</Text>
//           <Text style={styles.text}>Name: {employee.name}</Text>
//           <Text style={styles.text}>Department: {employee.dept}</Text>
//           <Text style={styles.text}>Phone: {employee.phone}</Text>
//           <Text style={styles.text}>Address: {employee.address}</Text>
//         </View>
//       </View>

//       <View style={styles.bottomContainer}>
//         <Text style={styles.trainingHeader}>Training Details</Text>
//         <FlatList
//           data={employee.training || []}
//           keyExtractor={(_, index) => index.toString()}
//           renderItem={({ item, index }) => (
//             <View style={styles.trainingBox}>
//               <Text style={styles.trainingText}>{index + 1}. {item}</Text>
//             </View>
//           )}
//           ListEmptyComponent={
//             <Text style={styles.trainingText}>No training data available</Text>
//           }
//         />
//       </View>
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },

//   topContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10
//   },
//   bigPic: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginRight: 16,
//     backgroundColor: '#ccc'
//   },
//   detailsContainer: { flex: 1 },
//   text: {
//     fontSize: 16,
//     marginBottom: 6,
//     color: '#222'
//   },

//   bottomContainer: {
//     flex: 1
//   },
//   trainingHeader: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1a73e8',
//     marginBottom: 10
//   },
//   trainingBox: {
//     backgroundColor: '#f0f4ff',
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 8,
//     elevation: 2,
//     shadowColor: '#aaa',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 }
//   },
//   trainingText: {
//     fontSize: 16,
//     color: '#333'
//   }
// });
























import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

const SERVER = 'http://192.168.97.113:5000';

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
      .then(data => setEmployee(data))
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
        <FlatList
          data={employee.training || []}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.trainingBox}>
              <Text style={styles.trainingText}>{index + 1}. {item}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.trainingText}>No training data available</Text>
          }
        />
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
  }
});
