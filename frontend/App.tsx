import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OracleScreen from "./screens/OracleScreen";
import OthersGate from "./screens/OthersGate";
import ScrollsScreen from "./screens/ScrollsScreen";
import VaultScreen from "./screens/VaultScreen";
import TempleOfTheElements from "./components/TempleOfTheElements";
import { CaelumProvider } from "./utils/Caelum";

const Stack = createStackNavigator();

export default function App() {
  return (
    <CaelumProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Oracle" component={OracleScreen} />
          <Stack.Screen name="OthersGate" component={OthersGate} />
          <Stack.Screen name="Scrolls" component={ScrollsScreen} />
          <Stack.Screen name="Vault" component={VaultScreen} />
          <Stack.Screen
            name="TempleOfTheElements"
            component={TempleOfTheElements}
            options={{ title: "🜂🜃🜁🜄 Temple" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CaelumProvider>
  );
}
