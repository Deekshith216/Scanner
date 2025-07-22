import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function QRHistoryScreen() {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.warn('No logged in user');
      return;
    }

    const q = query(
      collection(db, 'scans'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setScans(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📜 Scan History</Text>
      {scans.length === 0 ? (
        <Text>No scans found yet.</Text>
      ) : (
        <FlatList
          data={scans}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.scanItem}>
              <Text style={styles.text}>📄 {item.text}</Text>
              <Text style={styles.timestamp}>
                🕒 {item.timestamp?.toDate().toLocaleString() || 'Pending...'}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scanItem: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
