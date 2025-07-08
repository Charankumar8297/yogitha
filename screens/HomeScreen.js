import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Scanner from '../components/Scanner';

const { height } = Dimensions.get('window');
const SERVER = 'http://192.168.1.32:3000';

export default function HomeScreen({ navigation }) {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [savedDetails, setSavedDetails] = useState([]);

  const parseParams = (query) => {
    const params = {};
    query.split('&').forEach(part => {
      const [key, value] = part.split('=');
      params[key] = decodeURIComponent(value || '');
    });
    return params;
  };

  const parseLink = (data) => {
    if (data.startsWith('emp://')) {
      const params = parseParams(data.replace('emp://', ''));
      return {
        type: 'employee',
        empid: params.empid || 'N/A',
        name: params.name || 'N/A',
        dept: params.dept || 'N/A',
        phone: params.phone || 'N/A',
        address: params.address || 'N/A',
        profilePic: params.photo
          ? { uri: `${SERVER}/uploads/${params.photo}` }
          : null,
        training: params.training
          ? params.training.split('-').map(t => t.trim()).filter(t => t !== '')
          : []
      };
    }
    if (data.startsWith('asset://')) {
      const params = parseParams(data.replace('asset://', ''));
      return {
        type: 'asset',
        assetid: params.assetid || '',
        name: params.name || '',
        category: params.category || '',
        purchaseDate: params.purchaseDate || '',
        pic: params.pic ? decodeURIComponent(params.pic) : null,
        docs: params.docs
          ? decodeURIComponent(params.docs).split(',').filter(Boolean)
          : []
      };
    }
    return null;
  };

  const handleScan = (rawData) => {
    const parsed = parseLink(rawData);
    console.log('Parsed Data:', parsed);

    if (parsed?.type) {
      setScannedData(parsed);
    } else {
      setScannedData(null);
    }
    setShowScanner(false);
  };

  const handleSave = () => {
    if (scannedData) {
      setSavedDetails([scannedData, ...savedDetails]);
      setScannedData(null);
    }
  };

  const renderDetails = (item) => {
    if (item.type === 'employee') {
      return (
        <>
          <Text style={styles.detailText}>👤 ID: {item.empid}</Text>
          <Text style={styles.detailText}>👨 Name: {item.name}</Text>
          <Text style={styles.detailText}>🏢 Dept: {item.dept}</Text>
          <Text style={styles.detailText}>📞 Phone: {item.phone}</Text>
          <Text style={styles.detailText}>🏠 Address: {item.address}</Text>
        </>
      );
    } else if (item.type === 'asset') {
      return (
        <>
          <Text style={styles.detailText}>🔧 Asset ID: {item.assetid}</Text>
          <Text style={styles.detailText}>📦 Name: {item.name}</Text>
          <Text style={styles.detailText}>📁 Category: {item.category}</Text>
          <Text style={styles.detailText}>📅 Purchase Date: {item.purchaseDate}</Text>
        </>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>QR Scanner</Text>

        <View style={styles.topButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setShowScanner(true)}
          >
            <Text style={styles.buttonText}>Scan QR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('EmployeeFrom')}
          >
            <Text style={styles.buttonText}>Employee Form</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('AssetsFrom')}
          >
            <Text style={styles.buttonText}>Assets Form</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showScanner && (
        <View style={styles.scannerContainer}>
          <Scanner onScan={handleScan} onClose={() => setShowScanner(false)} />
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {scannedData && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Just Scanned:</Text>
            {renderDetails(scannedData)}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}

        {savedDetails.length > 0 && (
          <Text style={styles.savedTitle}>Saved Scans</Text>
        )}

        {savedDetails.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.savedCard}
            onPress={() => {
              if (item.type === 'employee') {
                navigation.navigate('EmployeeDetails', { empid: item.empid });
              } else {
                navigation.navigate('AssetsDetailsScreen', { data: item });
              }
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {item.profilePic && (
                <Image source={item.profilePic} style={styles.profilePic} />
              )}
              <View style={{ marginLeft: 10 }}>
                {renderDetails(item)}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f8f9fb' },
  header: {
    backgroundColor: '#6200ee',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  headerTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 14
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10
  },
  headerButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 2,
    minWidth: '30%',
    alignItems: 'center'
  },
  buttonText: {
    color: '#6200ee',
    fontWeight: '700',
    fontSize: 14
  },
  scannerContainer: {
    height: height * 0.58,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#6200ee'
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10
  },
  detailText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333'
  },
  saveButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 14
  },
  saveText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center'
  },
  savedTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#444'
  },
  savedCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 1
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd'
  }
});
