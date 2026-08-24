import { NotificationType } from "@/types/types"
import { createStore } from "zustand/vanilla"

export type NotificationsState = {
  notifications: NotificationType[]
}

export type NotificationsActions = {
  push: (notification: NotificationType) => void
}

export type NotificationsStore = NotificationsState & NotificationsActions

export const defaultInitState: NotificationsState = {
  notifications: [],
}

export const createNotificationsStore = (
  initState: NotificationsState = defaultInitState
) => {
  return createStore<NotificationsStore>()((set) => ({
    ...initState,
    push: (notification: NotificationType) =>
      set((state) => {
        const notifs = state.notifications
        notifs.push(notification)
        return { notifications: notifs }
      }),
  }))
}
