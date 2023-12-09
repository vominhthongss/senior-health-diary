import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/Home/HomeScreen";
import LoginScreen from "./screens/Login/LoginScreen";
import AccountScreen from "./screens/Account/Account";
import UserInformationScreen from "./screens/UserInformation/UserInfomation";
import {
  screenBottomOption,
  screenChildOption,
  screenParentOption,
} from "./constants/options";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={screenParentOption}
        />
        <Stack.Screen
          name="Home"
          options={screenParentOption}
          component={MainTabScreen}
        />
        <Stack.Screen
          name="UserInformation"
          component={UserInformationScreen}
          options={screenChildOption}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainTabScreen = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        options={screenBottomOption}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Account"
        options={screenBottomOption}
        component={AccountScreen}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default App;
