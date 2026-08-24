import { ReactElement } from "react"

export type NotificationType = {
  id: number
  title: string
  body: string
  icon: ReactElement
}

export type NotificationStateType = {
  title: string
  message: string
  status: number | null
}
