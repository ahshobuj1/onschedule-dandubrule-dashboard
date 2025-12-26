export function ChartEmptyState({label}: {label: string}) {
  return (
    <div className="flex h-[300px] items-center justify-center rounded-xl border border-dashed text-muted-foreground">
      No data available for {label}
    </div>
  );
}
