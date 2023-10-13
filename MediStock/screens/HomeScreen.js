import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('Estoque')}
      >
        <View style={[styles.square, styles.greenBackground]}>
          <Ionicons name="cube" size={64} color="white" />
          <Text style={styles.itemText}>Estoque de Medicamentos</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('EditorProduto')}
      >
        <View style={[styles.square, styles.blueBackground]}>
          <Ionicons name="camera" size={64} color="white" />
          <Text style={styles.itemText}>Editor de Produto</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    margin: 10,
  },
  square: {
    width: 160,
    height: 160,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenBackground: {
    backgroundColor: 'green',
  },
  blueBackground: {
    backgroundColor: 'blue',
  },
  itemText: {
    fontSize: 18,
    color: 'white', // Cor do texto
    textAlign: 'center', // Alinhar o texto ao centro
    marginTop: 10, // Espaço entre o ícone e o texto
  },
});

export default HomeScreen;
