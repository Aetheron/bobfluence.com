import { forgotPasswordAction } from "@/app/actions"
import { FormMessage, Message } from "@/components/form-message"
import { SubmitButton } from "@/components/submit-button"

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>
}) {
  const searchParams = await props.searchParams
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 lg:min-w-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            alt="Bobfluence"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-gray-200">
            Reset your password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-120">
          <div className="bg-white dark:bg-slate-800 px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form action={forgotPasswordAction} className="space-y-6">
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
                    className="block w-full rounded-md bg-white dark:bg-slate-800 px-3 py-1.5 text-base text-gray-900 dark:text-gray-100 outline -outline-offset-1 outline-gray-300 dark:outline-slate-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-maize-300 focus:dark:bg-slate-700 sm:text-sm/6"
                  />
                </div>
              </div>

              <SubmitButton className="w-full!">Reset Password</SubmitButton>
              <FormMessage message={searchParams} />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
