import React, { useState, useEffect } from 'react';
import { Text, View, Button, Alert, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function HomeScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    Alert.alert('QR Code Scanned', data);

    try {
      const user = auth.currentUser;
      if (!user) {
        console.warn('No user logged in');
        return;
      }

      await addDoc(collection(db, 'scans'), {
        userId: user.uid,
        text: data,
        timestamp: serverTimestamp(),
      });

      console.log('✅ Scan saved to Firestore');
    } catch (error) {
      console.error('❌ Error saving scan to Firestore:', error);
    }

    setTimeout(() => setScanned(false), 3000);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('🔒 Logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (hasPermission === null) return <Text>Requesting camera permission...</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.scannerWrapper}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      {scanned && (
        <View style={styles.buttonSpacing}>
          <Button title="Scan Again" onPress={() => setScanned(false)} />
        </View>
      )}

      <View style={styles.buttonSpacing}>
        <Button title="Logout" onPress={handleLogout} color="#d9534f" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  scannerWrapper: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonSpacing: {
    marginTop: 20,
  },
});
