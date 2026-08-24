"use server"

import { createClient, createClientElevated } from "@/utils/supabase/server"
import { encodedRedirect } from "@/utils/utils"
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js"
import { UUID } from "crypto"
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

type stateType = {
  error: PostgrestError | null
}

export const submitBookSuggestionAction = async (
  previousState: stateType,
  formData: FormData
) => {
  const bookTitle = formData.get("bookTitle")
  const author = formData.get("author")
  const synopsis = formData.get("synopsis")
  const coverArt = formData.get("coverArt")
  const pages = formData.get("pages")

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { data, error } = await supabase.from("book_choices").insert({
    title: bookTitle,
    author: author,
    synopsis: synopsis,
    cover_art: coverArt,
    pages: pages,
    user_id: user?.id,
  })
  console.dir(data)
  console.dir(error)
  revalidatePath("/book_club")

  return { error: error }
}

export type bookChoiceType = {
  id: UUID
  title: string
  author: string
  synopsis: string
  coverArt: string
  pages: number
  user_id: UUID
  votes_cast: { count: number }[]
}

export const getBookChoicesAction = async () => {
  const superSupabase = await createClientElevated()
  const supabase = await createClient()

  const {
    data: books,
    error,
  }: { data: bookChoiceType[] | null; error: PostgrestError | null } =
    await supabase.from("book_choices").select(`
      id,
      title,
      author,
      synopsis,
      coverArt: cover_art,
      pages,
      user_id,
      votes_cast(count)
    `)
  if (error) {
    return { error: error }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { data: userVotes } = await supabase
    .from("votes_cast")
    .select()
    .eq("user_id", user?.id)

  const {
    data: { users },
  } = await superSupabase.auth.admin.listUsers()

  const booksWithUser = books?.map((book) => {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      synopsis: book.synopsis,
      coverArt: book.coverArt,
      pages: book.pages,
      user: users.find((u) => u.id == book.user_id)?.email,
      votes: book.votes_cast[0].count,
      userVoted: userVotes?.some((v) => v.book_id == book.id),
    }
  })

  return { books: booksWithUser, error: null }
}

export const voteForBookChoiceAction = async (bookId: UUID) => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  await supabase
    .from("votes_cast")
    .insert({ user_id: user?.id, book_id: bookId })

  // revalidatePath("/book_club")
}

export const removeVoteForBookChoiceAction = async (bookId: UUID) => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  await supabase
    .from("votes_cast")
    .delete()
    .eq("user_id", user?.id)
    .eq("book_id", bookId)

  // revalidatePath("/book_club")
}

export const getVotesForBook = async (bookId: UUID) => {
  const supabase = await createClient()
  const { count } = await supabase
    .from("votes_cast")
    .select("*", { count: "exact", head: true })
    .eq("book_id", bookId)

  return count || 0
}

export const startNewVotingRoundAction = async () => {
  const supabase = await createClient()
  await supabase.rpc("start_new_round_of_voting")

  revalidatePath("/book_club")
}
