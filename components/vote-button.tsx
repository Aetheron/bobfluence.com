"use client"

import {
  removeVoteForBookChoiceAction,
  voteForBookChoiceAction,
} from "@/app/actions"
import { bookType } from "@/app/book_club/page"
import { Button } from "@radix-ui/themes"
import { ComponentProps, useState } from "react"

export default function VoteButton({
  book,
  ...props
}: ComponentProps<typeof Button> & {
  book: bookType
}) {
  const [userVoted, setUserVoted] = useState(book.userVoted)

  return (
    <button
      {...props}
      onClick={(e) => {
        props.onClick?.(e)

        void (userVoted
          ? removeVoteForBookChoiceAction(book.id)
          : voteForBookChoiceAction(book.id))

        setUserVoted(!userVoted)
      }}
      className="w-20 rounded-md bg-sage-500 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-sage-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600 cursor-pointer"
    >
      {userVoted ? "Unvote" : "Vote"}
    </button>
  )
}
