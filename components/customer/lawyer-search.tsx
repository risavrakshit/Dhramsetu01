"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Building, Clock, Search, Users, Scale } from "lucide-react"

interface Lawyer {
  id: string
  full_name: string
  category: string
  years_of_experience: number
  address: string
  phone_number: string
  email: string
  institute: string
}

const CATEGORIES = [
  "All Categories",
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

export function LawyerSearch({ initialLawyers }: { initialLawyers: Lawyer[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  const filteredLawyers = useMemo(() => {
    return initialLawyers.filter((lawyer) => {
      const matchesSearch =
        lawyer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.address.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === "All Categories" || lawyer.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [initialLawyers, searchTerm, selectedCategory])

  return (
    <div>
      <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, institute, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-[#d4af37]/30 pl-10 focus:border-[#d4af37]"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full border-[#d4af37]/30 focus:border-[#d4af37] sm:w-[200px]">
            <SelectValue placeholder="Category" />
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

      {filteredLawyers.length === 0 ? (
        <Card className="border-[#d4af37]/30">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Scale className="mb-4 h-16 w-16 text-muted-foreground/50" />
            <p className="text-lg font-medium">No Advocates Found</p>
            <p className="text-muted-foreground text-sm mt-1">
              {initialLawyers.length === 0
                ? "No lawyers have registered yet. Be the first to join our network!"
                : "Try adjusting your search filters"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLawyers.map((lawyer) => (
            <Card
              key={lawyer.id}
              className="border-[#d4af37]/30 hover-lift animate-fade-in"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{lawyer.full_name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Building className="h-3 w-3" />
                      {lawyer.institute}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30"
                  >
                    {lawyer.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-[#d4af37]" />
                  <span>{lawyer.years_of_experience} years experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-[#d4af37]" />
                  <span className="line-clamp-1">{lawyer.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-[#d4af37]" />
                  <a href={`tel:${lawyer.phone_number}`} className="hover:text-[#d4af37] transition-colors">
                    {lawyer.phone_number}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-[#d4af37]" />
                  <a href={`mailto:${lawyer.email}`} className="hover:text-[#d4af37] truncate transition-colors">
                    {lawyer.email}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Showing {filteredLawyers.length} of {initialLawyers.length} advocates
      </p>
    </div>
  )
}
