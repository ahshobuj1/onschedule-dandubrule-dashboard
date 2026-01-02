import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const TopClientsBarChart = ({data}: any) => (
  <div className="h-[300px] w-full bg-white p-4 rounded-xl shadow-sm border">
    <h3 className="text-lg font-semibold mb-4">Top Clients by Employees</h3>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart layout="vertical" data={data} margin={{left: 40}}>
        <XAxis type="number" />
        <YAxis dataKey="client" type="category" width={100} />
        <Tooltip cursor={{fill: 'transparent'}} />
        <Bar dataKey="employees" fill="#6366f1" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
