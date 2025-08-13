import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | ProDvor",
  description: "Ваш центр управления в мире дворового спорта.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
