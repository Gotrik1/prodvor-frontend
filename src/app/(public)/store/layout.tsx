
export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        <main className="flex-1">
            {children}
        </main>
    </div>
  )
}
