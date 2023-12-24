import { Alert, ScrollView, Text, View } from "react-native";
import GeneralForm from "../../components/GeneralForm/GeneralForm";
import * as STRINGS from "../../constants/strings";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchUser,
  resetState,
  updateUser,
} from "../../store/userInformation/userInformationSlice";
import { SUCCEEDED } from "../../constants/store";

function UserInformationScreen() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.userInformation);
  const handleSave = (data) => {
    dispatch(updateUser({ user: data, id: user.id }));
  };
  const fields = [
    {
      name: "email",
      placeholder: "Địa chỉ email",
      value: user?.email,
      type: "email",
      label: "Địa chỉ email",
      isRequired: true,
    },
    {
      name: "fullName",
      placeholder: "Họ và tên",
      value: user?.fullName,
      type: "text",
      label: "Họ và tên",
      isRequired: true,
    },
    {
      name: "sex",
      type: "radio",
      options: [
        {
          id: "1",
          label: "Nam",
          value: "0",
        },
        {
          id: "2",
          label: "Nữ",
          value: "1",
        },
      ],
      value: user?.sex,
      label: "Giới tính",
      isRequired: true,
    },
    {
      name: "age",
      placeholder: "Tuổi",
      value: user?.age,
      type: "number",
      label: "Tuổi",
      isRequired: true,
    },
  ];
  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
    if (status === SUCCEEDED) {
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
      {user && (
        <View className="flex flex-column items-center">
          <Text className="text-2xl my-5 uppercase">{STRINGS.editTitle}</Text>
          <View className="w-[90%] ">
            <GeneralForm
              fields={fields}
              handleData={handleSave}
              titleSubmitBtn={STRINGS.save}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

export default UserInformationScreen;
