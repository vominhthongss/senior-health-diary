import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import * as SCREENS_NAME from "../../constants/screensName";
import CustomizeButton from "../../components/CustomizeButton/CustomizeButton";
import CustomizeTextInput from "../../components/CustomizeTextInput/CustomizetextInput";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigation.navigate(SCREENS_NAME.mainTab);
    console.log("Username:", username, "Password:", password);
  };

  const handleGoogleLogin = async () => {
  };

  return (
    <View className="h-full w-full flex justify-center items-center space-y-2">
      <Image
        source={{ uri: 'https://res.cloudinary.com/practicaldev/image/fetch/s--ZUMyUgWZ--/c_imagga_scale,f_auto,fl_progressive,h_1080,q_auto,w_1080/https://dev-to-uploads.s3.amazonaws.com/i/am6lv2x37bole6x4poz3.jpg' }} // Đường dẫn URL của ảnh
        style={{ width: 100, height: 100 }} // Kích thước của ảnh
      />

      <Text className="pb-4 text-lg">Login</Text>
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
      <Text>Fogot password?</Text>
      <View className="w-full flex justify-center items-center space-y-2 pt-6">
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#e0e0e0',
            padding: 10,
            borderRadius: 50,
            width: "100%"
          }}
          onPress={handleGoogleLogin}
        >
          <Icon
            name="google"
            size={20}
            color="#eb3448"
            style={{ marginRight: 10 }}
          />
          <Text
            style={{ color: '#eb3448', fontWeight: 'bold' }}>
            Login with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View >
  );
}

export default LoginScreen;
