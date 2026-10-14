import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, FileText, TrendingUp, AlertCircle } from "lucide-react"
import Link from "next/link"

export default async function LawyerDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from("lawyers")
    .select("*")
    .eq("user_id", user?.id)
    .single()

  return (
    <div className="p-3 sm:p-4 md:p-8 overflow-y-auto">
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
          Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your profile and track your visibility on DharmSetu
        </p>
      </div>

      {!profile ? (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-lg">Complete Your Profile</CardTitle>
            </div>
            <CardDescription>
              Your profile is not yet visible to customers. Complete your profile to start receiving inquiries.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/lawyer/profile">
              <Button className="bg-amber-500 text-white hover:bg-amber-600">
                Complete Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-amber-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Profile Status
              </CardTitle>
              <User className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">Active</div>
              <p className="text-xs text-muted-foreground">
                Your profile is visible to customers
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Category
              </CardTitle>
              <FileText className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile.category}</div>
              <p className="text-xs text-muted-foreground">
                Your legal specialization
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Experience
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile.years_of_experience} Years</div>
              <p className="text-xs text-muted-foreground">
                Years of professional experience
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {profile && (
        <div className="mt-6 sm:mt-8">
          <Card className="border-amber-500/20">
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
              <CardDescription>
                Your current profile information visible to customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Full Name</dt>
                  <dd className="mt-1 text-foreground">{profile.full_name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                  <dd className="mt-1 text-foreground">{profile.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                  <dd className="mt-1 text-foreground">{profile.phone_number}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Institute</dt>
                  <dd className="mt-1 text-foreground">{profile.institute}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-muted-foreground">Address</dt>
                  <dd className="mt-1 text-foreground">{profile.address}</dd>
                </div>
              </dl>
              <div className="mt-6">
                <Link href="/lawyer/profile">
                  <Button variant="outline" className="border-amber-500/30 hover:bg-amber-500/10">
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
