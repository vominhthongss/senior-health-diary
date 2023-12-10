import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import * as SCREENS_NAME from "../../constants/screensName";
import CustomizeButton from "../../components/CustomizeButton/CustomizeButton";
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
      <View className="w-[80%]">
        <CustomizeButton title={"Login"} onPress={handleLogin} />
      </View>
    </View>
  );
};

export default LoginScreen;
