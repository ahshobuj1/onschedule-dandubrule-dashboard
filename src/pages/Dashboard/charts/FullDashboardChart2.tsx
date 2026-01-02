/* eslint-disable @typescript-eslint/no-explicit-any */
// components/charts/FullDashboardCharts.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

interface GrowthData {
  month: string;
  clients: number;
  users: number;
}

interface PlanDistribution {
  name: string;
  value: number;
}

interface TopClient {
  client: string;
  employees: number;
}

interface UserActivity {
  active: number;
  inactive: number;
}

interface NewClientsTrend {
  month: string;
  count: number;
}

interface DashboardData {
  totals: {
    clients: number;
    users: number;
    employees: number;
  };
  growth: GrowthData[];
  planDistribution: PlanDistribution[];
  topClientsByEmployees: TopClient[];
  userActivity: UserActivity;
  newClientsTrend: NewClientsTrend[];
}

interface FullDashboardChartsProps {
  dashboard: DashboardData;
}

// Color palettes
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function FullDashboardCharts2({
  dashboard,
}: FullDashboardChartsProps) {
  if (!dashboard) return null;

  // Format growth data for stacked bar chart
  const formatGrowthData = () => {
    return dashboard.growth.map((item) => ({
      month: item.month,
      Clients: item.clients,
      Users: item.users,
    }));
  };

  // Format user activity for pie chart
  const formatUserActivity = () => {
    return [
      {name: 'Active', value: dashboard.userActivity.active},
      {name: 'Inactive', value: dashboard.userActivity.inactive},
    ];
  };

  // Format top clients
  const formatTopClients = () => {
    return dashboard.topClientsByEmployees.map((client) => ({
      name:
        client.client.length > 15
          ? `${client.client.substring(0, 15)}...`
          : client.client,
      Employees: client.employees,
    }));
  };

  // Custom tooltip for charts
  const CustomTooltip = ({active, payload, label}: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{color: entry.color}} className="text-sm">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Growth Trend Chart */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Growth Overview</CardTitle>
          <CardDescription>Monthly growth of clients and users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={formatGrowthData()}
                margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{fill: '#666'}}
                  axisLine={{stroke: '#ddd'}}
                />
                <YAxis tick={{fill: '#666'}} axisLine={{stroke: '#ddd'}} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Clients"
                  stackId="1"
                  stroke="#c66ecae9"
                  fill="#c66ecae9"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="Users"
                  stackId="1"
                  stroke="var(--primary)"
                  fill="var(--primary)"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Plan Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Distribution</CardTitle>
          <CardDescription>Client subscription plans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 text-[#c66ecae9]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboard.planDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, percent}) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value">
                  {dashboard.planDistribution.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} clients`, 'Count']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* User Activity */}
      <Card>
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
          <CardDescription>Active vs Inactive users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={formatUserActivity()}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value">
                  <Cell fill="#00C49F" />
                  <Cell fill="#FF8042" />
                </Pie>
                <Tooltip formatter={(value) => [`${value} users`, 'Count']} />
                <Legend />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-lg font-bold">
                  {dashboard.userActivity.active +
                    dashboard.userActivity.inactive}
                  <tspan
                    x="50%"
                    dy="1.2em"
                    className="text-xs font-normal block">
                    Total Users
                  </tspan>
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Clients by Employees */}
      <Card>
        <CardHeader>
          <CardTitle>Top Clients by Employees</CardTitle>
          <CardDescription>Clients with most employees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={formatTopClients()}
                margin={{top: 20, right: 30, left: 20, bottom: 60}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{fill: '#666', fontSize: 12}}
                />
                <YAxis tick={{fill: '#666'}} />
                <Tooltip
                  formatter={(value) => [`${value} employees`, 'Count']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                  }}
                />
                <Bar dataKey="Employees" fill="#0088FE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* New Clients Trend */}
      <Card>
        <CardHeader>
          <CardTitle>New Clients Trend</CardTitle>
          <CardDescription>Monthly new client acquisitions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dashboard.newClientsTrend}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{fill: '#666'}} />
                <YAxis tick={{fill: '#666'}} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#FF8042"
                  strokeWidth={2}
                  dot={{r: 4}}
                  activeDot={{r: 6}}
                  name="New Clients"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
