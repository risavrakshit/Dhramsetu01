import { CustomerSidebar } from "@/components/customer/sidebar"

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <CustomerSidebar />
      <main className="flex-1 flex flex-col overflow-auto bg-background pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  )
}
