import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {cn} from '@/lib/utils';

type HealthCardProps = {
  title: string;
  value: string | number;
  variant?: 'success' | 'warning' | 'danger';
};

export function HealthCard({
  title,
  value,
  variant = 'success',
}: HealthCardProps) {
  const colorMap = {
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
  };

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <CardTitle className={cn('text-3xl', colorMap[variant])}>
            {value}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
