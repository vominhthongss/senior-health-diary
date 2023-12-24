import { Alert, ScrollView, Text, View } from "react-native";
import * as STRINGS from "../../constants/strings";
import GeneralForm from "../../components/GeneralForm/GeneralForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../../store/userInformation/userInformationSlice";
import { SUCCEEDED } from "../../constants/store";
import {
  resetState,
  updatePassword,
} from "../../store/changePassword/changePasswordSlice";

function ChangePasswordScreen() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInformation);
  const { status } = useSelector((state) => state.changePassword);
  const handleSave = (data) => {
    if (data.password_old !== user.password) {
      Alert.alert(STRINGS.alertName, STRINGS.alerWrongPassword);
    } else if (data.password !== data.confirmPassword) {
      Alert.alert(STRINGS.alertName, STRINGS.alerIsNotTheSame);
    } else {
      dispatch(updatePassword({ password: data.password, id: user.id }));
    }
  };
  const fields = [
    {
      name: "password_old",
      placeholder: "Mật khẩu cũ",
      type: "password",
      value: "",
      label: "Mật khẩu cũ",
      minLength: 6,
      isRequired: true,
    },
    {
      name: "password",
      placeholder: "Mật khẩu mới",
      type: "password",
      value: "",
      label: "Mật khẩu mới",
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
    if (!user) {
      dispatch(fetchUser());
    }
    if (user && status === SUCCEEDED) {
      Alert.alert(
        STRINGS.alertName,
        STRINGS.alerUpdate,
        [
          {
            text: "OK",
            onPress: () => {
              dispatch(resetState());
            },
          },
        ],
        { cancelable: false }
      );
    }
  }, [user, status, dispatch]);
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
