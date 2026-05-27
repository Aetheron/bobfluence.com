"use client"

import { startNewVotingRoundAction } from "@/app/actions"

export default function NewRoundButton() {
  return (
    <button
      onClick={startNewVotingRoundAction}
      className="w-full rounded-md bg-emerald-400 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer"
    >
      Start new round of voting
    </button>
  )
}
