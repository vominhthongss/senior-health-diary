import { View, Text, ScrollView, Image } from "react-native";
import * as STRINGS from "../../constants/strings";
import GeneralForm from "../../components/GeneralForm/GeneralForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchSicks, searchSicks, setSick } from "../../store/home/homeSlice";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as SCREENS_NAME from "../../constants/screensName";

function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleGoToSickDetail = (sick) => {
    dispatch(setSick({ sick: sick }));
    navigation.navigate(SCREENS_NAME.sickDetail);
  };
  const { sicks } = useSelector((state) => state.home);
  const handleSearch = (data) => {
    const { search } = data;
    if (search) {
      dispatch(searchSicks({ keyword: search }));
    } else {
      dispatch(fetchSicks());
    }
  };
  const fields = [
    {
      name: "search",
      placeholder: "Tìm kiếm bệnh",
      value: "",
      type: "text",
      label: "Tìm kiếm bệnh",
    },
  ];
  useEffect(() => {
    if (!sicks) {
      dispatch(fetchSicks());
    }
    console.log("sicks :", sicks);
  }, [sicks, dispatch]);
  return (
    <View className="bg-blue-200">
      <View className="flex flex-row justify-center">
        <View className="w-[90%]">
          <GeneralForm
            fields={fields}
            titleSubmitBtn={STRINGS.search}
            handleData={handleSearch}
          />
        </View>
      </View>
      <ScrollView className="bg-white h-full rounded-t-xl py-3 px-2 mx-1">
        <View className="rounded-t-xl space-y-2">
          {sicks && sicks.length ? (
            sicks?.map((sick, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => handleGoToSickDetail(sick)}
              >
                <View className="flex flex-row items-center space-x-3 bg-slate-200 p-1 rounded-md">
                  <Image
                    className="w-20 h-20 object-fill"
                    source={{
                      uri: sick.image
                        ? sick.image
                        : `https://via.placeholder.com/100x100.png?text=${sick?.name}`,
                    }}
                  />
                  <Text className="text-xl font-bold">{sick.name}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-red-500 text-center">{STRINGS.noData}</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
