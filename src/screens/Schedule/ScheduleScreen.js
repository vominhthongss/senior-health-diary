import React, { useEffect, useState } from "react";
import { View, Text, Alert, Modal, TouchableOpacity } from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import * as COLORS from "../../constants/colors";
import * as STRINGS from "../../constants/strings";
import { localeConfig } from "../../constants/localeConfig";
import { ScrollView } from "react-native-gesture-handler";
import CustomizeButton from "../../components/CustomizeButton/CustomizeButton";
import ShareButton from "../../ShareButton/ShareButton";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import _ from "lodash";
import {
  fetchSchedule,
  updateSchedule,
} from "../../store/schedule/scheduleSlice";
import GeneralForm from "../../components/GeneralForm/GeneralForm";

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

  const [modalRemindVisible, setModalRemindVisible] = useState(false);
  const [modalDiaryVisible, setModalDiaryVisible] = useState(false);

  const fields = [
    {
      name: "time",
      placeholder: "Thời gian",
      value: "",
      type: "text",
      label: "Thời gian",
      isRequired: true,
    },
    {
      name: "text",
      placeholder: "Nội dung",
      value: "",
      type: "text",
      label: "Nội dung",
      isRequired: true,
    },
  ];

  const fieldDiary = [
    {
      name: "sick",
      placeholder: "Tên bệnh",
      value: "",
      type: "text",
      label: "Tên bệnh",
      isRequired: true,
    },
    {
      name: "symptoms",
      placeholder: "Triệu chứng",
      value: "",
      type: "text",
      label: "Triệu chứng",
      isRequired: true,
    },
    {
      name: "description",
      placeholder: "Mô tả",
      value: "",
      type: "text",
      label: "Mô tả",
      isRequired: true,
    },
  ];

  const handleDayPress = _.debounce(
    (value) => setDateSelected(value.dateString),
    100
  );

  const handleAddRemind = (values) => {
    dispatch(
      updateSchedule({
        date: dataSelected,
        schedule: { type: "remind", time: values?.time, text: values?.text },
      })
    );
    setModalRemindVisible(false);
  };
  const handleAddDiary = (values) => {
    dispatch(
      updateSchedule({
        date: dataSelected,
        schedule: {
          type: "diary",
          sick: values?.sick,
          symptoms: values?.symptoms,
          description: values?.description,
          date: dataSelected,
        },
      })
    );
    setModalDiaryVisible(false);
  };

  return (
    <View className="flex-1">
      <Agenda
        onDayPress={handleDayPress}
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

      <View className="absolute bottom-1 right-0 w-[100%] px-2 ">
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalRemindVisible}
        >
          <View className="flex-1 bg-gray-400/30 justify-center content-center items-center">
            <View className="bg-white p-4 rounded-lg w-[90%]">
              <Text className="text-center text-lg font-bold mb-4">
                {STRINGS.addRemind}
              </Text>
              <GeneralForm
                fields={fields}
                titleSubmitBtn={STRINGS.save}
                handleData={handleAddRemind}
              />
              <CustomizeButton
                onPress={() => setModalRemindVisible(false)}
                title={STRINGS.close}
              />
            </View>
          </View>
        </Modal>
      </View>
      <View className="absolute bottom-1 right-0 w-[100%] px-2 ">
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalDiaryVisible}
        >
          <View className="flex-1 bg-gray-400/30 justify-center content-center items-center">
            <View className="bg-white p-4 rounded-lg w-[90%]">
              <Text className="text-center text-lg font-bold mb-4">
                {STRINGS.addDiary}
              </Text>
              <GeneralForm
                fields={fieldDiary.map((field) =>
                  field.name === "date"
                    ? { ...field, value: dataSelected }
                    : field
                )}
                titleSubmitBtn={STRINGS.save}
                handleData={handleAddDiary}
              ></GeneralForm>
              <CustomizeButton
                onPress={() => setModalDiaryVisible(false)}
                title={STRINGS.close}
              />
            </View>
          </View>
        </Modal>
      </View>

      <View className="mb-2 px-2">
        <CustomizeButton
          onPress={() => setModalRemindVisible(true)}
          title={STRINGS.addRemind}
        />
      </View>
      <View className="px-2">
        <CustomizeButton
          onPress={() => setModalDiaryVisible(true)}
          title={STRINGS.addDiary}
        />
      </View>
    </View>
  );
}

export default ScheduleScreen;
