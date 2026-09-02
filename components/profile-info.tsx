"use client"

import { updateEmailAction, updateProfileAction } from "@/app/actions"
import { useNotificationsStore } from "@/providers/notifications-store-provider"
import { NotificationStateType, NotificationType } from "@/types/types"
import { User } from "@supabase/supabase-js"
import { RefreshCw, UserRoundCheckIcon, UserRoundXIcon } from "lucide-react"
import { useActionState, useEffect } from "react"

export default function ProfileInfoForm({ user }: { user: User }) {
  const { push: pushNotification } = useNotificationsStore((state) => state)
  const [updateProfileState, updateProfile, updateProfilePending] =
    useActionState<NotificationStateType, FormData>(updateProfileAction, {
      title: "",
      message: "",
      status: null,
    })
  const [updateEmailState, updateEmail, updateEmailPending] = useActionState<
    NotificationStateType,
    FormData
  >(updateEmailAction, {
    title: "",
    message: "",
    status: null,
  })
  useEffect(() => {
    const notification: NotificationType = {
      id: Math.trunc(Math.random() * 1000000),
      title: updateProfileState.title,
      body: updateProfileState.message,
      icon: <></>,
    }
    if (updateProfileState.status == 1) {
      notification.icon = (
        <UserRoundCheckIcon
          aria-hidden="true"
          className="size-6 text-green-400"
        ></UserRoundCheckIcon>
      )
    } else if (updateProfileState.status == 0) {
      notification.icon = (
        <UserRoundXIcon
          aria-hidden="true"
          className="size-6 text-red-600"
        ></UserRoundXIcon>
      )
    } else {
      // If status is null, we haven't sent a request yet.
      // If status is not 0 or 1, well something really strange happened because that shouldn't be possible.
      return
    }
    pushNotification(notification)
  }, [updateProfileState])
  useEffect(() => {
    const notification: NotificationType = {
      id: Math.trunc(Math.random() * 1000000),
      title: updateEmailState.title,
      body: updateEmailState.message,
      icon: <></>,
    }
    if (updateEmailState.status == 1) {
      notification.icon = (
        <UserRoundCheckIcon
          aria-hidden="true"
          className="size-6 text-green-400"
        ></UserRoundCheckIcon>
      )
    } else if (updateEmailState.status == 0) {
      notification.icon = (
        <UserRoundXIcon
          aria-hidden="true"
          className="size-6 text-red-600"
        ></UserRoundXIcon>
      )
    } else {
      // If status is null, we haven't sent a request yet.
      // If status is not 0 or 1, well something really strange happened because that shouldn't be possible.
      return
    }
    pushNotification(notification)
  }, [updateEmailState])

  return (
    <>
      <div className="divide-y divide-gray-900/10 dark:divide-white/10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">
              Profile
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
              This information will be displayed to other logged-in users. It is
              not publicly visible.
            </p>
          </div>
          <form
            className="bg-white shadow-xs outline outline-gray-900/5 rounded-sm sm:rounded-xl md:col-span-2 dark:bg-gray-800/50 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
            action={updateProfile}
          >
            <div className="px-4 py-6 sm:p-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="cursor-pointer block text-sm/6 font-medium text-gray-900 dark:text-gray-300"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      id="first-name"
                      name="first_name"
                      type="text"
                      autoComplete="given-name"
                      defaultValue={user.user_metadata["first_name"]}
                      className="block w-full rounded-md bg-white dark:bg-slate-800 px-3 py-1.5 text-base text-gray-900 dark:text-gray-100 outline -outline-offset-1 outline-gray-300 dark:outline-slate-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-baltic-blue-400 focus:dark:bg-baltic-blue-700 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="cursor-pointer block text-sm/6 font-medium text-gray-900 dark:text-gray-300"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      id="last-name"
                      name="last_name"
                      type="text"
                      autoComplete="family-name"
                      defaultValue={user.user_metadata["last_name"]}
                      className="block w-full rounded-md bg-white dark:bg-slate-800 px-3 py-1.5 text-base text-gray-900 dark:text-gray-100 outline -outline-offset-1 outline-gray-300 dark:outline-slate-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-baltic-blue-400 focus:dark:bg-baltic-blue-700 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 dark:border-white/10">
              <button
                type="submit"
                className="flex justify-center cursor-pointer rounded-md bg-emerald-500 px-3 py-2 w-full sm:w-auto text-sm font-semibold text-gray-700 shadow-sm hover:bg-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                {updateProfilePending ? (
                  <RefreshCw className="w-5 h-5"></RefreshCw>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">
              Authentication
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
              Change your email address, password, and other sign in settings.
            </p>
          </div>

          <form
            className="bg-white shadow-xs outline outline-gray-900/5 rounded-sm sm:rounded-xl md:col-span-2 dark:bg-gray-800/50 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
            action={updateEmail}
          >
            <div className="px-4 py-6 sm:p-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="cursor-pointer block text-sm/6 font-medium text-gray-900 dark:text-gray-300"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md bg-white dark:bg-slate-800 px-3 py-1.5 text-base text-gray-900 dark:text-gray-100 outline -outline-offset-1 outline-gray-300 dark:outline-slate-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-baltic-blue-400 focus:dark:bg-baltic-blue-700 sm:text-sm/6 disabled:bg-gray-950 disabled:text-gray-600 disabled:outline-gray-800"
                      defaultValue={user.email}
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="password"
                    className="cursor-pointer block text-sm/6 font-medium text-gray-900 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      disabled
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md bg-white dark:bg-slate-800 px-3 py-1.5 text-base text-gray-900 dark:text-gray-100 outline -outline-offset-1 outline-gray-300 dark:outline-slate-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-baltic-blue-400 focus:dark:bg-baltic-blue-700 sm:text-sm/6 disabled:bg-gray-950/30 disabled:text-gray-600 disabled:outline-gray-800"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8 dark:border-white/10">
              <button
                type="submit"
                className="flex justify-center cursor-pointer rounded-md bg-emerald-500 px-3 py-2 w-full sm:w-auto text-sm font-semibold text-gray-700 shadow-sm hover:bg-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                {updateEmailPending ? (
                  <RefreshCw className="w-5 h-5"></RefreshCw>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
