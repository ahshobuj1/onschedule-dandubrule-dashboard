import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {useUpdateUserMutation} from '@/features/users/userApi';

type Props = {
  userId: string;
  status: 'ACTIVE' | 'INACTIVE';
};

export default function UserStatusCell({userId, status}: Props) {
  const [updateStatus, {isLoading}] = useUpdateUserMutation();

  const nextStatus = status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

  const handleToggle = async () => {
    try {
      await updateStatus({
        userId,
        status: nextStatus,
      }).unwrap();
    } catch (error) {
      console.error('Failed to update user status', error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Badge
        className={
          status === 'ACTIVE'
            ? 'bg-green-600 text-white'
            : 'bg-red-600 text-white'
        }>
        {status}
      </Badge>

      <Button
        size="sm"
        variant="outline"
        disabled={isLoading}
        onClick={handleToggle}>
        {status === 'ACTIVE' ? 'Make Inactive' : 'Make Active'}
      </Button>
    </div>
  );
}
