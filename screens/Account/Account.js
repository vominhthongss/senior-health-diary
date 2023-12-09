import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function AccountScreen() {
  const navigation = useNavigation();

  const goToUserInformation = () => {
    navigation.navigate("UserInformation"); // Navigate to the UserInformation screen
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
