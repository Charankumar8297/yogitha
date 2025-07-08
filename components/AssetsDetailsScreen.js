// // import React, { useEffect, useState } from 'react';
// // import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
// // import QRCode from 'react-native-qrcode-svg';

// // export default function AssetDetailsScreen({ route }) {
// //   const { data, link } = route.params;
// //   const [asset, setAsset] = useState(data);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     if (!data && link) {
// //       // Parse link → fetch asset details
// //       const urlParams = new URLSearchParams(link.replace('asset://', '').replaceAll('&', '&'));
// //       const assetid = urlParams.get('assetid');
// //       if (assetid) fetchAsset(assetid);
// //     }
// //   }, [link]);

// //   const fetchAsset = async (assetid) => {
// //     try {
// //       setLoading(true);
// //       const res = await fetch(`http://192.168.97.113:5000/assets/${assetid}`);
// //       if (!res.ok) throw new Error('Asset not found');
// //       const json = await res.json();
// //       setAsset(json);
// //     } catch (err) {
// //       alert(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading || !asset) {
// //     return (
// //       <View style={styles.container}>
// //         <ActivityIndicator size="large" color="#6200ee" />
// //       </View>
// //     );
// //   }

// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
// //       <View style={styles.topContainer}>
// //         {asset.pic ? (
// //           // <Image source={{ uri: `http://192.168.97.113:5000${asset.pic.replace(/\\/g, '/')}` }} style={styles.bigPic} />
// //           // `http://192.168.97.113:5000http://192.168.97.113:5000/uploads/xxx.png`

// //           <Image
// //           source={{ uri: `http://192.168.97.113:5000${asset.pic.replace(/\\/g, '/')}` }}
// //           style={{ width: 150, height: 150, borderRadius: 10, marginBottom: 10 }}
// //         />

// //         ) : (
// //           <View style={[styles.bigPic, { backgroundColor: '#ccc' }]} />
// //         )}
// //         <View style={styles.detailsContainer}>
// //           <Text style={styles.text}>Asset ID: {asset.assetid}</Text>
// //           <Text style={styles.text}>Name: {asset.name}</Text>
// //           <Text style={styles.text}>Category: {asset.category}</Text>
// //           <Text style={styles.text}>Purchase Date: {asset.purchaseDate}</Text>
// //         </View>
// //       </View>

// //       <Text style={styles.sectionTitle}>Asset Documents</Text>
// //       {asset.docs && asset.docs.length > 0 ? (
// //         <View style={styles.docGrid}>
// //           {asset.docs.map((doc, index) => (
// //             <TouchableOpacity
// //               key={index}
// //               style={styles.docBoxGrid}
// //               onPress={() => Linking.openURL(`http://192.168.97.113:5000${doc.replace(/\\/g, '/')}`)}
// //             >
// //               <Text style={styles.docTextGrid}>{doc.split('/').pop()}</Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>
// //       ) : (
// //         <Text style={styles.noDocs}>No documents available</Text>
// //       )}

// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 20
// //   },
// //   topContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 20
// //   },
// //   bigPic: {
// //     width: 100,
// //     height: 100,
// //     borderRadius: 50,
// //     marginRight: 16,
// //     backgroundColor: '#ccc'
// //   },
// //   detailsContainer: {
// //     flex: 1
// //   },
// //   text: {
// //     fontSize: 16,
// //     marginBottom: 6,
// //     color: '#222'
// //   },
// //   sectionTitle: {
// //     fontSize: 18,
// //     fontWeight: '700',
// //     color: '#1a73e8',
// //     marginBottom: 10
// //   },
// //   docGrid: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     justifyContent: 'flex-start'
// //   },
// //   docBoxGrid: {
// //     width: '45%',
// //     backgroundColor: '#f0f4ff',
// //     borderRadius: 8,
// //     padding: 10,
// //     margin: 5,
// //     elevation: 2,
// //     shadowColor: '#aaa',
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     shadowOffset: { width: 0, height: 2 },
// //     alignItems: 'center'
// //   },
// //   docTextGrid: {
// //     fontSize: 14,
// //     color: '#333',
// //     textAlign: 'center'
// //   },
// //   noDocs: {
// //     fontSize: 16,
// //     color: '#999',
// //     marginBottom: 10
// //   },
// //   qrContainer: {
// //     alignSelf: 'center',
// //     marginTop: 10,
// //     padding: 20,
// //     backgroundColor: '#fff',
// //     borderRadius: 10,
// //     elevation: 3
// //   }
// // });























// import React from 'react';
// import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';

