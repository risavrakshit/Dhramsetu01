import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL! || 'https://clrruizrcwrdiwonynus.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscnJ1aXpyY3dyZGl3b255bnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMzk3MzUsImV4cCI6MjA5MTYxNTczNX0.cuAfv-TvcFGUzl2Gi3G5Tu0f1CZZFewew1FZeQR1N9g',
  )
}
