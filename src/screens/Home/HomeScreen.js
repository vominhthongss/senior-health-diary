import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SCREENS_NAME from "../../constants/screensName";

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text className="text-blue-500">Home Screen</Text>
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.removeItem("token");
          navigation.navigate(SCREENS_NAME.login);
        }}
      >
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
