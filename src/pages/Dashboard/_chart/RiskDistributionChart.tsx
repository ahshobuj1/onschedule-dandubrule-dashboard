/* eslint-disable @typescript-eslint/no-explicit-any */

import Chart from 'react-apexcharts';
import {Card, CardHeader, CardTitle} from '@/components/ui/card';
import {ChartEmptyState} from './ChartEmptyState';

export function RiskDistributionChart({submissions}: {submissions: any[]}) {
  if (!submissions.length) {
    return <ChartEmptyState label="risk distribution" />;
  }

  const riskMap = submissions.reduce((acc, s) => {
    acc[s.riskLevel] = (acc[s.riskLevel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Level Distribution</CardTitle>
      </CardHeader>
      <Chart
        type="donut"
        height={300}
        series={Object.values(riskMap).map(Number) as number[]}
        options={{
          labels: Object.keys(riskMap),
          legend: {position: 'bottom'},
          colors: ['#daa10790'],
        }}
      />
    </Card>
  );
}
