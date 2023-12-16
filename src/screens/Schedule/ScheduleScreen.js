import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import * as COLORS from "../../constants/colors";
import * as STRINGS from "../../constants/strings";
import { localeConfig } from "../../constants/localeConfig";
import { ScrollView } from "react-native-gesture-handler";
import CustomizeButton from "../../components/CustomizeButton/CustomizeButton";
import ShareButton from "../../ShareButton/ShareButton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSchedule,
  updateSchedule,
} from "../../store/schedule/scheduleSlice";

LocaleConfig.locales["vi"] = localeConfig;
LocaleConfig.defaultLocale = "vi";

function ScheduleScreen() {
  const dispatch = useDispatch();
  const { schedules } = useSelector((state) => state.schedule);
  useEffect(() => {
    dispatch(fetchSchedule());
  }, [dispatch]);

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
        <Text>{STRINGS.noSchedule}</Text>
      </View>
    );
  };
  const [dataSelected, setDateSelected] = useState("");
  const [remindText, setRemindText] = useState("text");

  const handleAddDate = () => {
    if (!dataSelected || !remindText) {
      Alert.alert(STRINGS.alertName, STRINGS.alertInfo);
      return;
    }
    dispatch(
      updateSchedule({
        date: dataSelected,
        schedule: { type: "remind", time: "12:00", text: remindText },
      })
    );
    dispatch(
      updateSchedule({
        date: dataSelected,
        schedule: {
          type: "diary",
          sick: "Mỏi",
          symptoms: "Đau chân",
          description: "Mỏi",
          date: dataSelected,
        },
      })
    );
  };

  return (
    <View className="flex-1">
      <Agenda
        onDayPress={(value) => setDateSelected(value.dateString)}
        theme={{
          todayBackgroundColor: COLORS.todayBackgroundColor,
          selectedDayBackgroundColor: COLORS.selectedDayBackgroundColor,
          dotColor: COLORS.dotColor,
          agendaTodayColor: COLORS.main,
        }}
        items={schedules}
        renderItem={renderItem}
        renderEmptyData={renderEmptyData}
      />

      <View className="absolute bottom-1 right-0 w-[100%] px-2">
        <CustomizeButton onPress={handleAddDate} title={STRINGS.addDate} />
      </View>
    </View>
  );
}

export default ScheduleScreen;
