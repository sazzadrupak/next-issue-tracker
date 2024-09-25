'use client';

import { statuses } from '@/app/utils';
import { Issue, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const handleAssignStatusToIssue = async (status: Status) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        status,
      });
      router.refresh();
    } catch (error) {
      toast.error('Changes could not be saved');
    }
  };

  return (
    <>
      <Select.Root
        onValueChange={handleAssignStatusToIssue}
        defaultValue={issue.status}
      >
        <Select.Trigger placeholder="Status..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {statuses.map((status) => (
              <Select.Item key={status.value} value={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
