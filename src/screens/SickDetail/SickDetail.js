import { useEffect } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/userInformation/userInformationSlice";
import {
  fetchSavedSicks,
  resetState,
  saveSavedSicks,
  unSaveSavedSicks,
} from "../../store/sickDetail/sickDetailSlice";
import CustomizeButton from "../../components/CustomizeButton/CustomizeButton";
import * as STRINGS from "../../constants/strings";
import Icon from "react-native-vector-icons/FontAwesome";
import { SUCCEEDED } from "../../constants/store";
import ShareButton from "../../ShareButton/ShareButton";

function SickDetailScreen() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInformation);
  const { sick } = useSelector((state) => state.home);
  const { savedSicks, state } = useSelector((state) => state.sickDetail);
  const isSaved = () => {
    return savedSicks?.some(
      (x) =>
        x.usersId.toString() === user?.id.toString() &&
        x.sicksId.toString() === sick?.id.toString()
    );
  };
  const handleSave = () => {
    dispatch(saveSavedSicks({ usersId: user.id, sicksId: sick.id }));
  };
  const handleUnSave = () => {
    const obj = savedSicks.find(
      (x) =>
        x.usersId.toString() === user?.id.toString() &&
        x.sicksId.toString() === sick?.id.toString()
    );
    dispatch(
      unSaveSavedSicks({ id: obj?.id, usersId: user.id, sicksId: sick.id })
    );
  };
  useEffect(() => {
    // if (!user || !savedSicks) {
    //   dispatch(fetchUser());
    //   dispatch(fetchSavedSicks());
    // }
    // if (state === SUCCEEDED) {
    //   Alert.alert(
    //     STRINGS.alertName,
    //     STRINGS.alerUpdate,
    //     [
    //       {
    //         text: "OK",
    //         onPress: () => {
    //           dispatch(resetState());
    //         },
    //       },
    //     ],
    //     { cancelable: false }
    //   );
    // }
  }, [user, sick, savedSicks, state, isSaved, dispatch]);
  return (
    <View className="flex flex-row justify-center ">
      <View className="w-[90%] ">
        {isSaved() ? (
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center space-x-2 mt-2">
              <Icon size={30} name="heart" color={"red"} />
              <Text className="text-xl">{STRINGS.saveSick}</Text>
            </View>
            <ShareButton
              name={sick?.name}
              reason={sick?.reason}
              simpton={sick?.simpton}
              description={sick?.description}
              revention={sick?.revention}
            />
          </View>
        ) : (
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center space-x-2 mt-2">
              <Icon size={30} name="heart" color={"black"} />
              <Text className="text-xl">{STRINGS.unSaveSick}</Text>
            </View>
            <ShareButton
              name={sick?.name}
              reason={sick?.reason}
              simpton={sick?.simpton}
              description={sick?.description}
              revention={sick?.revention}
            />
          </View>
        )}

        <ScrollView className="h-full mt-5">
          <View>
            <Text className="text-xl font-bold uppercase">
              {STRINGS.sickName}
            </Text>
            <Text className="text-xl text-blue-800 font-bold mb-3">
              {sick?.name}
            </Text>
          </View>
          <View className="flex flex-row justify-center">
            <Image
              className="w-96 h-96 object-fill"
              source={{ uri: sick?.thumb }}
            />
          </View>
          <View>
            <Text className="text-xl font-bold uppercase">
              {STRINGS.sickReason}
            </Text>
            <Text className="text-xl">{sick?.description}</Text>
          </View>
          <View>
            <Text className="text-xl font-bold uppercase">
              {STRINGS.sickSimptom}
            </Text>
            <Text className="text-xl">{sick?.description}</Text>
          </View>
          <View>
            <Text className="text-xl font-bold uppercase">
              {STRINGS.sickRevention}
            </Text>
            <Text className="text-xl">{sick?.description}</Text>
          </View>
        </ScrollView>
        <View className="absolute bottom-20 w-full">
          {!isSaved() ? (
            <CustomizeButton onPress={handleSave} title={STRINGS.savesickBtn} />
          ) : (
            <CustomizeButton
              onPress={handleUnSave}
              title={STRINGS.unSavesickBtn}
            />
          )}
        </View>
      </View>
    </View>
  );
}

export default SickDetailScreen;
