import { Button, View } from "react-native";
import * as COLORS from "../../constants/colors";

function CustomizeButton({ title, onPress }) {
  return (
    <View
      style={{
        backgroundColor: COLORS.main,
      }}
      className="w-full rounded-md"
    >
      <Button color={"white"} title={title} onPress={onPress} />
    </View>
  );
}

export default CustomizeButton;
