import { Text } from "react-native";
import { screenBottomOption } from "../constants/options";
import * as SCREENS_NAME from "../constants/screensName";
import * as STRINGS from "../constants/strings";
import AccountScreen from "../screens/Account/Account";
import HomeScreen from "../screens/Home/HomeScreen";

export const home = {
  index: 1,
  name: SCREENS_NAME.home,
  component: HomeScreen,
  options: {
    ...screenBottomOption,
    headerTitle: () => <Text>{STRINGS.home}</Text>,
  },
};
export const account = {
  index: 2,
  name: SCREENS_NAME.account,
  component: AccountScreen,
  options: {
    ...screenBottomOption,
    headerTitle: () => <Text>{STRINGS.account}</Text>,
  },
};
