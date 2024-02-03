import { useEffect } from "react";
import * as Notifications from "expo-notifications";

export function useSetReminders({ value }) {
  useEffect(() => {
    if (!value) return; // Check if value is defined

    Object.keys(value).forEach((key) => {
      value[key].forEach((schedule) => {
        const { time, text } = schedule;
        const [hours, minutesCon] = time.split(":");
        const [minutes, m] = minutesCon.split("PM" || "AM");

        const schedulingOptions = {
          hour: Number(
            minutesCon.includes("PM") ? parseInt(hours) + 12 : hours
          ),
          minute: Number(minutes),
          repeats: true,
        };

        Notifications.scheduleNotificationAsync({
          content: {
            title: "Báo nhắc",
            body: text,
          },
          trigger: schedulingOptions,
        });
        console.log("schedulingOptions :", schedulingOptions);
      });
    });
  }, [value]);
}
