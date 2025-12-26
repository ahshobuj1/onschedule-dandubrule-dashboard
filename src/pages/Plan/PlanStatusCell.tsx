// PlanStatusCell.tsx
'use client';
import {Badge} from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {useUpdatePlanStatusMutation} from '@/features/plans/plansApi';
import {ChevronDown, Loader2} from 'lucide-react'; // loader icon
import {toast} from 'sonner';

interface Props {
  planId: string;
  currentStatus: 'active' | 'inactive';
}

export default function PlanStatusCell({planId, currentStatus}: Props) {
  const [updatePlan, {isLoading}] = useUpdatePlanStatusMutation();

  const handleChange = async (newStatus: 'active' | 'inactive') => {
    if (currentStatus === newStatus) return;
    try {
      const res = await updatePlan({id: planId, status: newStatus}).unwrap();

      // console.log('[update status of plan]', res);
      if (res?.success) {
        toast.success('Plan status updated successfully...!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          className={`flex items-center gap-1 ${
            currentStatus === 'active'
              ? 'bg-primary text-white'
              : 'bg-red-500/80 text-white'
          }`}>
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {!isLoading && currentStatus}
          <ChevronDown className="h-4 w-4" />
        </Badge>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => handleChange('active')}>
          Active
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange('inactive')}>
          Inactive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
