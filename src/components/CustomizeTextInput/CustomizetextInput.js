import { TextInput, View } from "react-native";

function CustomizeTextInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) {
  return (
    <View className="w-full border rounded-lg bg-slate-100">
      <TextInput
        className="px-5 border-none text-lg h-20 -mt-2"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

export default CustomizeTextInput;
