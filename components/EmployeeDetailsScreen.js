// // // // // import React from 'react';
// // // // // import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

// // // // // export default function EmployeeDetailsScreen({ route }) {
// // // // //   const { data } = route.params;

// // // // //   return (
// // // // //     <ScrollView contentContainerStyle={styles.container}>
// // // // //       {data.profilePic && (
// // // // //         <Image source={data.profilePic} style={styles.bigPic} />
// // // // //       )}

// // // // //       <Text style={styles.text}>Employee ID: {data.empid}</Text>
// // // // //       <Text style={styles.text}>Name: {data.name}</Text>
// // // // //       <Text style={styles.text}>Department: {data.dept}</Text>
// // // // //       <Text style={styles.text}>Phone: {data.phone}</Text>
// // // // //       <Text style={styles.text}>Address: {data.address}</Text>
// // // // //       <Text style={styles.extra}>Steel Training: Introduction Completed</Text>
// // // // //       <Text style={styles.extra}>Function: Pending</Text>
// // // // //     </ScrollView>
// // // // //   );
// // // // // }

// // // // // const styles = StyleSheet.create({
// // // // //   container: { padding: 20, alignItems: 'center' },
// // // // //   bigPic: { width: 150, height: 150, borderRadius: 75, marginBottom: 20 },
// // // // //   text: { fontSize: 18, marginBottom: 8 },
// // // // //   extra: { fontSize: 16, color: 'gray', marginTop: 4 }
// // // // // });


import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList } from 'react-native';

export default function EmployeeDetailsScreen({ route }) {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      {/* Top: Fixed employee details */}
      <View style={styles.topContainer}>
        {data.profilePic && (
          <Image source={data.profilePic} style={styles.bigPic} />
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.text}>Employee ID: {data.empid}</Text>
          <Text style={styles.text}>Name: {data.name}</Text>
          <Text style={styles.text}>Department: {data.dept}</Text>
          <Text style={styles.text}>Phone: {data.phone}</Text>
          <Text style={styles.text}>Address: {data.address}</Text>
        </View>
      </View>

      {/* Bottom: Scrollable training details */}
      <View style={styles.bottomContainer}>
        <Text style={styles.trainingHeader}>Training Details</Text>
        <FlatList
          data={data.training || []}
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

  bottomContainer: {
    flex: 1
  },
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
