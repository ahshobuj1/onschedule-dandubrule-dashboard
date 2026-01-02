import ReactApexChart from 'react-apexcharts';
import type {ApexOptions} from 'apexcharts';

type DashboardData = {
  growth: {month: string; clients: number; users: number}[];
  newClientsTrend: {month: string; count: number}[];
  topClientsByEmployees: {client: string; employees: number}[];
  userActivity: {active: number; inactive: number};
};

type Props = {
  dashboard: DashboardData;
};

export default function FullDashboardCharts({dashboard}: Props) {
  // ----- Growth Area Chart -----
  const growthSeries = [
    {name: 'Clients', data: dashboard.growth.map((d) => d.clients)},
    {name: 'Users', data: dashboard.growth.map((d) => d.users)},
  ];

  const growthOptions: ApexOptions = {
    chart: {type: 'area' as const, height: 350, toolbar: {show: false}},
    title: {text: 'Clients & Users Growth', align: 'left'},
    stroke: {curve: 'smooth', width: 3},
    fill: {type: 'gradient', gradient: {opacityFrom: 0.45, opacityTo: 0.05}},
    xaxis: {
      categories: dashboard.growth.map((d) => d.month),
      title: {text: 'Month'},
    },
    yaxis: {title: {text: 'Count'}},
    tooltip: {shared: true, intersect: false},
    legend: {position: 'top', horizontalAlign: 'right'},
  };

  // ----- New Clients Column Chart -----
  // const newClientsSeries = [
  //   {name: 'New Clients', data: dashboard.newClientsTrend.map((d) => d.count)},
  // ];

  // const newClientsOptions: ApexOptions = {
  //   chart: {type: 'bar' as const, height: 300, toolbar: {show: false}},
  //   title: {text: 'New Client Onboarding', align: 'left'},
  //   plotOptions: {bar: {borderRadius: 6, columnWidth: '45%'}},
  //   dataLabels: {enabled: false},
  //   xaxis: {
  //     categories: dashboard.newClientsTrend.map((d) => d.month),
  //     title: {text: 'Month'},
  //   },
  //   yaxis: {title: {text: 'Clients'}},
  //   tooltip: {y: {formatter: (val) => `${val} new clients`}},
  // };

  // ----- Top Clients Horizontal Bar -----
  const topClientsSeries = [
    {
      name: 'Employees',
      data: dashboard.topClientsByEmployees.map((d) => d.employees),
    },
  ];

  const topClientsOptions: ApexOptions = {
    chart: {type: 'bar' as const, height: 300, toolbar: {show: false}},
    plotOptions: {bar: {horizontal: true, distributed: true, barHeight: '60%'}},
    title: {text: 'Top Clients by Employees', align: 'left'},
    xaxis: {
      categories: dashboard.topClientsByEmployees.map((d) => d.client),
      title: {text: 'Employees'},
    },
    dataLabels: {enabled: true, style: {fontSize: '13px'}},
    legend: {show: false},
  };

  // ----- User Activity Radial Chart -----
  const totalUsers =
    dashboard.userActivity.active + dashboard.userActivity.inactive;
  const activePercentage = totalUsers
    ? Math.round((dashboard.userActivity.active / totalUsers) * 100)
    : 0;

  const userActivitySeries = [activePercentage];

  const userActivityOptions: ApexOptions = {
    chart: {type: 'radialBar' as const, height: 300},
    title: {text: 'Active Users Ratio', align: 'center'},
    plotOptions: {
      radialBar: {
        hollow: {size: '60%'},
        dataLabels: {
          name: {fontSize: '16px'},
          value: {fontSize: '22px', formatter: (val) => `${val}%`},
        },
      },
    },
    labels: ['Active Users'],
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <ReactApexChart
          options={growthOptions}
          series={growthSeries}
          type="area"
          height={350}
        />
      </div>

      {/* <div className="rounded-xl border bg-white p-4 shadow-sm">
        <ReactApexChart
          options={newClientsOptions}
          series={newClientsSeries}
          type="line"
          height={300}
        />
      </div> */}

      <div className="grid md:grid-cols-3 gap-10 jus">
        <div className="rounded-xl border bg-white p-4 shadow-sm col-span-2">
          <ReactApexChart
            options={topClientsOptions}
            series={topClientsSeries}
            type="bar"
            height={300}
          />
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm max-w-sm mx-auto col-span-1">
          <ReactApexChart
            options={userActivityOptions}
            series={userActivitySeries}
            type="radialBar"
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
