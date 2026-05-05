import { createClient } from "@/utils/supabase/server"
import { PostgrestError } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import Image from "next/image"

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
  console.dir(error)
  console.dir(data)

  const currentBook = data ? (data[0] ?? null) : null

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      {session && (
        <div>
          <h1 className="text-center sm:text-left text-4xl font-bold text-gray-900 dark:text-gray-200">
            {currentBook && currentBook.theme_title}
          </h1>
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <div className="mt-8">
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
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
                {currentBook && currentBook.title}
              </h2>
              <h3 className="mt-3 text-2xl text-gray-700 dark:text-gray-500">
                {currentBook && currentBook.author}
              </h3>
            </div>
          </div>
          <div className="text-center sm:text-left mt-8">
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
      )}
    </main>
  )
}
