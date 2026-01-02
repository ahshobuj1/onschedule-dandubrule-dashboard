'use client';

import * as React from 'react';
import {Area, AreaChart, CartesianGrid, XAxis} from 'recharts';

import {useIsMobile} from '@/hooks/use-mobile';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {ToggleGroup, ToggleGroupItem} from '@/components/ui/toggle-group';

type Props = {
  dashboardData: {
    growth: {month: string; clients: number; users: number}[];
    newClientsTrend: {month: string; count: number}[];
  };
};

export function ChartAreaInteractive({dashboardData}: Props) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState('90d');

  React.useEffect(() => {
    if (isMobile) setTimeRange('7d');
  }, [isMobile]);

  const chartData = dashboardData.growth.map((item, idx) => ({
    date: item.month,
    clients: item.clients,
    users: item.users,
    newClients: dashboardData.newClientsTrend[idx]?.count || 0,
  }));

  // Clients color dynamic, Users & New Clients hard-coded
  const chartConfig = {
    clients: {label: 'Clients', color: 'var(--primary)'}, // dynamic primary
    users: {label: 'Users', color: '#10428a'}, // Green hard-coded
    newClients: {label: 'New Clients', color: '#f59e0b'}, // Amber hard-coded
  } satisfies ChartConfig;

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Dashboard Trends</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Trends for Clients, Users & New Clients
          </span>
          <span className="@[540px]/card:hidden">Latest</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex">
            <ToggleGroupItem value="90d">Latest</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full">
          <AreaChart data={chartData}>
            <defs>
              {/* Clients dynamic gradient */}
              <linearGradient id="fillClients" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--primary)"
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor="var(--primary)"
                  stopOpacity={0.1}
                />
              </linearGradient>

              {/* Users hard-coded gradient */}
              <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10428a" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#10428a" stopOpacity={0.1} />
              </linearGradient>

              {/* New Clients hard-coded gradient */}
              <linearGradient id="fillNewClients" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={20}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="clients"
              type="natural"
              fill="url(#fillClients)"
              stroke="var(--primary)"
              stackId="a"
            />
            <Area
              dataKey="users"
              type="natural"
              fill="url(#fillUsers)"
              stroke="#10428a"
              stackId="a"
            />
            <Area
              dataKey="newClients"
              type="natural"
              fill="url(#fillNewClients)"
              stroke="#f59e0b"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
