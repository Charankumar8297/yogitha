// import * as ImagePicker from 'expo-image-picker';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity
// } from 'react-native';

// // Types for navigation and route
// interface AssetFormProps {
//   navigation: any; // You can replace 'any' with your navigation type
//   route: {
//     params?: {
//       isEdit?: boolean;
//       data?: AssetData;
//     };
//   };
// }

// interface AssetData {
//   assetid: string;
//   name: string;
//   category: string;
//   purchaseDate: string;
//   place?: string;
//   pic?: string;
// }

// interface AssetFormState {
//   assetid: string;
//   name: string;
//   category: string;
//   purchaseDate: string;
//   place: string;
// }

// interface PickedFile {
//   uri: string;
//   name: string;
//   type: string;
// }

// export default function AssetFormScreen({ navigation, route }: AssetFormProps) {
//   const isEdit = route?.params?.isEdit || false;
//   const existingAsset = route?.params?.data || null;

//   const [form, setForm] = useState<AssetFormState>({
//     assetid: '',
//     name: '',
//     category: '',
//     purchaseDate: '',
//     place: ''
//   });

//   const [pic, setPic] = useState<PickedFile | null>(null);

//   const BASE_URL = 'http://192.168.1.32:3000';

//   useEffect(() => {
//     if (isEdit && existingAsset) {
//       setForm({
//         assetid: existingAsset.assetid,
//         name: existingAsset.name,
//         category: existingAsset.category,
//         purchaseDate: existingAsset.purchaseDate,
//         place: existingAsset.place || ''
//       });

//       if (existingAsset.pic) {
//         setPic({
//           uri: `${BASE_URL}${existingAsset.pic}`,
//           name: existingAsset.pic.split('/').pop() || 'image.jpg',
//           type: 'image/jpeg'
//         });
//       }
//     }
//   }, []);

//   const handleChange = (field: keyof AssetFormState, value: string) => {
//     setForm(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSelectImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: 'images',
//       quality: 1
//     });

//     if (!result.canceled && result.assets?.length > 0) {
//       const selected = result.assets[0];
//       setPic({
//         uri: selected.uri,
//         name: selected.fileName || `image.${selected.uri.split('.').pop()}`,
//         type: selected.type || 'image/jpeg'
//       });
//     }
//   };

//   const handleSubmit = async () => {
//     const { assetid, name, category, purchaseDate, place } = form;

//     if (!assetid || !name || !category || !purchaseDate) {
//       Alert.alert('Validation', 'Please fill all required fields');
//       return;
//     }

//     if (!pic || !pic.uri) {
//       Alert.alert('Validation', 'Please select an image for the asset.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('assetid', assetid);
//     formData.append('name', name);
//     formData.append('category', category);
//     formData.append('purchaseDate', purchaseDate);
//     formData.append('place', place);
//     formData.append('pic', {
//       uri: pic.uri,
//       name: pic.name,
//       type: pic.type
//     } as any);

//     const url = `${BASE_URL}/assets/add`;

//     try {
//       const res = await fetch(url, {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Accept': 'application/json'
//         }
//       });
//       let json = null;
//       try {
//         json = await res.json();
//       } catch (e) {
//         throw new Error('Invalid server response.');
//       }
//       if (!res.ok) throw new Error(json.error || 'Submission failed');
//       Alert.alert('Success', 'Asset created successfully');
//       navigation.navigate('AssetsDetailsScreen', { data: json.data });
//     } catch (err: any) {
//       if (err.message && err.message.includes('Network request failed')) {
//         Alert.alert('Network Error', 'Could not connect to the server. Please check your network and backend server.');
//       } else {
//         Alert.alert('Error', err.message || 'Unknown error occurred');
//       }
//       console.error('Submit Error:', err);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Asset ID"
//         value={form.assetid}
//         onChangeText={text => handleChange('assetid', text)}
//         editable={!isEdit}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Asset Name"
//         value={form.name}
//         onChangeText={text => handleChange('name', text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Category"
//         value={form.category}
//         onChangeText={text => handleChange('category', text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Purchase Date (YYYY-MM-DD)"
//         value={form.purchaseDate}
//         onChangeText={text => handleChange('purchaseDate', text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Place (optional)"
//         value={form.place}
//         onChangeText={text => handleChange('place', text)}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
//         <Text style={styles.buttonText}>Select Image</Text>
//       </TouchableOpacity>
//       {pic && <Image source={{ uri: pic.uri }} style={styles.previewImage} />}

//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <Text style={styles.submitText}>{isEdit ? 'Update' : 'Submit'}</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   input: {
//     borderWidth: 1, borderColor: '#ccc',
//     borderRadius: 8, padding: 10,
//     marginBottom: 12
//   },
//   button: {
//     backgroundColor: '#6200ee',
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginVertical: 10
//   },
//   buttonText: { color: '#fff', fontWeight: '700' },
//   previewImage: {
//     width: 100, height: 100,
//     borderRadius: 8, marginVertical: 10
//   },
//   submitButton: {
//     backgroundColor: 'green',
//     padding: 12, borderRadius: 10,
//     marginTop: 20
//   },
//   submitText: { color: '#fff', fontWeight: '700', textAlign: 'center' }
// });


import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default function AssetFormScreen({ navigation }) {
  const [form, setForm] = useState({
    assetid: '',
    name: '',
    category: '',
    purchaseDate: '',
    place: ''
  });

  const [pic, setPic] = useState(null);
  const BASE_URL = 'http://192.168.1.32:3000';

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission required', 'We need camera roll access to select images');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ fix here
        allowsEditing: true,
        quality: 1
      });
      

      if (!result.canceled && result.assets.length > 0) {
        const selected = result.assets[0];
        const fileName = selected.fileName || selected.uri.split('/').pop();
        const match = /\.(\w+)$/.exec(fileName);
        const type = match ? `image/${match[1]}` : 'image/jpeg';

        setPic({
          uri: selected.uri,
          name: fileName,
          type
        });
      }
    } catch (error) {
      console.error('Image pick error:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleSubmit = async () => {
    const { assetid, name, category, purchaseDate, place } = form;

    if (!assetid || !name || !category || !purchaseDate) {
      Alert.alert('Validation', 'Please fill all required fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('assetid', assetid);
      formData.append('name', name);
      formData.append('category', category);
      formData.append('purchaseDate', purchaseDate);
      formData.append('place', place);

      if (pic?.uri) {
        formData.append('photo', {
          uri: pic.uri,
          name: pic.name,
          type: pic.type
        });
      }

      const response = await fetch(`${BASE_URL}/assets/add`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      const text = await response.text();
      const resJson = text.startsWith('{') ? JSON.parse(text) : { error: text };

      if (response.ok) {
        Alert.alert('Success', 'Asset created successfully');
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Error', resJson.error || 'Failed to create asset');
      }
    } catch (error) {
      console.error('Submit Error:', error);
      Alert.alert('Error', error.message || 'Network request failed');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Asset Form</Text>

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
      <TextInput
        style={styles.input}
        placeholder="Place"
        value={form.place}
        onChangeText={text => handleChange('place', text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
        <Text style={styles.buttonText}>Pick Photo</Text>
      </TouchableOpacity>

      {pic && (
        <Image
          source={{ uri: pic.uri }}
          style={{ width: 100, height: 100, borderRadius: 8, marginTop: 10 }}
        />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 14
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center'
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
