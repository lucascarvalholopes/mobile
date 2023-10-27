import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from 'react-native-vector-icons'; // Importe o ícone Feather

function PedidoScreen() {
  const [medicamento, setMedicamento] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  const [editandoQuantidade, setEditandoQuantidade] = useState({ ativo: false, index: null });

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

  const finalizarPedido = () => {
    setPedidos([]);
    setPedidoEnviado(true);
  }

  const editarQuantidade = (index) => {
    setEditandoQuantidade({ ativo: true, index });
  }

  const salvarQuantidadeEditada = (index, novaQuantidade) => {
    const novosPedidos = [...pedidos];
    novosPedidos[index].quantidade = novaQuantidade;
    setPedidos(novosPedidos);
    setEditandoQuantidade({ ativo: false, index: null });
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
        {pedidoEnviado && <Text style={styles.pedidoEnviado}>Pedido Enviado</Text>}
      </View>
      <Text style={styles.listaTitulo}>Pedidos Atuais:</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemLista}>
            <Text>{item.medicamento} - Quantidade: {item.quantidade}</Text>
            {!editandoQuantidade.ativo && (
              <TouchableOpacity onPress={() => editarQuantidade(index)} style={styles.editIcon}>
                <Feather  // Usando o Feather para o ícone de edição
                  name="edit"  // Ícone de edição no Feather
                  size={24}
                  color="blue"  // Cor azul (ou a cor desejada)
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            )}
            {editandoQuantidade.ativo && editandoQuantidade.index === index && (
              <View style={styles.editQuantidade}>
                <TextInput
                  style={styles.inputQuantidade}
                  value={item.quantidade}
                  onChangeText={(text) => salvarQuantidadeEditada(index, text)}
                  keyboardType="numeric"
                />
                <Button title="Salvar" onPress={() => salvarQuantidadeEditada(index, item.quantidade)} />
              </View>
            )}
          </View>
        )}
      />
      <Button title="Finalizar Pedido" onPress={finalizarPedido} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pedidoEnviado: {
    fontSize: 18,
    color: 'green',
    marginTop: 10,
  },
  editQuantidade: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  inputQuantidade: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 5,
  },
  editIcon: {
    backgroundColor: 'transparent',
    padding: 5,
  },
});

export default PedidoScreen;

