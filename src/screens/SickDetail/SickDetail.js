import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/userInformation/userInformationSlice";
import { fetchSavedSicks } from "../../store/sickDetail/sickDetailSlice";
import CustomizeButton from "../../components/CustomizeButton/CustomizeButton";
import * as STRINGS from "../../constants/strings";
import Icon from "react-native-vector-icons/FontAwesome";

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
    <View className="flex flex-row justify-center relative">
      <View className="w-[90%]">
        <View className="flex flex-row items-center space-x-2 mt-2">
          <Icon size={30} name="heart" color={"red"} />
          <Text className="text-xl">{isSaved && STRINGS.saveSick}</Text>
        </View>
        <ScrollView className="h-full mt-5">
          <View>
            <Text className="text-xl font-bold uppercase">
              {STRINGS.sickName}
            </Text>
            <Text className="text-xl">{sick?.name}</Text>
          </View>
          <View>
            <Text className="text-xl font-bold uppercase">
              {STRINGS.sickReason}
            </Text>
            <Text className="text-xl">{sick?.name}</Text>
          </View>
          <View>
            <Text className="text-xl font-bold uppercase">
              {STRINGS.sickSimptom}
            </Text>
            <Text className="text-xl">{sick?.name}</Text>
          </View>
          <View>
            <Text className="text-xl font-bold uppercase">
              {STRINGS.sickRevention}
            </Text>
            <Text className="text-xl">{sick?.name}</Text>
          </View>
        </ScrollView>
        <View className="absolute bottom-20 w-full">
          <CustomizeButton title={STRINGS.savesickBtn} />
        </View>
      </View>
    </View>
  );
}

export default SickDetailScreen;
