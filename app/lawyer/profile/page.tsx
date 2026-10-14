"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { Save, Trash2, AlertCircle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const CATEGORIES = [
  "Criminal Lawyer",
  "Civil Lawyer",
  "Family Lawyer",
  "Corporate Lawyer",
  "Tax Lawyer",
  "Constitutional Lawyer",
  "Property Lawyer",
  "Labour Lawyer",
  "Intellectual Property Lawyer",
  "Environmental Lawyer",
  "Contract lawyer",
  "Government lawer",
  "Immigration lawyer",
  "Medical malpractice lawyer",
  "Merger and acquisit lawyer",
  "Bankruptcy lawyer",
  "Securities lawyer",
  "Military lawyer",




]

interface LawyerProfile {
  id: string
  user_id: string
  full_name: string
  category: string
  years_of_experience: number
  address: string
  phone_number: string
  email: string
  institute: string
}

export default function LawyerProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [profile, setProfile] = useState<LawyerProfile | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    full_name: "",
    category: "",
    years_of_experience: "",
    address: "",
    phone_number: "",
    email: "",
    institute: "",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setUserId(user.id)

      const { data } = await supabase
        .from("lawyers")
        .select("*")
        .eq("user_id", user.id)
        .single()

      if (data) {
        setProfile(data)
        setFormData({
          full_name: data.full_name,
          category: data.category,
          years_of_experience: String(data.years_of_experience),
          address: data.address,
          phone_number: data.phone_number,
          email: data.email,
          institute: data.institute,
        })
      } else {
        setFormData((prev) => ({ ...prev, email: user.email || "" }))
      }

      setLoading(false)
    }

    fetchProfile()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    const supabase = createClient()

    const payload = {
      user_id: userId,
      full_name: formData.full_name,
      category: formData.category,
      years_of_experience: parseInt(formData.years_of_experience),
      address: formData.address,
      phone_number: formData.phone_number,
      email: formData.email,
      institute: formData.institute,
    }

    if (profile) {
      const { error } = await supabase
        .from("lawyers")
        .update(payload)
        .eq("id", profile.id)

      if (error) {
        setError(error.message)
        setSaving(false)
        return
      }
    } else {
      const { error } = await supabase.from("lawyers").insert(payload)

      if (error) {
        setError(error.message)
        setSaving(false)
        return
      }
    }

    setSuccess(true)
    setSaving(false)
    router.refresh()
  }

  const handleDelete = async () => {
    if (!profile) return

    setDeleting(true)
    const supabase = createClient()

    const { error } = await supabase
      .from("lawyers")
      .delete()
      .eq("id", profile.id)

    if (error) {
      setError(error.message)
      setDeleting(false)
      return
    }

    router.push("/lawyer")
    router.refresh()
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="p-3 sm:p-4 md:p-8 overflow-y-auto">
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
          {profile ? "Edit Profile" : "Create Profile"}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {profile
            ? "Update your professional information"
            : "Complete your profile to be visible to customers"}
        </p>
      </div>

      <Card className="max-w-2xl border-amber-500/20 mx-auto sm:mx-0">
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
          <CardDescription>
            This information will be displayed to customers looking for legal assistance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-lg bg-green-500/10 p-3 text-sm text-green-500">
              Profile saved successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                required
                placeholder="Enter your full name"
                className="border-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Legal Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger className="border-amber-500/20 focus:border-amber-500">
                  <SelectValue placeholder="Select your specialization" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="years_of_experience">Years of Experience</Label>
              <Input
                id="years_of_experience"
                type="number"
                min="0"
                max="60"
                value={formData.years_of_experience}
                onChange={(e) => setFormData({ ...formData, years_of_experience: e.target.value })}
                required
                placeholder="Enter years of experience"
                className="border-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="institute">Institute / Law Firm</Label>
              <Input
                id="institute"
                value={formData.institute}
                onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                required
                placeholder="Enter your institute or law firm name"
                className="border-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Professional Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="your@email.com"
                className="border-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                required
                placeholder="+91 98765 43210"
                className="border-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Office Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                placeholder="Enter your office address"
                rows={3}
                className="border-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <Button
                type="submit"
                className="bg-amber-500 text-white hover:bg-amber-600"
                disabled={saving}
              >
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save Profile"}
              </Button>

              {profile && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={deleting}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Profile
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Profile?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. Your profile will be permanently removed
                        from DharmSetu and you will no longer be visible to customers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {deleting ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
