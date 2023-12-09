import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/Home/HomeScreen";
import LoginScreen from "./screens/Login/LoginScreen";
import AccountScreen from "./screens/Account/Account";
import { Text } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerLeft: null, headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false, headerLeft: null }}
          component={MainTabScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainTabScreen = () => {
  return (
    <Tab.Navigator initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        options={{ headerTitleAlign: "left" }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Account"
        options={{ headerTitleAlign: "left" }}
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
};

export default App;
