"use client"

import {
  removeVoteForBookChoiceAction,
  voteForBookChoiceAction,
} from "@/app/actions"
import { UUID } from "crypto"

export default function VoteButton({
  bookId,
  unvote = false,
}: {
  bookId: UUID
  unvote?: boolean
}) {
  return (
    <button
      onClick={() =>
        unvote
          ? removeVoteForBookChoiceAction(bookId)
          : voteForBookChoiceAction(bookId)
      }
      className="w-20 rounded-md bg-emerald-400 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer"
    >
      {unvote ? "Unvote" : "Vote"}
    </button>
  )
}
