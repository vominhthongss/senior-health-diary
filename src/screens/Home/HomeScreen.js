import { View, Text, ScrollView, Image } from "react-native";
import * as STRINGS from "../../constants/strings";
import GeneralForm from "../../components/GeneralForm/GeneralForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  searchCategories,
  updateCategories,
} from "../../store/home/homeSlice";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as SCREENS_NAME from "../../constants/screensName";
import { FlatGrid } from "react-native-super-grid";
import Loading from "../../components/Loading/Loading";

function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleGoToSickList = () => {
    navigation.navigate(SCREENS_NAME.sickList);
  };
  const { categories } = useSelector((state) => state.home);
  const handleSearch = (data) => {
    const { search } = data;
    if (search) {
      const filteredCategories = categories.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      dispatch(updateCategories(filteredCategories));
    } else {
      dispatch(fetchCategories());
    }
  };
  const fields = [
    {
      name: "search",
      placeholder: "Tìm kiếm danh mục bệnh",
      value: "",
      type: "text",
      label: "Tìm kiếm danh mục bệnh",
    },
  ];
  useEffect(() => {
    if (!categories) {
      dispatch(fetchCategories());
    }
  }, [categories, dispatch]);
  return (
    <View className="bg-blue-200 h-full">
      <View className="flex flex-row justify-center">
        <View className="w-[90%]">
          <GeneralForm
            fields={fields}
            titleSubmitBtn={STRINGS.search}
            handleData={handleSearch}
            isVertical={true}
          />
        </View>
      </View>
      <Text className="font-bold text-green-800 uppercase text-center text-xl my-2">
        {STRINGS.categoryName}
      </Text>

      <ScrollView className="bg-white h-full rounded-t-xl py-3 px-2 mx-1">
        <FlatGrid
          itemDimension={130}
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleGoToSickList()}>
              <View className="flex flex-col items-center space-x-3  p-1 rounded-md">
                <View className="bg-slate-200 rounded-lg w-full py-2 flex justify-center flex-row">
                  <Image
                    className="w-20 h-20 object-fill rounded-md"
                    source={{
                      uri: item.image
                        ? item.image
                        : `https://via.placeholder.com/100x100.png?text=${item?.name}`,
                    }}
                  />
                </View>
                <Text className="text-md font-bold uppercase mt-2">
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        {!categories && <Loading />}
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
