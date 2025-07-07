// // EmployeeForm.js
// import React, { useState } from 'react';
// import {
//   Alert,
//   Button, ScrollView, StyleSheet,
//   Text, TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import apiClient from '../utils/apiClient'; // Adjust path as needed

// export default function EmployeeForm({ navigation }) {
//   const [data, setData] = useState({
//     empid: '',
//     name: '',
//     dept: '',
//     phone: '',
//     address: '',
//     training: []
//   });

//   const [trainingText, setTrainingText] = useState('');

//   const handleChange = (field, value) => {
//     setData(prev => ({ ...prev, [field]: value }));
//   };

//   const addTraining = () => {
//     if (trainingText.trim() !== '') {
//       setData(prev => ({
//         ...prev,
//         training: [...prev.training, trainingText.trim()]
//       }));
//       setTrainingText('');
//     }
//   };

//   const removeTraining = (indexToRemove) => {
//     setData(prev => ({
//       ...prev,
//       training: prev.training.filter((_, index) => index !== indexToRemove)
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await apiClient('emp/employee', {
//         method: 'POST',
//         body: JSON.stringify(data)
//       });
  
//       Alert.alert('Success', 'Employee Created');
//       navigation.navigate('EmployeeDetailsScreen', { data: response.data });
//     } catch (error) {
//       console.error('Submission failed:', error);
//       Alert.alert('Error', error.message || 'Failed to create employee');
//     }
//   };
  

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.heading}>Employee Form</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Employee ID"
//         value={data.empid}
//         onChangeText={text => handleChange('empid', text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={data.name}
//         onChangeText={text => handleChange('name', text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Department"
//         value={data.dept}
//         onChangeText={text => handleChange('dept', text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Phone"
//         keyboardType="phone-pad"
//         value={data.phone}
//         onChangeText={text => handleChange('phone', text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Address"
//         value={data.address}
//         onChangeText={text => handleChange('address', text)}
//       />

//       <View style={styles.trainingInputRow}>
//         <TextInput
//           style={[styles.input, { flex: 1 }]}
//           placeholder="Add Training"
//           value={trainingText}
//           onChangeText={setTrainingText}
//         />
//         <Button title="Add" onPress={addTraining} />
//       </View>

//       {data.training.map((item, index) => (
//         <View key={index} style={styles.trainingItem}>
//           <Text style={styles.trainingText}>{index + 1}. {item}</Text>
//           <TouchableOpacity onPress={() => removeTraining(index)}>
//             <Text style={styles.removeText}>Remove</Text>
//           </TouchableOpacity>
//         </View>
//       ))}

//       <Button title="Submit" onPress={handleSubmit} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     gap: 12
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 16
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 8
//   },
//   trainingInputRow: {
//     flexDirection: 'row',
//     gap: 10,
//     alignItems: 'center'
//   },
//   trainingItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#eef',
//     padding: 10,
//     borderRadius: 8,
//     marginTop: 6
//   },
//   trainingText: {
//     fontSize: 16
//   },
//   removeText: {
//     color: 'red',
//     fontWeight: '600'
//   }
// });












import React, { useState } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function EmployeeForm({ navigation }) {
  const [data, setData] = useState({
    empid: '',
    name: '',
    dept: '',
    phone: '',
    address: '',
    training: [],
    photo: null
  });

  const [trainingText, setTrainingText] = useState('');

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const addTraining = () => {
    if (trainingText.trim() !== '') {
      setData(prev => ({
        ...prev,
        training: [...prev.training, trainingText.trim()]
      }));
      setTrainingText('');
    }
  };

  const removeTraining = (indexToRemove) => {
    setData(prev => ({
      ...prev,
      training: prev.training.filter((_, index) => index !== indexToRemove)
    }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    });

    if (!result.cancelled) {
      const localUri = result.assets[0].uri;
      const fileName = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(fileName);
      const type = match ? `image/${match[1]}` : 'image';

      setData(prev => ({
        ...prev,
        photo: {
          uri: localUri,
          name: fileName,
          type
        }
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (!data.photo) {
        Alert.alert('Error', 'Please select a photo');
        return;
      }

      const formData = new FormData();

      formData.append('empid', data.empid);
      formData.append('name', data.name);
      formData.append('dept', data.dept);
      formData.append('phone', data.phone);
      formData.append('address', data.address);
      formData.append('training', JSON.stringify(data.training));
      formData.append('photo', {
        uri: data.photo.uri,
        name: data.photo.name,
        type: data.photo.type
      });

      const response = await fetch('http://192.168.97.113:5000/emp/employee', {
        method: 'POST',
        body: formData
        // Don't set Content-Type, fetch will handle it
      });

      const resJson = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Employee created');
        navigation.navigate('EmployeeDetailsScreen', { empid: resJson.data.empid });
      } else {
        Alert.alert('Error', resJson.error || 'Failed to create employee');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      Alert.alert('Error', error.message || 'Failed to create employee');
    }
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

      <View style={styles.trainingInputRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Add Training"
          value={trainingText}
          onChangeText={setTrainingText}
        />
        <Button title="Add" onPress={addTraining} />
      </View>

      {data.training.map((item, index) => (
        <View key={index} style={styles.trainingItem}>
          <Text style={styles.trainingText}>{index + 1}. {item}</Text>
          <TouchableOpacity onPress={() => removeTraining(index)}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Button title="Pick Photo" onPress={pickImage} />

      {data.photo && (
        <Image
          source={{ uri: data.photo.uri }}
          style={{ width: 100, height: 100, marginTop: 10, borderRadius: 8 }}
        />
      )}

      <Button title="Submit" onPress={handleSubmit} style={{ marginTop: 20 }} />
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
