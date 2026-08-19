"use client"

import { getBookChoicesAction } from "@/app/actions"
import { bookSuggestionType } from "@/app/book_club/page"
import { createClient } from "@/utils/supabase/client"
import { BookDashedIcon } from "lucide-react"
import { useEffect, useState } from "react"
import BookEntry from "./book-entry"
import NewRoundButton from "./new-round-button"

export default function SuggestedBooks({
  initialBookSuggestions,
}: {
  initialBookSuggestions: bookSuggestionType
}) {
  const supabase = createClient()
  const [bookSuggestions, setBookSuggestions] = useState(initialBookSuggestions)

  useEffect(() => {
    const subscribe = async () => {
      const channel = supabase
        .channel("public:book_choices")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "book_choices",
          },
          (payload) => {
            getBookChoicesAction().then((updated) =>
              setBookSuggestions(updated)
            )
          }
        )
        .subscribe((status, error) =>
          !error
            ? console.log(
                "Subscribed to book_choices channel with status: ",
                status
              )
            : console.error(
                "Error subscribing to book_choices channel: ",
                error
              )
        )

      return () => {
        supabase.removeChannel(channel)
        console.log("Unsubscribed from book_choices channel")
      }
    }
    subscribe()
  }, [supabase, bookSuggestions, setBookSuggestions])

  return (
    <>
      {bookSuggestions.error ||
      bookSuggestions.books == undefined ||
      bookSuggestions.books?.length == 0 ? (
        <div className="text-center">
          <BookDashedIcon className="size-12 mx-auto" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
            No books yet
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Be the first to submit a book suggestion
          </p>
        </div>
      ) : (
        <div>
          <ul
            role="list"
            className="divide-y divide-gray-100 dark:divide-white/5"
          >
            {bookSuggestions.books.map((book) => (
              <BookEntry key={book.id} initialBook={book} />
            ))}
          </ul>
          <NewRoundButton />
        </div>
      )}
    </>
  )
}
