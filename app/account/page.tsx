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
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
      <div className="absolute w-screen h-full left-0 top-0 bg-baltic-blue-800 -z-10"></div>
      <div className="mx-auto max-w-3xl">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="px-3 pb-6 text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight dark:text-white">
              Account
            </h2>
          </div>
        </div>
        <ProfileInfoForm user={user!} />
      </div>
    </main>
  )
}
