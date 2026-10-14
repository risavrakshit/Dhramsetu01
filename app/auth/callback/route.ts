import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  const next = searchParams.get('next')
  const type = searchParams.get('type') // Check for type=lawyer param

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.user) {
      // Get user type from metadata or from query param
      let userType = data.user.user_metadata?.user_type
      
      // If type=lawyer was passed in URL, update user metadata and redirect to lawyer
      if (type === "lawyer") {
        await supabase.auth.updateUser({
          data: { user_type: "lawyer" }
        })
        userType = "lawyer"
      }
      
      // If no user_type is set, check if this is a new user or redirect based on existing data
      if (!userType) {
        // For users without a type, check if they came from lawyer login
        // The client-side stores the intended type in a cookie or localStorage
        // Since we can't read localStorage server-side, we default appropriately
        
        // If user has no type yet and accessed via standard login, default to customer
        userType = "customer"
      }
      
      if (next) {
        return NextResponse.redirect(`${origin}${next}`)
      }
      
      // Redirect based on user type
      if (userType === "customer") {
        return NextResponse.redirect(`${origin}/customer`)
      } else if (userType === "lawyer") {
        return NextResponse.redirect(`${origin}/lawyer`)
      }
      
      // Default redirect to customer
      return NextResponse.redirect(`${origin}/customer`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/error`)
}
