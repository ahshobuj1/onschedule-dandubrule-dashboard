import Chart from 'react-apexcharts';

interface UserActivity {
  active: number;
  inactive: number;
}

export function ActiveUsersRadialChart({data}: {data: UserActivity}) {
  const total = data.active + data.inactive;
  const percentage = total ? Math.round((data.active / total) * 100) : 0;

  const series = [percentage];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'radialBar',
    },
    title: {
      text: 'Active Users Ratio',
      align: 'center',
    },
    subtitle: {
      text: 'Percentage of currently active users',
      align: 'center',
    },
    plotOptions: {
      radialBar: {
        hollow: {size: '60%'},
        dataLabels: {
          name: {fontSize: '16px'},
          value: {
            fontSize: '22px',
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    labels: ['Active Users'],
  };

  return (
    <Chart options={options} series={series} type="radialBar" height={320} />
  );
}
