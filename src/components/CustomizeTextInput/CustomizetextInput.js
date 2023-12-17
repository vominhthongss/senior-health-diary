import { TextInput, View } from "react-native";

function CustomizeTextInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) {
  return (
    <View className="w-full">
      <TextInput
        className="p-5 border rounded-md text-lg"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

export default CustomizeTextInput;
