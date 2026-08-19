"use client"

import { getVotesForBook } from "@/app/actions"
import { bookType } from "@/app/book_club/page"
import { createClient } from "@/utils/supabase/client"
import Image from "next/image"
import { useEffect, useState } from "react"
import BookSynopsis from "./book-synopsis"
import VoteButton from "./vote-button"

export default function BookEntry({ initialBook }: { initialBook: bookType }) {
  const supabase = createClient()
  const [book, setBook] = useState(initialBook)
  const [votes, setVotes] = useState(initialBook.votes)

  useEffect(() => {
    const subscribe = async () => {
      const insertChannel = supabase.channel(
        `public:votes_cast:insert:${book.id}`
      )

      if (
        insertChannel.state !== "joined" &&
        insertChannel.state !== "joining"
      ) {
        insertChannel
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "votes_cast",
              filter: `book_id=eq.${book.id}`,
            },
            (payload) => {
              console.log(payload)

              // const updated = { ...book }
              // updated.votes++
              // setBook(updated)
              getVotesForBook(book.id).then((count) => setVotes(count))
              // setVotes(votes + 1)
            }
          )
          .subscribe((status, error) =>
            !error
              ? console.log(
                  `Subscribed to votes_cast:insert:${book.id} channel with status: `,
                  status
                )
              : console.error(
                  `Error subscribing to votes_cast:insert:${book.id} channel: `,
                  error
                )
          )
      }

      const deleteChannel = supabase.channel(
        `public:votes_cast:delete:${book.id}`
      )

      if (
        deleteChannel.state !== "joined" &&
        deleteChannel.state !== "joining"
      ) {
        deleteChannel
          .on(
            "postgres_changes",
            {
              event: "DELETE",
              schema: "public",
              table: "votes_cast",
              filter: `book_id=eq.${book.id}`,
            },
            (payload) => {
              console.log(payload)

              // const updated = { ...book }
              // --updated.votes
              // setBook(updated)
              getVotesForBook(book.id).then((count) => setVotes(count))
              // setVotes(votes - 1)
            }
          )
          .subscribe((status, error) =>
            !error
              ? console.log(
                  `Subscribed to votes_cast:delete:${book.id} channel with status: `,
                  status
                )
              : console.error(
                  `Error subscribing to votes_cast:delete:${book.id} channel: `,
                  error
                )
          )
      }

      return () => {
        supabase.removeChannel(insertChannel)
        console.log(`Unsubscribed from votes_cast:insert:${book.id} channel`)
        supabase.removeChannel(deleteChannel)
        console.log(`Unsubscribed from votes_cast:delete:${book.id} channel`)
      }
    }
    subscribe()
  }, [supabase, book, setBook])

  return (
    <li className="py-5">
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
            <p className="text-sm/6 font-semibold text-white">{book.title}</p>
            <p className="mt-1 truncate text-xs/5 text-gray-400">
              {book.author}
            </p>
            <p className="text-xs/5 font-semibold text-gray-400">
              Submitted by {book.user?.split("@")[0]}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <b>{votes}</b>
          <VoteButton book={book} />
        </div>
      </div>
      <BookSynopsis>{book.synopsis}</BookSynopsis>
    </li>
  )
}
