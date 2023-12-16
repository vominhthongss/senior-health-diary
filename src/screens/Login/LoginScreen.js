import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import * as SCREENS_NAME from "../../constants/screensName";
import { useNavigation } from "@react-navigation/native";
import GoogleButton from "../../components/GoogleButton/GoogleButton";
import GeneralForm from "../../components/GeneralForm/GeneralForm";
import * as STRINGS from "../../constants/strings";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/authSlice";
import { SUCCEEDED } from "../../constants/store";

function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token, status } = useSelector((state) => state.auth);

  const handleLogin = async (values) => {
    dispatch(login({ email: values.email, password: values.password }));
  };

  const handleLoginGoogle = () => {
    navigation.navigate(SCREENS_NAME.mainTab);
  };

  const fields = [
    {
      name: "email",
      placeholder: "Email",
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
  useEffect(() => {
    if (token !== null && token && token !== "" && status === SUCCEEDED) {
      navigation.navigate(SCREENS_NAME.mainTab);
    }
  }, [data, token, status]);

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
