import Chart from 'react-apexcharts';

interface ClientItem {
  client: string;
  employees: number;
}

export function DistributedClientsBarChart({data}: {data: ClientItem[]}) {
  const series = [{name: 'Employees', data: data.map((d) => d.employees)}];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {show: false},
    },
    title: {
      text: 'Top Clients by Workforce',
      align: 'left',
    },
    subtitle: {
      text: 'Clients ranked by assigned employees',
      align: 'left',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        barHeight: '60%',
      },
    },
    xaxis: {
      categories: data.map((d) => d.client),
      title: {text: 'Number of Employees'},
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '13px',
      },
    },
    legend: {show: false},
  };

  return <Chart options={options} series={series} type="bar" height={320} />;
}
