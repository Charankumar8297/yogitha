import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

export default function AssetListScreen() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://192.168.1.13:5000/assets')  // Use your API URL here
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch assets');
        return res.json();
      })
      .then((data) => setAssets(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.assetId}>ID: {item.assetid}</Text>
      <Text style={styles.name}>Name: {item.name}</Text>
      <Text style={styles.category}>Category: {item.category}</Text>
      <Text style={styles.date}>Purchased: {item.purchaseDate}</Text>
    </View>
  );

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} size="large" />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;

  return (
    <FlatList
      data={assets}
      keyExtractor={(item) => item.assetid}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={<Text style={styles.emptyText}>No assets found.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  itemContainer: {
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 16,
    borderRadius: 10,
    elevation: 2
  },
  assetId: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4
  },
  name: {
    fontSize: 15,
    marginBottom: 2
  },
  category: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2
  },
  date: {
    fontSize: 13,
    color: '#888'
  },
  error: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center'
  },
  emptyText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#888',
    fontSize: 16
  }
});
