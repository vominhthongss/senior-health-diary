import { Image, ScrollView, Text, View } from "react-native";
import GeneralForm from "../../components/GeneralForm/GeneralForm";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as STRINGS from "../../constants/strings";
import { TouchableOpacity } from "react-native-gesture-handler";

function SignUpScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token, status } = useSelector((state) => state.auth);

  const handleLogin = (values) => {
    console.log("values :", values);
    dispatch(login({ email: values.email, password: values.password }));
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const fields = [
    {
      name: "email",
      placeholder: "Địa chỉ email",
      value: "",
      type: "email",
      label: "Địa chỉ email",
      isRequired: true,
    },
    {
      name: "fullName",
      placeholder: "Họ và tên",
      value: "",
      type: "text",
      label: "Họ và tên",
      isRequired: true,
    },
    {
      name: "password",
      placeholder: "Mật khẩu",
      type: "password",
      value: "",
      label: "Mật khẩu",
      minLength: 6,
      isRequired: true,
    },
    {
      name: "confirmPassword",
      placeholder: "Nhập lại mật khẩu",
      type: "password",
      value: "",
      label: "Nhập lại mật khẩu",
      minLength: 6,
      isRequired: true,
    },
  ];
  useEffect(() => {
    if (token && token !== "" && status === SUCCEEDED) {
      navigation.navigate(SCREENS_NAME.mainTab);
    }
  }, [token, status]);

  return (
    <ScrollView className="bg-white">
      <View className="w-full flex justify-center items-center space-y-2">
        <Image
          source={require("../../../assets/images/logo.jpg")}
          style={{ width: 200, height: 200 }}
        />

        <Text className="pb-4 text-2xl uppercase">{STRINGS.signUp}</Text>

        <View className="w-[90%]">
          <GeneralForm
            fields={fields}
            handleData={handleLogin}
            titleSubmitBtn={STRINGS.createAccount}
          />
          <View className="flex flex-row justify-start py-5 ">
            <TouchableOpacity onPress={handleBack}>
              <Text className="text-blue-500">
                {"<< "}
                {STRINGS.backTitle}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default SignUpScreen;
