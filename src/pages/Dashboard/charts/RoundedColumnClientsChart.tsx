import Chart from 'react-apexcharts';

interface TrendItem {
  month: string;
  count: number;
}

export function RoundedColumnClientsChart({data}: {data: TrendItem[]}) {
  const series = [{name: 'New Clients', data: data.map((d) => d.count)}];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {show: false},
    },
    title: {
      text: 'New Client Onboarding',
      align: 'left',
    },
    subtitle: {
      text: 'Number of clients added each month',
      align: 'left',
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '45%',
      },
    },
    dataLabels: {enabled: false},
    xaxis: {
      categories: data.map((d) => d.month),
      title: {text: 'Month'},
    },
    yaxis: {
      title: {text: 'Clients'},
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} new clients`,
      },
    },
  };

  return <Chart options={options} series={series} type="bar" height={320} />;
}
