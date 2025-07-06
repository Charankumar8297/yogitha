import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // install this package

export default function AssetDetailsScreen({ route }) {
  const { data, link } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Asset Details</Text>
      <Text style={styles.label}>Asset ID: {data.assetid}</Text>
      <Text style={styles.label}>Name: {data.name}</Text>
      <Text style={styles.label}>Category: {data.category}</Text>
      <Text style={styles.label}>Purchase Date: {data.purchaseDate}</Text>

      <Text style={[styles.title, { marginTop: 30 }]}>Asset QR Code</Text>
      {link ? (
        <View style={styles.qrContainer}>
          <QRCode value={link} size={200} />
        </View>
      ) : (
        <Text>No QR code available</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    fontSize: 18,
    marginBottom: 10
  },
  qrContainer: {
    marginTop: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3
  }
});
