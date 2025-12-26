/* eslint-disable @typescript-eslint/no-explicit-any */

import Chart from 'react-apexcharts';
import {Card, CardHeader, CardTitle} from '@/components/ui/card';
import {ChartEmptyState} from './ChartEmptyState';

export function VendorsByIndustryChart({data}: {data: any[]}) {
  if (!data.length) {
    return <ChartEmptyState label="vendors by industry" />;
  }

  const series = data.map((i) => i._count);
  const labels = data.map((i) => i.industryType);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendors by Industry</CardTitle>
      </CardHeader>
      <Chart
        type="pie"
        height={300}
        series={series}
        options={{
          labels,
          legend: {position: 'bottom'},
          colors: ['#daa10790'],
        }}
      />
    </Card>
  );
}
