import { DashboardFeed } from "@/widgets/dashboard-feed";
import { DashboardAside } from "@/widgets/dashboard-aside";

export function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-4 md:p-6 lg:p-8 items-start">
        <div className="lg:col-span-3 space-y-6">
            <DashboardFeed />
        </div>
        <aside className="lg:col-span-1 space-y-6 lg:sticky top-24">
            <DashboardAside />
        </aside>
    </div>
  );
}
