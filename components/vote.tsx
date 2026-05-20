"use client"

import { submitBookSuggestionAction } from "@/app/actions"
import { TextArea } from "@radix-ui/themes"
import { Plus, RefreshCw } from "lucide-react"
import { useActionState } from "react"

export default function Vote() {
  const [suggestBookState, suggestBookSave, suggestBookPending] =
    useActionState(submitBookSuggestionAction, { error: null })

  return (
    <form action={suggestBookSave}>
      <div className="space-y-12 mb-6">
        <h1 className="text-3xl/7 font-semibold text-gray-100">
          Submit a book
        </h1>
        <p className="mt-1 text-sm/6 text-gray-600"></p>

        <div className="mt-10 grid gap-x-6 gap-y-8 grid-cols-4">
          <div className="col-span-2">
            <label
              htmlFor="bookTitle"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                id="bookTitle"
                name="bookTitle"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-300 sm:text-sm/6"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="author"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Author
            </label>
            <div className="mt-2">
              <input
                id="author"
                name="author"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-300 sm:text-sm/6"
              />
            </div>
          </div>
          <div className="col-span-4">
            <label
              htmlFor="synopsis"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Synopsis
            </label>
            <div className="mt-2">
              <TextArea
                id="synopsis"
                name="synopsis"
                className="block w-full rounded-md bg-white! px-3 py-1.5 text-base text-gray-900! outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-300 sm:text-sm/6"
              />
            </div>
          </div>
          <div className="col-span-3">
            <label
              htmlFor="coverArt"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Cover
            </label>
            <div className="mt-2">
              <input
                id="coverArt"
                name="coverArt"
                placeholder="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1741160184i/223469227.jpg"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-300 sm:text-sm/6"
              />
              <p className="text-sm/4 text-gray-300">
                Only Goodreads is supported for cover art. Right click an image
                and choose &quot;Copy image address&quot;
              </p>
            </div>
          </div>
          <div>
            <label
              htmlFor="pages"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Page Count
            </label>
            <div className="mt-2">
              <input
                id="pages"
                name="pages"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-300 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="rounded-md bg-emerald-400 px-3 py-2 w-full text-sm font-semibold text-gray-800 shadow-sm hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer"
        >
          <div className="w-fit grid grid-cols-2 gap-x-1 justify-items-center mx-auto">
            Add
            {suggestBookPending ? (
              <RefreshCw className="size-5" />
            ) : (
              <Plus className="size-5" />
            )}
          </div>
        </button>
      </div>
    </form>
  )
}
