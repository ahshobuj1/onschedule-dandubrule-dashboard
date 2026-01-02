// Update your Dashboard component
import {SectionCards} from '@/components/section-cards';
import {useStatsQuery} from '@/features/stats/statsApi';
import {LoaderIcon} from 'lucide-react';
import FullDashboardCharts2 from './charts/FullDashboardChart2';

export default function Dashboard() {
  const {data: dashboard, isLoading} = useStatsQuery({});

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <span className="flex items-center gap-2 text-lg">
          <LoaderIcon className="animate-spin" /> Loading dashboard...
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="space-y-6">
        {/* Stats Cards */}
        <SectionCards dashboardStats={dashboard?.data?.totals} />

        {/* Charts Section */}
        {dashboard?.data && (
          <div className="space-y-6">
            {/* Full Dashboard Charts */}
            <FullDashboardCharts2 dashboard={dashboard.data} />
          </div>
        )}
      </div>
    </div>
  );
}
