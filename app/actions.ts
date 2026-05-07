"use server"

import { createClient } from "@/utils/supabase/server"
import { encodedRedirect } from "@/utils/utils"
import { SupabaseClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

// const cookieStore = await cookies()

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString()
  const password = formData.get("password")?.toString()
  const supabase: SupabaseClient = await createClient()
  const origin = (await headers()).get("origin")

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required"
    )
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error(error.code + " " + error.message)
    return encodedRedirect("error", "/sign-up", error.message)
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    )
  }
}

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase: SupabaseClient = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message)
  }

  // revalidatePath("/")
  return redirect("/account")
}

export const signInBookClubAction = async (formData: FormData) => {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase: SupabaseClient = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message)
  }

  revalidatePath("/book_club")
  // return redirect("/account")
}

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString()
  const supabase: SupabaseClient = await createClient()
  const origin = (await headers()).get("origin")
  const callbackUrl = formData.get("callbackUrl")?.toString()

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required")
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/account/reset-password`,
  })

  if (error) {
    console.error(error.message)
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    )
  }

  if (callbackUrl) {
    return redirect(callbackUrl)
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  )
}

export const resetPasswordAction = async (formData: FormData) => {
  const supabase: SupabaseClient = await createClient()

  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/account/reset-password",
      "Password and confirm password are required"
    )
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/account/reset-password",
      "Passwords do not match"
    )
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) {
    encodedRedirect(
      "error",
      "/account/reset-password",
      "Password update failed"
    )
  }

  encodedRedirect("success", "/account/reset-password", "Password updated")
}

export const changePasswordAction = async <NotificationStateType>(
  previousState: NotificationStateType,
  formData: FormData
) => {
  const supabase: SupabaseClient = await createClient()

  const password = formData.get("new_password") as string
  const confirmPassword = formData.get("confirm_password") as string

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/account",
      "Current password, new password, and confirm password are required"
    )
  }

  if (password !== confirmPassword) {
    encodedRedirect("error", "/account", "Passwords do not match")
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) {
    return {
      title: error.name,
      message: error.message,
      status: 0,
    }
  }

  revalidatePath("/account")

  return {
    title: "Password updated",
    message: "Your password has been updated successfully.",
    status: 1,
  }
}

export const signOutAction = async () => {
  const supabase: SupabaseClient = await createClient()
  await supabase.auth.signOut()
  return redirect("/sign-in")
}

export const updateProfileAction = async <NotificationStateType>(
  previousState: NotificationStateType,
  formData: FormData
) => {
  const supabase: SupabaseClient = await createClient()

  const { error } = await supabase.auth.updateUser({
    data: {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      timezone: formData.get("timezone"),
    },
  })

  if (error) {
    return {
      title: error.name,
      message: error.message,
      status: 0,
    }
  }

  return {
    title: "Profile updated",
    message: "Your profile has been updated successfully.",
    status: 1,
  }
}
