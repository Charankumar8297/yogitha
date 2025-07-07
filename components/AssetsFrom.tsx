// // import React, { useState } from 'react';
// // import { Alert, Button, ScrollView, StyleSheet, TextInput } from 'react-native';

// // export default function AssetFormScreen({ navigation }) {
// //   const [form, setForm] = useState({
// //     assetid: '',
// //     name: '',
// //     category: '',
// //     purchaseDate: ''
// //   });

// //   const handleChange = (field, value) => {
// //     setForm(prev => ({ ...prev, [field]: value }));
// //   };

// //   const handleSubmit = () => {
// //     const { assetid, name, category, purchaseDate } = form;

// //     if (!assetid || !name || !category || !purchaseDate) {
// //       Alert.alert('Validation', 'Please fill all fields');
// //       return;
// //     }

// //     const assetData = { assetid, name, category, purchaseDate };

// //     fetch('http://192.168.97.113:5000/assets', {  
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json'
// //       },
// //       body: JSON.stringify(assetData)
// //     })
// //       .then(res => {
// //         if (!res.ok) {
// //           return res.json().then(err => {
// //             throw new Error(err.error || 'Failed to save asset');
// //           });
// //         }
// //         return res.json();
// //       })
// //       .then(data => {
// //         Alert.alert('Success', `Asset ${data.data.assetid} created successfully`);

// //         // Navigate to details screen with full asset data and generated link
// //         navigation.navigate('AssetDetails', {
// //           data: data.data,
// //           link: data.link
// //         });
// //       })
// //       .catch(err => {
// //         Alert.alert('Error', err.message);
// //       });
// //   };

// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Asset ID"
// //         value={form.assetid}
// //         onChangeText={text => handleChange('assetid', text)}
// //       />
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Asset Name"
// //         value={form.name}
// //         onChangeText={text => handleChange('name', text)}
// //       />
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Category"
// //         value={form.category}
// //         onChangeText={text => handleChange('category', text)}
// //       />
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Purchase Date (YYYY-MM-DD)"
// //         value={form.purchaseDate}
// //         onChangeText={text => handleChange('purchaseDate', text)}
// //       />
// //       <Button title="Submit" onPress={handleSubmit} />
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 20
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     padding: 10,
// //     borderRadius: 8,
// //     marginBottom: 12
// //   }
// // });

















// import React, { useState } from 'react';
// import {
//   Alert,
//   Button,
//   ScrollView,
//   StyleSheet,
//   TextInput,
//   View,
//   Image,
//   Text,
//   TouchableOpacity
// } from 'react-native';
// import * as DocumentPicker from 'expo-document-picker';
// import * as ImagePicker from 'expo-image-picker';

// export default function AssetFormScreen({ navigation }) {
//   const [form, setForm] = useState({
//     assetid: '',
//     name: '',
//     category: '',
//     purchaseDate: ''
//   });
//   const [pic, setPic] = useState(null);
//   const [docs, setDocs] = useState([]);

//   const handleChange = (field, value) => {
//     setForm(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSelectImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1
//     });

//     if (!result.canceled && result.assets && result.assets.length > 0) {
//       const selected = result.assets[0];
//       setPic({
//         uri: selected.uri,
//         name: selected.fileName || `pic.${selected.uri.split('.').pop()}`,
//         type: selected.type || 'image/jpeg'
//       });
//     }
//   };

//   const handleSelectDocs = async () => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
//       multiple: true
//     });

//     if (result.canceled) return;

//     const files = Array.isArray(result.assets) ? result.assets : [result];

//     const validFiles = files.filter(f => f.uri);
//     if (validFiles.length === 0) {
//       Alert.alert('Validation', 'Please select at least one valid document');
//       return;
//     }

//     setDocs(validFiles.map(f => ({
//       uri: f.uri,
//       name: f.name,
//       mimeType: f.mimeType
//     })));
//   };

//   const handleSubmit = async () => {
//     const { assetid, name, category, purchaseDate } = form;

//     if (!assetid || !name || !category || !purchaseDate) {
//       Alert.alert('Validation', 'Please fill all fields');
//       return;
//     }

//     if (!pic) {
//       Alert.alert('Validation', 'Please select an image');
//       return;
//     }

//     if (docs.length === 0) {
//       Alert.alert('Validation', 'Please select at least one document');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('assetid', assetid);
//     formData.append('name', name);
//     formData.append('category', category);
//     formData.append('purchaseDate', purchaseDate);

//     formData.append('pic', {
//       uri: pic.uri,
//       name: pic.name,
//       type: pic.type
//     });

