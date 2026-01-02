import {IconTrendingUp} from '@tabler/icons-react';

import {Badge} from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const StatsCard = ({title, total}: {total: string; title: string}) => {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {total}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <IconTrendingUp />
          </Badge>
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export default StatsCard;
