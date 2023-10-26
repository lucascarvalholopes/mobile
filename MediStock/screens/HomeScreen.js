import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const plataforma = Platform.OS;

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'blue', justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.headerText}>MediStock</Text>
      </View>
      <View style={{ flex: 8, flexDirection: plataforma === "web" ? "row" : "column", justifyContent: "center", alignItems: "center", flexWrap: plataforma === "web" ? "wrap" : undefined, gap: 10, padding: 20 }}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('Estoque')}
        >
          <View style={[styles.square, styles.blueBackground]}>
            <Ionicons name="cube" size={64} color="white" />
            <Text style={styles.itemText}>Estoque de Medicamentos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('Pedido')}
        >
          <View style={[styles.square, styles.greenBackground]}>
            <Ionicons name="cart" size={64} color="white" />
            <Text style={styles.itemText}>Pedido</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, backgroundColor: 'blue', justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.footerText}>MediStock</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'blue',
    padding: 20,
    width: '100%',
    marginBottom: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    // alignSelf: "center",
    // alignItems: 'center',
  },
  square: {
    width: 160,
    height: 160,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueBackground: {
    backgroundColor: 'blue',
  },
  greenBackground: {
    backgroundColor: 'green',
  },
  itemText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  footer: {
    backgroundColor: 'blue',
    width: '100%',
    padding: 20,
  },
  footerText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
});

export default HomeScreen;

