import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function DownloadedDataScreen({ route }) {
  const { data } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (data.length === 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1400,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [data]);

  const handleDownload = (item) => {
    alert(`Downloading: ${item}`);
  };

  const handleShare = async (item) => {
    try {
      await Share.share({
        message: item,
      });
    } catch (error) {
      alert('Error sharing the item.');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.header}
      >
        <Text style={styles.title}>Saved Scans</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.body}>
        {data.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Animated.View style={{ opacity: fadeAnim }}>
              <MaterialCommunityIcons
                name="database-refresh"
                size={100}
                color="#9c9c9c"
              />
            </Animated.View>
            <Text style={styles.emptyTitle}>No Data Yet</Text>
            <Text style={styles.emptySubtitle}>
              Start scanning and save your data — it will appear here.
            </Text>
          </View>
        ) : (
          data.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardText}>{item}</Text>
              <View style={styles.cardFooter}>
                <TouchableOpacity
                  style={styles.iconBtn}
                  onPress={() => handleDownload(item)}
                >
                  <MaterialCommunityIcons
                    name="download"
                    size={24}
                    color="#667eea"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconBtn}
                  onPress={() => handleShare(item)}
                >
                  <MaterialCommunityIcons
                    name="share-variant"
                    size={24}
                    color="#764ba2"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fc' },

  header: {
    paddingTop: 70,
    paddingBottom: 30,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1.2,
  },

  subtitle: {
    fontSize: 14,
    marginTop: 8,
    color: '#e0d7f5',
    fontWeight: '500',
  },

  body: {
    padding: 20,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 16,
    shadowColor: '#764ba2',
    shadowOpacity: 0.12,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },

  cardText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    lineHeight: 24,
  },

  cardFooter: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
  },

  iconBtn: {
    padding: 5,
  },

  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 24,
    color: '#666',
    fontWeight: '700',
    marginTop: 20,
  },

  emptySubtitle: {
    fontSize: 15,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
});