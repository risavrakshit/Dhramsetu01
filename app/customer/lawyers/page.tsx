import { createClient } from "@/lib/supabase/server"
import { Scale } from "lucide-react"
import { LawyerSearch } from "@/components/customer/lawyer-search"

export default async function HallOfAdvocatesPage() {
  const supabase = await createClient()
  const { data: lawyers } = await supabase
    .from("lawyers")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="p-3 sm:p-4 md:p-8 animate-fade-in overflow-y-auto">
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
          <Scale className="h-6 w-6 sm:h-8 sm:w-8 text-[#d4af37]" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Hall of Advocates</h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Browse verified legal professionals from our network
        </p>
      </div>

      <LawyerSearch initialLawyers={lawyers || []} />
    </div>
  )
}