//     docs.forEach(doc => {
//       formData.append('docs', {
//         uri: doc.uri,
//         name: doc.name,
//         type: doc.mimeType
//       });
//     });

//     try {
//       const res = await fetch('http://192.168.97.113:5000/assets', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//         body: formData
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.error || 'Unable to submit asset');
//       }

//       const data = await res.json();
//       Alert.alert('Success', `Asset ${data.data.assetid} submitted successfully`);

//       navigation.navigate('AssetDetails', {
//         data: data.data,
//         link: data.link
//       });

//     } catch (err) {
//       Alert.alert('Submission Failed', err.message || 'Unable to submit asset');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Asset ID"
//         value={form.assetid}
//         onChangeText={text => handleChange('assetid', text)}
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

//       <Button title="Select Image" onPress={handleSelectImage} />
//       {pic && (
//         <Image
//           source={{ uri: pic.uri }}
//           style={{ width: 100, height: 100, marginVertical: 10, borderRadius: 8 }}
//         />
//       )}

//       <Button title="Select Documents (PDF/DOC/DOCX)" onPress={handleSelectDocs} />
//       {docs.length > 0 && (
//         <View style={{ marginTop: 10 }}>
//           {docs.map((doc, index) => (
//             <Text key={index} style={styles.docText}>{doc.name}</Text>
//           ))}
//         </View>
//       )}

//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <Text style={styles.submitText}>Submit</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 12
//   },
//   docText: {
//     fontSize: 14,
//     marginTop: 4,
//     color: '#555'
//   },
//   submitButton: {
//     backgroundColor: '#6200ee',
//     padding: 12,
//     borderRadius: 10,
//     marginTop: 20
//   },
//   submitText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: '700'
//   }
// });



















import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

export default function AssetFormScreen({ navigation }) {
  const [form, setForm] = useState({
    assetid: '',
    name: '',
    category: '',
    purchaseDate: ''
  });
  const [pic, setPic] = useState(null);
  const [docs, setDocs] = useState([]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });

    if (!result.canceled && result.assets.length > 0) {
      const selected = result.assets[0];
      setPic({
        uri: selected.uri,
        name: selected.fileName || `image.${selected.uri.split('.').pop()}`,
        type: selected.type || 'image/jpeg'
      });
    }
  };

  const handleSelectDocs = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',  // Accept all, backend can validate
      multiple: true
    });

    if (result.canceled) return;

    const files = Array.isArray(result.assets) ? result.assets : [result];

    setDocs(files.map(f => ({
      uri: f.uri,
      name: f.name,
      type: f.mimeType || 'application/octet-stream'
    })));
  };

  const handleSubmit = async () => {
    const { assetid, name, category, purchaseDate } = form;

    if (!assetid || !name || !category || !purchaseDate) {
      Alert.alert('Validation', 'Please fill all fields');
      return;
    }

    if (!pic) {
      Alert.alert('Validation', 'Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('assetid', assetid);
    formData.append('name', name);
    formData.append('category', category);
    formData.append('purchaseDate', purchaseDate);

    formData.append('pic', {
      uri: pic.uri,
      name: pic.name,
      type: pic.type
    });

    docs.forEach(doc => {
      formData.append('docs', {
        uri: doc.uri,
        name: doc.name,
        type: doc.type
      });
    });

    try {
      const res = await fetch('http://192.168.97.113:5000/assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Submission failed');
      }

      const data = await res.json();
      Alert.alert('Success', `Asset ${data.data.assetid} created successfully`);
      navigation.navigate('AssetDetails', { data: data.data });

    } catch (err) {
      Alert.alert('Error', err.message || 'Unable to submit');
    }
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

      <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      {pic && <Image source={{ uri: pic.uri }} style={styles.previewImage} />}

      <TouchableOpacity style={styles.button} onPress={handleSelectDocs}>
        <Text style={styles.buttonText}>Select Documents</Text>
      </TouchableOpacity>
      {docs.map((doc, i) => (
        <Text key={i} style={styles.docText}>{doc.name}</Text>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc',
    borderRadius: 8, padding: 10,
    marginBottom: 12
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10
  },
  buttonText: { color: '#fff', fontWeight: '700' },
  previewImage: {
    width: 100, height: 100,
    borderRadius: 8, marginVertical: 10
  },
  docText: { fontSize: 14, color: '#333' },
  submitButton: {
    backgroundColor: 'green',
    padding: 12, borderRadius: 10,
    marginTop: 20
  },
  submitText: { color: '#fff', fontWeight: '700', textAlign: 'center' }
});
