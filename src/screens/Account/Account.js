import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SCREENS_NAME from "../../constants/screensName";

function AccountScreen() {
  const navigation = useNavigation();

  const goToUserInformation = () => {
    navigation.navigate(SCREENS_NAME.userInformation);
  };

  return (
    <View>
      <TouchableOpacity onPress={goToUserInformation}>
        <Text>Go to User Information</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AccountScreen;
