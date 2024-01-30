// DiaryModal.js
import React from "react";
import { Modal, View, Text } from "react-native";
import GeneralForm from "../../components/GeneralForm/GeneralForm";
import CustomizeButton from "../../components/CustomizeButton/CustomizeButton";
import * as STRINGS from "../../constants/strings";

const DiaryModal = ({ visible, onSave, onClose, fields }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View className="flex-1 bg-gray-400/30 justify-center content-center items-center">
        <View className="bg-white p-4 rounded-lg w-[90%]">
          <Text className="text-center text-lg font-bold mb-4">
            {STRINGS.addDiary}
          </Text>
          <GeneralForm
            fields={fields}
            titleSubmitBtn={STRINGS.save}
            handleData={onSave}
          />
          <CustomizeButton onPress={onClose} title={STRINGS.close} />
        </View>
      </View>
    </Modal>
  );
};

export default DiaryModal;
