"use client"

import { getBookChoicesAction } from "@/app/actions"
import { bookSuggestionType } from "@/app/book_club/page"
import { createClient } from "@/utils/supabase/client"
import { BookDashedIcon } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import BookSynopsis from "./book-synopsis"
import NewRoundButton from "./new-round-button"
import VoteButton from "./vote-button"

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
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
    subscribe()
  }, [supabase])

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
              <li key={book.id} className="py-5">
                <div className="flex items-center justify-between gap-x-6">
                  <div className="flex min-w-0 gap-x-4">
                    <Image
                      alt=""
                      src={book.coverArt}
                      width={48}
                      height={100}
                      className="w-12 h-fit flex-none rounded-sm bg-gray-50 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10"
                    />
                    <div className="min-w-0">
                      <p className="text-sm/6 font-semibold text-white">
                        {book.title}
                      </p>
                      <p className="mt-1 truncate text-xs/5 text-gray-400">
                        {book.author}
                      </p>
                      <p className="text-xs/5 font-semibold text-gray-400">
                        Submitted by {book.user?.split("@")[0]}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <b>{book.votes}</b>
                    <VoteButton bookId={book.id} unvote={book.userVoted} />
                  </div>
                </div>
                <BookSynopsis>{book.synopsis}</BookSynopsis>
              </li>
            ))}
          </ul>
          <NewRoundButton />
        </div>
      )}
    </>
  )
}
