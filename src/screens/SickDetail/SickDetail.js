import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/userInformation/userInformationSlice";
import { fetchSavedSicks } from "../../store/sickDetail/sickDetailSlice";
import CustomizeButton from "../../components/CustomizeButton/CustomizeButton";

function SickDetailScreen() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInformation);
  const { sick } = useSelector((state) => state.home);
  const { savedSicks } = useSelector((state) => state.sickDetail);
  const isSaved = () => {
    return savedSicks.some(
      (x) => x.usersId === user.id && x.sicksId === sick.id
    );
  };
  useEffect(() => {
    if (!user || !savedSicks) {
      dispatch(fetchUser());
      dispatch(fetchSavedSicks());
    }
  }, [user, savedSicks, dispatch]);
  return (
    <View className="flex flex-row justify-center">
      <View className="w-[90%]">
        <Text>{isSaved && "save"}</Text>
        <ScrollView className="h-full">
          <Text>{sick.name}</Text>
        </ScrollView>
        <View className="absolute bottom-14 w-full">
          <CustomizeButton title={"Lưu thông tin bệnh này"} />
        </View>
      </View>
    </View>
  );
}

export default SickDetailScreen;
