import ProfileInfoForm from "@/components/profile-info"
import { createClient } from "@/utils/supabase/server"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Account",
  description: "Change account settings and manage your profile",
}

export default async function Account() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="px-3 pb-6 text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight dark:text-white">
              Account
            </h2>
          </div>
        </div>
        <div className="relative flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 dark:border-white/10 dark:bg-gray-900 dark:before:pointer-events-none dark:before:absolute dark:before:inset-0 dark:before:bg-black/10">
          <ProfileInfoForm user={user!} />
        </div>
      </div>
    </div>
  )
}
