import { statuses } from '@/app/utils';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleStatusSelect = (status: Status) => {
    const params = new URLSearchParams();
    if (status) {
      params.append('status', status);
    }
    if (searchParams.get('orderBy')) {
      params.append('orderBy', searchParams.get('orderBy')!);
    }
    const query = params.size ? '?' + params.toString() : '';
    router.push(`/issues/list${query}`);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get('status') || ''}
      onValueChange={handleStatusSelect}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        <Select.Item value="">All</Select.Item>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || ''}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
