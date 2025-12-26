/* eslint-disable @typescript-eslint/no-explicit-any */

import {IconTrendingUp} from '@tabler/icons-react';
import {Badge} from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function SectionCards({overview}: {overview: any}) {
  return (
    <div className="grid grid-cols-1 gap-4  md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Users"
        value={overview.totalUsers}
        growth={overview.userGrowth}
        footer={`Active users: ${overview.activeUsers}`}
      />

      <StatCard
        title="Vendors"
        value={overview.totalVendors}
        growth={overview.vendorGrowth}
        footer="Registered vendors"
      />

      <StatCard
        title="Suppliers"
        value={overview.totalSuppliers}
        growth={overview.supplierGrowth}
        footer="Active suppliers"
      />

      <StatCard
        title="Assessments"
        value={overview.totalAssessments}
        footer={`Pending verification: ${overview.pendingVerifications}`}
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  growth,
  footer,
}: {
  title: string;
  value: number;
  growth?: number;
  footer?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-3xl">{value}</CardTitle>

        {growth !== undefined && (
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp className="mr-1 h-4 w-4" />
              {growth}%
            </Badge>
          </CardAction>
        )}
      </CardHeader>

      {footer && (
        <CardFooter className="text-sm text-muted-foreground">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
