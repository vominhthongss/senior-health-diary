import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import * as SCREENS_NAME from "../../constants/screensName";
import CustomizeButton from "../../components/CustomizeButton/CustomizeButton";
import CustomizeTextInput from "../../components/CustomizeTextInput/CustomizetextInput";
import { useNavigation } from "@react-navigation/native";
import GoogleButton from "../../components/GoogleButton/GoogleButton";

function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigation.navigate(SCREENS_NAME.mainTab);
    console.log("Username:", username, "Password:", password);
  };

  const handleLoginGoogle = () => {
    navigation.navigate(SCREENS_NAME.mainTab);
  };

  return (
    <View className="bg-white h-full w-full flex justify-center items-center space-y-2">
      <Image
        source={require("../../../assets/images/logo.jpg")}
        style={{ width: 200, height: 200 }}
      />

      <Text className="pb-4 text-2xl uppercase">Senior Health Diary</Text>
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
      <View className="w-[80%] flex justify-start py-5">
        <Text>Fogot password?</Text>
      </View>
      <View className="w-[80%]">
        <CustomizeButton title={"SIGN IN"} onPress={handleLogin} />
      </View>

      <View className="w-[80%]">
        <GoogleButton onPress={handleLoginGoogle} />
      </View>
    </View>
  );
}

export default LoginScreen;
