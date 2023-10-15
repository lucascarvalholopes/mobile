import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Importe o ícone da biblioteca

function EstoqueScreen() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [novoMedicamento, setNovoMedicamento] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const adicionarMedicamento = () => {
    if (novoMedicamento && quantidade) {
      const novoItem = { nome: novoMedicamento, quantidade: quantidade };
      setMedicamentos([...medicamentos, novoItem]);
      setNovoMedicamento('');
      setQuantidade('');
    }
  };

  const excluirMedicamento = (item) => {
    const novaLista = medicamentos.filter((med) => med !== item);
    setMedicamentos(novaLista);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Estoque de Medicamentos</Text>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome do Medicamento"
            value={novoMedicamento}
            onChangeText={(text) => setNovoMedicamento(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            value={quantidade}
            onChangeText={(text) => setQuantidade(text)}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={adicionarMedicamento}>
          <Text style={styles.addButtonText}>Adicionar Medicamento</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={medicamentos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.medicamentoItem}>
            <Text>{item.nome} - Quantidade: {item.quantidade}</Text>
            <TouchableOpacity onPress={() => excluirMedicamento(item)}>
              <MaterialIcons
                name="delete"
                size={24}
                color="black"
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      />
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
  form: {
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
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
});

export default EstoqueScreen;
