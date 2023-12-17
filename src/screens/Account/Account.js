import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SCREENS_NAME from "../../constants/screensName";

function AccountScreen() {
  const navigation = useNavigation();

  const goToUserInformation = () => {
    navigation.navigate(SCREENS_NAME.userInformation);
  };

  return (
    <View>
      <View className="pt-10">
        <Text className="pl-[15px] pb-2 text-[#b1b1b3]">Tài khoản</Text>
        <TouchableOpacity onPress={goToUserInformation}>
          <View className="border-y border-[#b1b1b3] py-2 w-full">
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 10,
                paddingHorizontal: 15,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Image
                    source={require("../../../assets/images/user-logo.png")}
                    className="w-16 h-16 rounded-full"
                  />
                </View>
                <View className="px-2.5">
                  <Text>Catalin Viciu</Text>
                  <Text className="text-xs text-[#b1b1b3]">
                    Tài khoản: Catalin Viciu
                  </Text>
                </View>
              </View>
              <View className="float-right">
                <Image
                  source={require("../../../assets/images/arrow-icon.png")}
                  className="w-5 h-5"
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text className="pl-[15px] pt-12 pb-2 text-[#b1b1b3]">
          Tuỳ chọn
        </Text>
        <TouchableOpacity>
          <View className="border-t border-[#b1b1b3] w-full">
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>Đổi mật khẩu</Text>
              <View className="float-right">
                <Image
                  source={require("../../../assets/images/arrow-icon.png")}
                  className="w-5 h-5"
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="border-y border-[#b1b1b3] w-full">
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>Trợ giúp và phản hồi</Text>
              <View className="float-right">
                <Image
                  source={require("../../../assets/images/arrow-icon.png")}
                  className="w-5 h-5"
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="border-b border-[#b1b1b3] w-full">
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>Xoá tài khoản</Text>
              <View className="float-right">
                <Image
                  source={require("../../../assets/images/arrow-icon.png")}
                  className="w-5 h-5"
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="mt-20">
          <View className="border border-[#b1b1b3] w-full">
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text className="text-red-500 font-bold">Đăng xuất</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View >
  );
}

export default AccountScreen;
