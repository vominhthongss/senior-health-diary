import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import * as SCREENS_NAME from "../../constants/screensName";
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigation.navigate(SCREENS_NAME.mainTab);
  };

  return (
    <View className="h-full w-full flex justify-center items-center space-y-2">
      <Text>Login Screen</Text>
      <TextInput
        className="p-5 border rounded-md w-[80%]"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        className="p-5 border rounded-md w-[80%]"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View className="bg-main w-[80%] rounded-md">
        <Button color={"white"} title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   input: {
//     width: "80%",
//     marginVertical: 10,
//     padding: 10,
//     borderWidth: 1,
//     borderRadius: 5,
//   },
// });

export default LoginScreen;
