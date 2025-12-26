/* eslint-disable @typescript-eslint/no-explicit-any */

import Chart from 'react-apexcharts';
import {Card, CardHeader, CardTitle} from '@/components/ui/card';
import type {ApexOptions} from 'apexcharts';
import {ChartEmptyState} from './ChartEmptyState';

export function ProblemsPriorityChart({problems}: {problems: any[]}) {
  if (!problems.length) {
    return <ChartEmptyState label="problems priority" />;
  }

  const priorityMap = problems.reduce((acc, p) => {
    acc[p.priority] = (acc[p.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const series = [
    {
      name: 'Problems',
      data: Object.values(priorityMap) as number[],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: Object.keys(priorityMap),
    },
    colors: ['#daa107'],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Problems by Priority</CardTitle>
      </CardHeader>
      <Chart type="area" height={300} series={series} options={options} />
    </Card>
  );
}
