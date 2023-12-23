import { ScrollView, Text, View } from "react-native";
import GeneralForm from "../../components/GeneralForm/GeneralForm";
import * as STRINGS from "../../constants/strings";

function UserInformationScreen() {
  const handleSave = (data) => {};
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
      value: "",
      label: "Giới tính",
      isRequired: true,
    },
    {
      name: "age",
      placeholder: "Tuổi",
      value: "",
      type: "number",
      label: "Tuổi",
      isRequired: true,
    },
  ];
  return (
    <ScrollView>
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
    </ScrollView>
  );
}

export default UserInformationScreen;
