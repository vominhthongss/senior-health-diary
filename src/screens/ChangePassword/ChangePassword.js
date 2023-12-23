import { ScrollView, Text, View } from "react-native";
import * as STRINGS from "../../constants/strings";
import GeneralForm from "../../components/GeneralForm/GeneralForm";

function ChangePasswordScreen() {
  const handleSave = (data) => {
    console.log("data :", data);
  };
  const fields = [
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
  return (
    <ScrollView>
      <View className="flex flex-column items-center">
        <Text className="text-2xl my-5 uppercase">
          {STRINGS.changePassword}
        </Text>
        <View className="w-[90%] ">
          <GeneralForm
            fields={fields}
            handleData={handleSave}
            titleSubmitBtn={STRINGS.save}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default ChangePasswordScreen;
