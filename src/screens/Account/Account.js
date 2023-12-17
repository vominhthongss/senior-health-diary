import React from "react";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SCREENS_NAME from "../../constants/screensName";
import * as ACCOUNT_MENU from "../../constants/account";
import * as STRINGS from "../../constants/strings";

function AccountScreen() {
  const navigation = useNavigation();

  const goToUserInformation = () => {
    navigation.navigate(SCREENS_NAME.userInformation);
  };

  const arrow = (
    <Image
      source={require("../../../assets/images/arrow-icon.png")}
      className="w-5 h-5"
    />
  );

  return (
    <ScrollView>
      <TouchableOpacity onPress={goToUserInformation}>
        <View className="border-y border-gray-400 py-2 w-full">
          <View className="flex justify-between flex-row items-center p-5">
            <View className="flex flex-row items-center space-x-2">
              <Image
                source={require("../../../assets/images/user-logo.png")}
                className="w-20 h-20 rounded-full"
              />
              <View>
                <Text className="text-xl">Catalin Viciu</Text>
                <Text className="text-lg text-gray-400">
                  70 {STRINGS.ageText}
                </Text>
              </View>
            </View>
            {arrow}
          </View>
        </View>
      </TouchableOpacity>
      <View>
        <View className="border-b border-gray-400 p-3 mt-10">
          <Text className=" text-gray-400">{STRINGS.optionText}</Text>
        </View>
        {ACCOUNT_MENU.accountOptionMenu.map((menu, key) => {
          return (
            <TouchableOpacity key={key}>
              <View className="border-b border-gray-400 w-full">
                <View className="flex justify-between p-5 flex-row">
                  <Text className="text-lg">{menu.title}</Text>
                  {arrow}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity className="mt-20">
          <View className="border border-gray-400 w-full">
            <View className="flex justify-start p-5">
              <Text className="text-red-500 font-bold text-lg">Đăng xuất</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default AccountScreen;
