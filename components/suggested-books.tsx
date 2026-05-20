import { getBookChoicesAction } from "@/app/actions"
import { BookDashedIcon } from "lucide-react"
import Image from "next/image"

export default async function SuggestedBooks() {
  const bookSuggestions = await getBookChoicesAction()

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
        <ul
          role="list"
          className="divide-y divide-gray-100 dark:divide-white/5"
        >
          {bookSuggestions.books.map((book) => (
            <li key={book.user} className="flex gap-x-4 py-5">
              <Image
                alt=""
                src={book.coverArt}
                width={100}
                height={150}
                className="w-12 flex-none rounded-sm bg-gray-50 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10"
              />
              <div className="min-w-0">
                <p className="text-sm/6 font-semibold text-white">
                  {book.title}
                </p>
                <p className="mt-1 truncate text-xs/5 text-gray-400">
                  {book.author}
                </p>
                <p className="text-xs/5 font-semibold text-gray-400">
                  Submitted by {book.user}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
