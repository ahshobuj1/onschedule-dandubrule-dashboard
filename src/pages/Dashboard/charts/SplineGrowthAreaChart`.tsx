import Chart from 'react-apexcharts';

interface GrowthItem {
  month: string;
  clients: number;
  users: number;
}

export function SplineGrowthAreaChart({data}: {data: GrowthItem[]}) {
  const series = [
    {name: 'Clients', data: data.map((d) => d.clients)},
    {name: 'Users', data: data.map((d) => d.users)},
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      toolbar: {show: false},
      zoom: {enabled: false},
    },
    title: {
      text: 'Platform Growth Overview',
      align: 'left',
    },
    subtitle: {
      text: 'Monthly clients and users growth trend',
      align: 'left',
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100],
      },
    },
    markers: {
      size: 4,
      hover: {size: 6},
    },
    xaxis: {
      categories: data.map((d) => d.month),
      title: {text: 'Month'},
    },
    yaxis: {
      title: {text: 'Total Count'},
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      position: 'top',
    },
  };

  return <Chart options={options} series={series} type="area" height={340} />;
}
