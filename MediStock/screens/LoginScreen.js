import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function LoginScreen({ navigation }) {
  const handleLogin = () => {
    // Coloque sua lógica de autenticação aqui
    // Se o login for bem-sucedido, navegue para a tela Home
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MediStock</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>Faça Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>MediStock</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: 'blue',
    width: '100%',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  form: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
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

export default LoginScreen;

