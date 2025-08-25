
import MainLayout from '@/app/(main)/layout';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MainLayout>
        {children}
    </MainLayout>
  )
}
