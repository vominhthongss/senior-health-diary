import React, { useState } from "react";
import { TextInput, View, TouchableWithoutFeedback, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function CustomizeTextInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  numericInput,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    const formattedTime = time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setSelectedTime(time);
    hideTimePicker();
    onChangeText(formattedTime); // Sử dụng thời gian đã định dạng
  };
  return (
    <View className="w-full rounded-xl border p-3 bg-slate-200">
      <TextInput
        className="p-3 pr-6 h-11"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!isPasswordVisible && secureTextEntry}
        keyboardType={numericInput === "time" ? "default" : numericInput}
        onFocus={() => numericInput === "time" && showTimePicker()}
      />
      {numericInput === "time" && (
        <TouchableWithoutFeedback onPress={showTimePicker}>
          <View className="absolute top-5 right-3">
            <Icon size={20} name="bell" />
          </View>
        </TouchableWithoutFeedback>
      )}

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
}

export default CustomizeTextInput;