// export default function AssetDetailsScreen({ route }) {
//   const { data } = route.params;
//   const asset = data;

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.topContainer}>
//         {asset.pic ? (
//           <Image
//             source={{ uri: asset.pic }}
//             style={{ width: 150, height: 150, borderRadius: 10, marginBottom: 10 }}
//           />
//         ) : (
//           <View style={[styles.bigPic, { backgroundColor: '#ccc' }]} />
//         )}
//         <View style={styles.detailsContainer}>
//           <Text style={styles.text}>Asset ID: {asset.assetid}</Text>
//           <Text style={styles.text}>Name: {asset.name}</Text>
//           <Text style={styles.text}>Category: {asset.category}</Text>
//           <Text style={styles.text}>Purchase Date: {asset.purchaseDate}</Text>
//         </View>
//       </View>

//       <Text style={styles.sectionTitle}>Asset Documents</Text>
//       {asset.docs && asset.docs.length > 0 ? (
//         <View style={styles.docGrid}>
//           {asset.docs.map((doc, index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.docBoxGrid}
//               onPress={() => Linking.openURL(doc)}
//             >
//               <Text style={styles.docTextGrid}>{doc.split('/').pop()}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       ) : (
//         <Text style={styles.noDocs}>No documents available</Text>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   topContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20
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
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1a73e8',
//     marginBottom: 10
//   },
//   docGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'flex-start'
//   },
//   docBoxGrid: {
//     width: '45%',
//     backgroundColor: '#f0f4ff',
//     borderRadius: 8,
//     padding: 10,
//     margin: 5,
//     elevation: 2,
//     alignItems: 'center'
//   },
//   docTextGrid: {
//     fontSize: 14,
//     color: '#333',
//     textAlign: 'center'
//   },
//   noDocs: {
//     fontSize: 16,
//     color: '#999',
//     marginBottom: 10
//   }
// });


















import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

    const SERVER = 'http://192.168.1.32:3000';

export default function AssetDetailsScreen({ route }) {
  const { data, link } = route.params;
  const [asset, setAsset] = useState(data);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!data && link) {
      const urlParams = new URLSearchParams(link.replace('asset://', ''));
      const assetid = urlParams.get('assetid');
      if (assetid) {
        fetchAsset(assetid);
      }
    }
  }, [link]);

  const fetchAsset = async (assetid) => {
    try {
      setLoading(true);
      const res = await fetch(`${SERVER}/assets/${assetid}`);
      if (!res.ok) throw new Error('Asset not found');
      const json = await res.json();
      setAsset(json);
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const cleanUrl = (pathOrUrl) => {
    if (pathOrUrl.startsWith('http')) return pathOrUrl;
    return `${SERVER}${pathOrUrl.replace(/\\/g, '/')}`;
  };

  const handleOpenDoc = async (docPath) => {
    try {
      const fileUrl = cleanUrl(docPath);
      const fileName = decodeURIComponent(docPath.split('/').pop());
      const fileUri = FileSystem.documentDirectory + fileName;

      const downloadResumable = FileSystem.createDownloadResumable(fileUrl, fileUri);
      await downloadResumable.downloadAsync();

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert('Error', 'Sharing not available on this device');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to open document');
    }
  };

  if (loading || !asset) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        {asset.pic ? (
          <Image
            source={{ uri: cleanUrl(asset.pic) }}
            style={styles.bigPic}
          />
        ) : (
          <View style={[styles.bigPic, { backgroundColor: '#ccc' }]} />
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.text}>Asset ID: {asset.assetid}</Text>
          <Text style={styles.text}>Name: {asset.name}</Text>
          <Text style={styles.text}>Category: {asset.category}</Text>
          <Text style={styles.text}>Purchase Date: {asset.purchaseDate}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Asset Documents</Text>
      {asset.docs && asset.docs.length > 0 ? (
        <View style={styles.docGrid}>
          {asset.docs.map((doc, index) => (
            <TouchableOpacity
              key={index}
              style={styles.docBoxGrid}
              onPress={() => handleOpenDoc(doc)}
            >
              <Text style={styles.docTextGrid}>
                {decodeURIComponent(doc.split('/').pop())}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.noDocs}>No documents available</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  topContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  bigPic: { width: 120, height: 120, borderRadius: 10, marginRight: 16 },
  detailsContainer: { flex: 1 },
  text: { fontSize: 16, marginBottom: 6, color: '#222' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1a73e8', marginBottom: 10 },
  docGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  docBoxGrid: {
    width: '45%',
    backgroundColor: '#f0f4ff',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    alignItems: 'center'
  },
  docTextGrid: { fontSize: 14, color: '#333', textAlign: 'center' },
  noDocs: { fontSize: 16, color: '#999', marginBottom: 10 }
});
