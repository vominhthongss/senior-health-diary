import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as STRINGS from "../constants/strings";
import { Alert } from "react-native";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("status code :", response.status);
    return response;
  },
  (error) => {
    console.log("error :", error);
    Alert.alert(STRINGS.alertName, STRINGS.errorResponse);
    return Promise.reject(error);
  }
);

export default api;
