import Chart from 'react-apexcharts';

export function PlanDonutChart({data}: {data: any[]}) {
  const series = data.map((d) => d.value);

  const options: ApexCharts.ApexOptions = {
    labels: data.map((d) => d.name),
    legend: {position: 'bottom'},
    dataLabels: {enabled: false},
  };

  return <Chart options={options} series={series} type="donut" height={260} />;
}
