import { signInAction } from "@/app/actions"
import { FormMessage, Message } from "@/components/form-message"
import { SubmitButton } from "@/components/submit-button"
import Image from "next/image"
import Link from "next/link"

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 lg:min-w-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            alt="Bobfluence"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
            width={24}
            height={24}
          />
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-gray-200">
            Sign in to your account
          </h2>
          <p className="text-sm text-foreground text-center">
            Don&apos;t have an account?{" "}
            <Link
              className="text-foreground font-medium underline"
              href="/sign-up"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-120">
          <div className="bg-white dark:bg-slate-800 px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form action={signInAction} className="space-y-6">
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

              <div>
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <Link
                    className="text-xs text-foreground underline"
                    href="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white dark:bg-slate-800 px-3 py-1.5 text-base text-gray-900 dark:text-gray-100 outline -outline-offset-1 outline-gray-300 dark:outline-slate-500 placeholder:text-gray-400focus:outline-2 focus:-outline-offset-2 focus:outline-maize-300 focus:dark:bg-slate-700 sm:text-sm/6"
                  />
                </div>
              </div>
              <SubmitButton className="w-full!" pendingContent="Signing In...">
                Sign in
              </SubmitButton>
              <FormMessage message={searchParams} />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
