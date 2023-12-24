import { Text } from "react-native";
import { screenBottomOption } from "../constants/options";
import * as SCREENS_NAME from "../constants/screensName";
import * as STRINGS from "../constants/strings";
import AccountScreen from "../screens/Account/AccountScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ScheduleScreen from "../screens/Schedule/ScheduleScreen";
import DiaryScreen from "../screens/Diary/DiaryScreen";
import Icon from "react-native-vector-icons/FontAwesome";

export const home = {
  index: 1,
  name: SCREENS_NAME.home,
  component: HomeScreen,
  options: {
    ...screenBottomOption,
    headerTitle: () => <Text>{STRINGS.home}</Text>,
    tabBarIcon: ({ color, size }) => (
      <Icon name="home" size={size} color={color} />
    ),
  },
};

export const schedule = {
  index: 2,
  name: SCREENS_NAME.schedule,
  component: ScheduleScreen,
  options: {
    ...screenBottomOption,
    headerTitle: () => <Text>{STRINGS.schedule}</Text>,
    tabBarIcon: ({ color, size }) => (
      <Icon name="table" size={size} color={color} />
    ),
  },
};
// export const diary = {
//   index: 3,
//   name: SCREENS_NAME.diary,
//   component: DiaryScreen,
//   options: {
//     ...screenBottomOption,
//     headerTitle: () => <Text>{STRINGS.diary}</Text>,
//     tabBarIcon: ({ color, size }) => (
//       <Icon name="bell" size={size} color={color} />
//     ),
//   },
// };

export const account = {
  index: 3,
  name: SCREENS_NAME.account,
  component: AccountScreen,
  options: {
    ...screenBottomOption,
    headerTitle: () => <Text>{STRINGS.account}</Text>,
    tabBarIcon: ({ color, size }) => (
      <Icon name="user" size={size} color={color} />
    ),
  },
};
