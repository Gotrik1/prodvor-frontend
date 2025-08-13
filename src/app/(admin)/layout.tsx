// This layout is now deprecated. The logic has been moved to /src/views/admin/pages/layout.tsx
// It is kept to avoid breaking other routes in (admin) group like /users and /sponsors.
'use client';

export default function DeprecatedAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background min-h-screen text-foreground">
      {children}
    </div>
  );
}
