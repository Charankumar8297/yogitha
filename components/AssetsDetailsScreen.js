import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions
} from 'react-native';
import { WebView } from 'react-native-webview';

const { height } = Dimensions.get('window');

export default function AssetDetailsScreen({ route }) {
  const { data } = route.params;
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);

  const documentImage = require('../assets/images/document.png');

  const docsData = (data.docs || []).map((title, index) => ({
    id: `${index}`,
    title,
    image: documentImage
  }));

  const renderDocItem = ({ item }) => (
    <TouchableOpacity
      style={styles.docBox}
      onPress={() => {
        setSelectedDoc(item);
        setShowImageModal(true);
      }}
    >
      <Text style={styles.docBoxText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {data.profilePic && (
          <Image source={data.profilePic} style={styles.bigPic} />
        )}
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.text}>Asset ID: {data.assetid}</Text>
          <Text style={styles.text}>Name: {data.name}</Text>
          <Text style={styles.text}>Category: {data.category}</Text>
          <Text style={styles.text}>Place: {data.place}</Text>
        </View>
      </View>

      <Text style={styles.title}>Asset Documents</Text>

      <FlatList
        data={docsData}
        renderItem={renderDocItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity
        style={styles.pdfButton}
        onPress={() => setShowPdfModal(true)}
      >
        <Text style={styles.pdfButtonText}>View Asset PDF</Text>
      </TouchableOpacity>

      {/* Image modal */}
      <Modal
        visible={showImageModal}
        animationType="slide"
        onRequestClose={() => setShowImageModal(false)}
      >
        <ScrollView contentContainerStyle={{ padding: 10 }}>
          {selectedDoc && (
            <Image
              source={selectedDoc.image}
              style={{ width: '100%', height: 500, resizeMode: 'contain' }}
            />
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowImageModal(false)}
          >
            <Text style={{ color: '#fff' }}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      {/* PDF modal */}
      <Modal
        visible={showPdfModal}
        animationType="slide"
        onRequestClose={() => setShowPdfModal(false)}
      >
        <View style={{ flex: 1 }}>
          <WebView
            source={{
              uri:
                data.pdfUrl ||
                'https://drive.google.com/file/d/1xksemA8KU4gSqWCUWL51iW3HfAfF-ihg/preview'
            }}
            style={{ flex: 1 }}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowPdfModal(false)}
          >
            <Text style={{ color: '#fff' }}>Close PDF</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  bigPic: { width: 100, height: 100, borderRadius: 50 },
  text: { fontSize: 16, marginBottom: 4 },
  title: { fontSize: 18, fontWeight: '700', marginVertical: 10 },
  docBox: {
    backgroundColor: '#03dac6',
    paddingVertical: 8,
    borderRadius: 8,
    margin: 4,
    width: '22%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  docBoxText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center'
  },
  pdfButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },
  pdfButtonText: { color: '#fff', fontWeight: '700' },
  closeButton: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 10,
    alignSelf: 'center'
  }
});
