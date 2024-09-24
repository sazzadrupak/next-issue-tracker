import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const statuses: { label: string; value: Status }[] = [
  { label: 'Open', value: 'OPEN' },
  { label: 'In progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const handleStatusSelect = (status: Status) => {
    const query = status ? `?status=${status}` : '';
    router.push(`/issues/list${query}`);
  };

  return (
    <Select.Root onValueChange={handleStatusSelect}>
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
