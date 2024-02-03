import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";

export function useSetReminders({ value }) {
  const isMounted = useRef(false);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    return () => subscription.remove();
  }, [value]);

  useEffect(() => {
    const scheduleNoti = async () => {
      if (!value) return;

      const expoPushToken = await registerForPushNotificationsAsync();

      Object.keys(value).forEach((key) => {
        value[key].forEach(async (schedule) => {
          const { time, text } = schedule;
          const [hours, minutesCon] = time.split(":");
          const [minutes, m] = minutesCon.split("PM" || "AM");

          const schedulingOptions = {
            hour: Number(
              minutesCon.includes("PM") ? parseInt(hours) + 12 : hours
            ),
            minute: Number(minutes),
            repeats: false,
          };
          console.log("schedulingOptions :", schedulingOptions);
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Báo nhắc",
              body: text,
            },
            trigger: schedulingOptions,
          });
        });
      });
    };

    if (isMounted.current) {
      scheduleNoti();
    } else {
      isMounted.current = true;
    }
  }, [value]);

  return null; // Hoặc trả về JSX tương ứng với component của bạn
}

async function registerForPushNotificationsAsync() {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }

  // Lấy Expo Push Token
  token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}
