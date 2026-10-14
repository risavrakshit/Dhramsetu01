import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { LawyerSidebar } from "@/components/lawyer/sidebar"

export default async function LawyerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen">
      <LawyerSidebar user={user} />
      <main className="flex-1 overflow-auto bg-background pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  )
}
