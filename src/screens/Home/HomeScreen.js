import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import * as STRINGS from "../../constants/strings";
import GeneralForm from "../../components/GeneralForm/GeneralForm";

function HomeScreen() {
  const navigation = useNavigation();
  const handleSearch = (data) => {
    console.log("data :", data);
  };
  const fields = [
    {
      name: "search",
      placeholder: "Tìm kiếm bệnh",
      value: "",
      type: "text",
      label: "Tìm kiếm bệnh",
    },
  ];
  return (
    <View>
      <View className="flex flex-row justify-center">
        <View className="w-[90%]">
          <GeneralForm
            fields={fields}
            titleSubmitBtn={STRINGS.search}
            handleData={handleSearch}
          />
        </View>
      </View>
      <ScrollView></ScrollView>
    </View>
  );
}

export default HomeScreen;
