"use client"

import { useNotificationsStore } from "@/providers/notifications-store-provider"
import Notification from "./notification"

export default function Notifications() {
  const { notifications } = useNotificationsStore((state) => state)

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 z-20 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-start sm:absolute sm:bottom-5">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          {notifications
            ? notifications.map((notification) => (
                <Notification
                  key={notification.id}
                  title={notification.title}
                  body={notification.body}
                  icon={notification.icon}
                ></Notification>
              ))
            : ""}
        </div>
      </div>
    </>
  )
}
