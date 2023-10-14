import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

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
        <Button title="Adicionar Medicamento" onPress={adicionarMedicamento} />
      </View>
      <FlatList
        data={medicamentos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.medicamentoItem}>
            <Text>{item.nome} - Quantidade: {item.quantidade}</Text>
            <Button title="Excluir" onPress={() => excluirMedicamento(item)} />
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
    flex: 1, // Para dividir igualmente o espaço
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginRight: 10, // Adiciona um espaço entre os campos de entrada
  },
  medicamentoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default EstoqueScreen;
