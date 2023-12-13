import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import * as COLORS from "../../constants/colors";
import * as STRINGS from "../../constants/strings";
import { localeConfig } from "../../constants/localeConfig";
import { ScrollView } from "react-native-gesture-handler";
import CustomizeButton from "../../components/CustomizeButton/CustomizeButton";

LocaleConfig.locales["vi"] = localeConfig;
LocaleConfig.defaultLocale = "vi";

function ScheduleScreen() {
  const [items, setItems] = useState({
    "2023-12-01": [{ time: "12:00", text: "Meeting at 10am" }],
    "2023-12-12": [
      { time: "12:00", text: "Lunch with colleagues" },
      { time: "12:00", text: "Shopping" },
    ],
    "2023-12-13": [{ time: "12:00", text: "Gym at 5pm" }],
  });

  const [newDate, setNewDate] = useState("");
  const [newItemText, setNewItemText] = useState("");

  const renderItem = (item) => {
    return (
      <ScrollView>
        <View className="flex flex-column items-start justify-center shadow-md bg-gray-300 my-2 mr-2 rounded-md">
          <Text className="text-sm">{item.time}</Text>
          <Text className="text-sm">{item.text}</Text>
        </View>
      </ScrollView>
    );
  };

  const renderEmptyData = () => {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{STRINGS.no_schedule}</Text>
      </View>
    );
  };

  const handleAddDate = () => {
    if (!newDate || !newItemText) {
      Alert.alert(STRINGS.alert_name, STRINGS.alert_info);
      return;
    }
  };

  return (
    <View className="flex-1">
      <Agenda
        theme={{
          todayBackgroundColor: COLORS.todayBackgroundColor,
          selectedDayBackgroundColor: COLORS.selectedDayBackgroundColor,
          dotColor: COLORS.dotColor,
          agendaTodayColor: COLORS.main,
        }}
        items={items}
        renderItem={renderItem}
        renderEmptyData={renderEmptyData}
      />

      <View className="absolute bottom-1 right-0 w-[100%] px-2">
        <CustomizeButton onPress={handleAddDate} title={STRINGS.add_date} />
      </View>
    </View>
  );
}

export default ScheduleScreen;
