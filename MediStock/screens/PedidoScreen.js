import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

function PedidoScreen() {
  const [medicamento, setMedicamento] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pedidos, setPedidos] = useState([]);

  const adicionarPedido = () => {
    if (medicamento.trim() === '' || quantidade.trim() === '') {
      return;
    }

    const novoPedido = {
      medicamento,
      quantidade,
    };

    setPedidos([...pedidos, novoPedido]);
    setMedicamento('');
    setQuantidade('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pedidos de Medicamentos</Text>
      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Medicamento"
          value={medicamento}
          onChangeText={text => setMedicamento(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          value={quantidade}
          onChangeText={text => setQuantidade(text)}
          keyboardType="numeric"
        />
        <Button title="Adicionar Pedido" onPress={adicionarPedido} />
      </View>
      <Text style={styles.listaTitulo}>Pedidos Atuais:</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemLista}>
            <Text>{item.medicamento} - Quantidade: {item.quantidade}</Text>
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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formulario: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  listaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemLista: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default PedidoScreen;

