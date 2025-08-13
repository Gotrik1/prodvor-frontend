import { DashboardFeed } from "@/widgets/dashboard-feed";
import { DashboardAside } from "@/widgets/dashboard-aside";

export function DashboardPage() {
  return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <DashboardFeed />
          </div>
          <div className="space-y-6">
            <DashboardAside />
          </div>
        </div>
      </div>
  );
}
