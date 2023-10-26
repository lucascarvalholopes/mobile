import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function EstoqueScreen({ route }) {
  const [medicamentos, setMedicamentos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [quantidadeEdit, setQuantidadeEdit] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params && route.params.novoMedicamento) {
      const { nome, quantidade, photoUri } = route.params.novoMedicamento;
      if (nome && quantidade) {
        const novoItem = {
          nome: nome,
          quantidade: quantidade,
          photoUri: photoUri,
        };
        setMedicamentos([...medicamentos, novoItem]);
      }
    }
  }, [route.params]);

  const excluirMedicamento = (item) => {
    const novaLista = medicamentos.filter((med) => med !== item);
    setMedicamentos(novaLista);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setQuantidadeEdit(item.quantidade.toString());
    setModalVisible(true);
  };

  const saveEdit = () => {
    // Atualize a quantidade do item e feche o modal
    if (editingItem) {
      editingItem.quantidade = parseInt(quantidadeEdit, 10);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Estoque de Medicamentos</Text>
      <TouchableOpacity onPress={() => navigation.navigate('EditorProduto')} style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar Medicamento</Text>
      </TouchableOpacity>
      <FlatList
        data={medicamentos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.medicamentoItem}>
            {item.photoUri && <Image source={{ uri: item.photoUri }} style={styles.medicamentoImage} />}
            <Text>{item.nome} - Quantidade: {item.quantidade}</Text>
            <TouchableOpacity onPress={() => excluirMedicamento(item)}>
              <MaterialIcons
                name="delete"
                size={24}
                color="black"
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openEditModal(item)} style={styles.editIcon}>
              <Text style={{ color: 'blue' }}>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Editar Quantidade:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nova Quantidade"
              value={quantidadeEdit}
              onChangeText={(text) => setQuantidadeEdit(text)}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  medicamentoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteIcon: {
    backgroundColor: 'transparent',
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  editIcon: {
    backgroundColor: 'transparent',
    padding: 5,
  },
  medicamentoImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default EstoqueScreen;



