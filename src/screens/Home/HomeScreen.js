import { View, Text, ScrollView } from "react-native";
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
        <View className="roundet-t-xl">
          {sicks?.map((sick, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => handleGoToSickDetail(sick)}
            >
              <Text>{sick.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
