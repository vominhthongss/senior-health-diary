import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import * as SCREENS_NAME from "../../constants/screensName";
import { useNavigation } from "@react-navigation/native";
import GoogleButton from "../../components/GoogleButton/GoogleButton";
import GeneralForm from "../../components/GeneralForm/GeneralForm";
import * as STRINGS from "../../constants/strings";

function LoginScreen() {
  const navigation = useNavigation();

  const handleLogin = (values) => {
    navigation.navigate(SCREENS_NAME.mainTab);
  };

  const handleLoginGoogle = () => {
    navigation.navigate(SCREENS_NAME.mainTab);
  };

  const fields = [
    {
      name: "username",
      placeholder: "Username",
      value: "",
      type: "text",
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
      value: "",
    },
  ];
  const [data, setData] = useState({});
  useEffect(() => {}, [data]);

  return (
    <View className="bg-white h-full w-full flex justify-center items-center space-y-2">
      <Image
        source={require("../../../assets/images/logo.jpg")}
        style={{ width: 200, height: 200 }}
      />

      <Text className="pb-4 text-2xl uppercase">{STRINGS.appName}</Text>

      <View className="w-[80%]">
        <GeneralForm
          fields={fields}
          handleData={handleLogin}
          titleSubmitBtn={STRINGS.signIn}
        />
        <GoogleButton onPress={handleLoginGoogle} />
      </View>
      <View className="w-[80%] flex justify-start py-5">
        <Text>{STRINGS.forgotPassword}</Text>
      </View>
    </View>
  );
}

export default LoginScreen;
