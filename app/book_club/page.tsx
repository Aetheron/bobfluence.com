// import backgroundMobile from "@/public/book-club-gradient-mobile.svg"
import { SubmitButton } from "@/components/submit-button"
import background from "@/public/book-club-gradient.svg"
import { createClient } from "@/utils/supabase/server"
import { PostgrestError } from "@supabase/supabase-js"
import { Metadata } from "next"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { signInBookClubAction } from "../actions"

type currentBookType = {
  id: string
  theme_title: string
  title: string
  author: string
  cover_art: string
  schedule: JSON
  start_date: Date
  end_date: Date
}

export const metadata: Metadata = {
  title: "Book Club",
  description:
    "The official home of the UMHP Book Club. Get details on the current book and vote on the next book.",
}

export default async function bookClub() {
  const cookieStore = await cookies()
  const supabase = await createClient()

  const {
    data: { session },
    error: err,
  } = await supabase.auth.getSession()

  const {
    data,
    error,
  }: { data: currentBookType[] | null; error: PostgrestError | null } =
    await supabase.from("current_book").select("*").limit(1)

  const currentBook = data ? (data[0] ?? null) : null

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Image
        src={background}
        className="object-cover -z-10"
        priority
        fill
        sizes="100vw"
        alt=""
      />
      {session ? (
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-center sm:text-left text-4xl font-bold text-gray-900 dark:text-gray-200">
            {currentBook && currentBook.theme_title}
          </h1>
          <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
            <div className="px-4 py-5 sm:p-6">
              <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-8">
                <div className="">
                  {currentBook && (
                    <Image
                      src={currentBook && currentBook.cover_art}
                      alt="Book cover art"
                      width={200}
                      height={400}
                      loading="eager"
                      className="w-full sm:w-auto"
                    />
                  )}
                </div>
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 flex flex-col">
                  <div>
                    <h2 className="text-center sm:text-left text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
                      {currentBook && currentBook.title}
                    </h2>
                    <h3 className="text-center sm:text-left mt-3 text-2xl text-gray-700 dark:text-gray-500">
                      {currentBook && currentBook.author}
                    </h3>
                  </div>
                  <div className="text-center sm:text-left mt-8 sm:mt-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
                      Schedule
                    </h2>
                    <div>
                      <ol>
                        <li>Week 1: Ch. 1 - 9</li>
                        <li>Week 2: Ch. 10 - 17</li>
                        <li>Week 3: Ch. 18 - 26</li>
                        <li>Week 4: Ch. 27 - 37</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="col-span-2! mt-8 lg:mt-0">
                  <object
                    data="/Character_Sheet.pdf"
                    type="application/pdf"
                    width="100%"
                    height={600}
                  ></object>
                  {/* <iframe src="@/public/Character_Sheet.pdf" width={100} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 lg:min-w-100">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* <Image
              alt="Bobfluence"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
              width={24}
              height={24}
            /> */}
            <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-gray-200">
              Sign in to your account
            </h2>
            <p className="text-sm text-foreground text-center">
              Don&apos;t have an account?{" "}
              <Link
                className="text-foreground font-medium underline"
                href="/sign-up"
              >
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-120">
            <div className="bg-white/10 backdrop-blur-md px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <form action={signInBookClubAction} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900 dark:text-gray-300"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-maize-300 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-gray-900 dark:text-gray-300"
                    >
                      Password
                    </label>
                    <Link
                      className="text-xs text-foreground underline"
                      href="/forgot-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-slate-300 sm:text-sm/6"
                    />
                  </div>
                </div>
                <SubmitButton
                  className="w-full!"
                  pendingContent="Signing In..."
                >
                  Sign in
                </SubmitButton>
                {/* <FormMessage message={searchParams} /> */}
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
