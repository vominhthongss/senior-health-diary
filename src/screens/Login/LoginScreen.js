import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import * as SCREENS_NAME from "../../constants/screensName";
import CustomizeButton from "../../components/CustomizeButton/CustomizeButton";
import CustomizeTextInput from "../../components/CustomizeTextInput/CustomizetextInput";
import { useNavigation } from "@react-navigation/native";
function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigation.navigate(SCREENS_NAME.mainTab);
  };

  return (
    <View className="h-full w-full flex justify-center items-center space-y-2">
      <Text>Login Screen</Text>
      <View className="w-[80%]">
        <CustomizeTextInput
          placeholder={"Username"}
          value={username}
          onChangeText={setUsername}
          secureTextEntry={false}
        />
      </View>
      <View className="w-[80%]">
        <CustomizeTextInput
          placeholder={"Password"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      <View className="w-[80%]">
        <CustomizeButton title={"Login"} onPress={handleLogin} />
      </View>
    </View>
  );
}

export default LoginScreen;
