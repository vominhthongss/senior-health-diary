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
import _ from "lodash";
import { fetchSchedule } from "../../store/schedule/scheduleSlice";
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
  const [remindText, setRemindText] = useState("text");
  const [diaryText, setDiaryText] = useState("text");

  const [modalRemindVisible, setModalRemindVisible] = useState(false);
  const [modalDiaryVisible, setModalDiaryVisible] = useState(false);
  const [inputData, setInputData] = useState("");

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
      name: "content",
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
      status: 0,
    },
    {
      name: "symptoms",
      placeholder: "Triệu chứng",
      value: "",
      type: "text",
      label: "Triệu chứng",
      isRequired: true,
      status: 0,
    },
    {
      name: "description",
      placeholder: "Mô tả",
      value: "",
      type: "text",
      label: "Mô tả",
      isRequired: true,
      status: 0,
    },
    {
      name: "date",
      placeholder: "Ngày",
      value: "",
      type: "text",
      label: "Ngày",
      isRequired: true,
    },
  ];
  const handleSaveData = (data) => {
    // Xử lý logic khi nhận dữ liệu từ modal
    setInputData(data);
  };

  const handleAddRemind = () => {
    setModalRemindVisible(true);
    if (!dataSelected || !remindText) {
      setModalRemindVisible(true);
      return;
    }
    // trường hợp là "remind"
    // dispatch(
    //   updateSchedule({
    //     date: dataSelected,
    //     schedule: { type: "remind", time: "12:00", text: remindText },
    //   })
    // );
    // trường hợp là "diary"›
    // dispatch(
    //   updateSchedule({
    //     date: dataSelected,
    //     schedule: {
    //       type: "diary",
    //       sick: "Mỏi",
    //       symptoms: "Đau chân",
    //       description: "Mỏi",
    //       date: dataSelected,
    //     },
    //   })
    // );
  };
  const handleAddDiary = () => {
    setModalDiaryVisible(true);
    if (!dataSelected || !diaryText) {
      setModalDiaryVisible(true);
      return;
    }
    // trường hợp là "remind"
    // dispatch(
    //   updateSchedule({
    //     date: dataSelected,
    //     schedule: { type: "remind", time: "12:00", text: remindText },
    //   })
    // );
    // trường hợp là "diary"›
    // dispatch(
    //   updateSchedule({
    //     date: dataSelected,
    //     schedule: {
    //       type: "diary",
    //       sick: "Mỏi",
    //       symptoms: "Đau chân",
    //       description: "Mỏi",
    //       date: dataSelected,
    //     },
    //   })
    // );
  };
  const handleDayPress = _.debounce(
    (value) => setDateSelected(value.dateString),
    100
  );

  const handleFormSubmit = (values) => {
    console.log("Form Data in Parent Component:", values);
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
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            // Handle any additional actions when the modal is closed
          }}
        >
          <View className="flex-1 justify-center content-center items-center">
            <View className="bg-white p-4 rounded-lg w-80">
              <TouchableOpacity
                className="absolute top-2 right-2"
                onPress={() => setModalRemindVisible(!modalRemindVisible)}
              >
                <Text>X</Text>
              </TouchableOpacity>
              <Text className="text-center text-lg font-bold mb-4">
                Thêm nhắc nhở
              </Text>
              <GeneralForm
                fields={fields}
                titleSubmitBtn={STRINGS.addRemind}
                handleData={handleFormSubmit}
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
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalDiaryVisible(!modalDiaryVisible);
          }}
        >
          <View className="flex-1 justify-center content-center items-center">
            <View className="bg-white p-4 rounded-lg w-80">
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                }}
                onPress={() => setModalDiaryVisible(!modalDiaryVisible)}
              >
                <Text>X</Text>
              </TouchableOpacity>
              <Text className="text-center text-lg font-bold mb-4">
                Thêm nhật ký
              </Text>
              <GeneralForm
                fields={fieldDiary.map((field) =>
                  field.name === "date"
                    ? { ...field, value: dataSelected }
                    : field
                )}
                titleSubmitBtn={STRINGS.addDiary}
                handleData={handleFormSubmit}
              ></GeneralForm>
            </View>
          </View>
        </Modal>
      </View>

      <View className="flex justify-between flex-row w-full">
        <CustomizeButton onPress={handleAddRemind} title={STRINGS.addRemind} />
        <CustomizeButton onPress={handleAddDiary} title={STRINGS.addDiary} />
      </View>
    </View>
  );
}

export default ScheduleScreen;
