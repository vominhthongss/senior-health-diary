import { useEffect } from "react";
import * as Notifications from "expo-notifications";

export function useSetReminders(schedules) {
  useEffect(() => {
    schedules.forEach((schedule) => {
      const { time, text } = schedule;
      const [hours, minutes] = time.split(":");

      const schedulingOptions = {
        hour: Number(hours),
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
    });
  }, [schedules]);
}
