import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import EstoqueScreen from './screens/EstoqueScreen';
import PedidoScreen from './screens/PedidoScreen';
import EditorProdutoScreen from './screens/EditorProdutoScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Estoque" component={EstoqueScreen} />
        <Stack.Screen name="Pedido" component={PedidoScreen} />
        <Stack.Screen name="EditorProduto" component={EditorProdutoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
