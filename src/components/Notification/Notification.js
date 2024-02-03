import { useEffect } from "react";
import * as Notifications from "expo-notifications";

export function useSetReminders({ value }) {
  const scheduleNoti = async () => {
    if (!value) return; // Check if value is defined

    // Lấy Expo Push Token
    const expoPushToken = await registerForPushNotificationsAsync();
    console.log("Expo Push Token:", expoPushToken);

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

        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Báo nhắc",
            body: "text",
          },
          // trigger: schedulingOptions,
          trigger: {
            seconds: 10, // Hẹn giờ sau 10 giây
          },
        });
        console.log("Scheduled notification with options:", schedulingOptions);
      });
    });
  };

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    return () => subscription.remove();
  }, [value]);

  // Gọi hàm scheduleNoti để lên lịch thông báo
  scheduleNoti();
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
