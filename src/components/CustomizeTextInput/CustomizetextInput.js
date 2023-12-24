import React, { useState } from "react";
import { TextInput, View, TouchableWithoutFeedback, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
function CustomizeTextInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  numericInput,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View className="w-full rounded-xl border p-3 bg-slate-200">
      <TextInput
        className="p-3 pr-6 h-11"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!isPasswordVisible && secureTextEntry}
        keyboardType={numericInput ? "numeric" : "default"}
      />
      {secureTextEntry && (
        <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
          <View className="absolute top-5 right-3">
            {isPasswordVisible ? (
              <Icon size={20} name="eye-slash" />
            ) : (
              <Icon size={20} name="eye" />
            )}
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

export default CustomizeTextInput;
