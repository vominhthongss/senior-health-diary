import { View } from "react-native";
import * as COLORS from "../constants/colors";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as STRINGS from "../constants/strings";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
function ShareButton({ symptoms, description, date }) {
  const shareHealthLog = async () => {
    try {
      const pdfContent = `Triệu chứng: ${symptoms}\nMô tả chi tiết:${description}\nNgày: ${date}`;
      const path = `${FileSystem.documentDirectory}HealthyLog.pdf`;
      await FileSystem.writeAsStringAsync(path, pdfContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      await Sharing.shareAsync(path, {
        mimeType: "application/pdf",
        dialogTitle: STRINGS.share_health_log,
      });
    } catch (error) {
      console.error("Error sharing health log:", error.message);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={shareHealthLog}>
        <Icon name="share" size={20} color={COLORS.main} />
      </TouchableOpacity>
    </View>
  );
}

export default ShareButton;
