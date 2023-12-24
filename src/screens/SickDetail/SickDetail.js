import { useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/userInformation/userInformationSlice";

function SickDetailScreen() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInformation);
  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [user, dispatch]);
  return <View></View>;
}

export default SickDetailScreen;
