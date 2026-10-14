import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LawyerSearch } from "@/components/customer/lawyer-search"

export const metadata = {
  title: "Find Lawyers - DharmSetu",
  description: "Browse verified legal professionals by category and expertise on DharmSetu.",
}

export default async function PublicLawyersPage() {
  const supabase = await createClient()
  const { data: lawyers } = await supabase
    .from("lawyers")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-foreground">Find </span>
            <span className="text-amber-500">Legal Professionals</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Browse our directory of verified lawyers categorized by expertise.
            Connect with the right legal professional for your needs.
          </p>
        </div>

        <LawyerSearch initialLawyers={lawyers || []} />
      </main>
      <Footer />
    </div>
  )
}
