import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Camera } from "expo-camera";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function EditorProdutoScreen({ route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef(null);
  const [nomeMedicamento, setNomeMedicamento] = useState('');
  const [quantidadeMedicamento, setQuantidadeMedicamento] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setPhoto(uri);
      setCameraVisible(false);
    }
  };

  const adicionarMedicamento = async () => {
    if (nomeMedicamento && quantidadeMedicamento) {
      // Recuperar a lista de medicamentos existente
      const medicamentos = await AsyncStorage.getItem('medicamentos');
      let medicamentosArray = [];
      if (medicamentos) {
        medicamentosArray = JSON.parse(medicamentos);
      }
      // Adicionar o novo medicamento à lista
      medicamentosArray.push({
        nome: nomeMedicamento,
        quantidade: quantidadeMedicamento,
        photoUri: photo,
      });
      // Salvar a lista atualizada no AsyncStorage
      await AsyncStorage.setItem('medicamentos', JSON.stringify(medicamentosArray));

      // Navegar de volta para a tela de estoque com o novo medicamento
      navigation.navigate('Estoque', { novoMedicamento: { nome: nomeMedicamento, quantidade: quantidadeMedicamento, photoUri: photo } });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editor de Produtos</Text>
      <TouchableOpacity onPress={() => setCameraVisible(true)} style={styles.cameraButton}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.profileImage} />
        ) : (
          <View style={styles.cameraIcon}>
            <Icon name="camera" size={50} color="white" />
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Medicamento"
          value={nomeMedicamento}
          onChangeText={(text) => setNomeMedicamento(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          value={quantidadeMedicamento}
          onChangeText={(text) => setQuantidadeMedicamento(text)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={adicionarMedicamento}>
          <Text style={styles.addButtonText}>Adicionar Medicamento</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={cameraVisible}
        onRequestClose={() => setCameraVisible(false)}
      >
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ratio="16:9"
        >
          <TouchableOpacity
            style={styles.captureButton}
            onPress={() => handleCapture()}
          >
            <View style={styles.captureButtonInner}>
              <View style={styles.captureButtonCircle}>
                <View style={styles.captureButtonCenter} />
              </View>
            </View>
          </TouchableOpacity>
        </Camera>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
  cameraButton: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  cameraIcon: {
    backgroundColor: 'transparent',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  form: {
    width: '100%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureButton: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  captureButtonInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonCenter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'gray',
  },
});

export default EditorProdutoScreen;



