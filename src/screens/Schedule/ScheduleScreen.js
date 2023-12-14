import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import * as COLORS from "../../constants/colors";
import * as STRINGS from "../../constants/strings";
import { localeConfig } from "../../constants/localeConfig";
import { ScrollView } from "react-native-gesture-handler";
import CustomizeButton from "../../components/CustomizeButton/CustomizeButton";
import ShareButton from "../../ShareButton/ShareButton";

LocaleConfig.locales["vi"] = localeConfig;
LocaleConfig.defaultLocale = "vi";

function ScheduleScreen() {
  const [items, setItems] = useState({
    "2023-12-01": [{ type: "remind", time: "12:00", text: "Meeting at 10am" }],
    "2023-12-12": [
      { type: "remind", time: "12:00", text: "Lunch with colleagues" },
      { type: "remind", time: "12:00", text: "Shopping" },
    ],
    "2023-12-13": [{ type: "remind", time: "12:00", text: "Gym at 5pm" }],
    "2023-12-14": [
      {
        type: "diary",
        sick: "Cao huyết áp",
        symptoms: "Nhức đầu",
        description: "Đau hoài",
        date: "2023-12-14",
      },
    ],
  });

  const [newDate, setNewDate] = useState("");
  const [newItemText, setNewItemText] = useState("");

  const renderItem = (item) => {
    return (
      <ScrollView>
        {item.type === "remind" ? (
          <View className="flex flex-column items-start justify-center shadow-md bg-gray-300 my-2 mr-2 rounded-md">
            <Text className="text-sm font-bold text-green-700">
              {item.time}
            </Text>
            <Text className="text-sm">{item.text}</Text>
          </View>
        ) : (
          <View className="relative w-full flex flex-column items-start justify-center shadow-md bg-gray-300 my-2 mr-2 rounded-md">
            <Text className="text-lg font-bold">{item.sick}</Text>
            <Text className="text-md">{item.symptoms}</Text>
            <Text className="text-sm italic text-gray-500">
              {item.description}
            </Text>
            <View className="absolute right-1 bottom-0">
              <ShareButton
                symptoms={item.symptoms}
                description={item.description}
                date={item.date}
              />
            </View>
          </View>
        )}
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
