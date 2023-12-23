import LoginScreen from "../screens/Login/LoginScreen";
import MainTabScreen from "../screens/MainTab/MainTabScreen";
import UserInformationScreen from "../screens/UserInformation/UserInformation";
import { screenChildOption, screenParentOption } from "../constants/options";
import * as SCREENS_NAME from "../constants/screensName";
import SignUpScreen from "../screens/SignUp/SignUpScreen";

export const mainTab = {
  name: SCREENS_NAME.mainTab,
  component: MainTabScreen,
  options: screenParentOption,
};
export const login = {
  name: SCREENS_NAME.login,
  component: LoginScreen,
  options: screenParentOption,
};
export const signUp = {
  name: SCREENS_NAME.signUp,
  component: SignUpScreen,
  options: screenParentOption,
};
export const userInformation = {
  name: SCREENS_NAME.userInformation,
  component: UserInformationScreen,
  options: screenChildOption,
};
