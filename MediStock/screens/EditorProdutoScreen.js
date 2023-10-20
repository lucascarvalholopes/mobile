import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function EditorProdutoScreen() {
  const handleCameraPress = () => {
    // Implemente a lógica para abrir a câmera aqui
    // Por exemplo, você pode usar a biblioteca react-native-camera
    // e navegar para a tela da câmera
  };

  return (
    <View style={styles.container}>
      <Text>Editor de Produto Screen</Text>
      <TouchableOpacity onPress={handleCameraPress} style={styles.cameraButton}>
        <Icon name="camera" size={50} color="white" />
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
  cameraButton: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 50,
    marginTop: 20,
  },
});

export default EditorProdutoScreen;
