import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as ROUTES from "./src/routes/routes";
import { Provider } from "react-redux";
import store from "./src/store/store";

const Stack = createStackNavigator();

function App() {
  const screens = Object.values(ROUTES).map((screen, index) => (
    <Stack.Screen
      key={index}
      name={screen.name}
      component={screen.component}
      options={screen.options}
    />
  ));
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ROUTES.login.name}>
          {screens}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
