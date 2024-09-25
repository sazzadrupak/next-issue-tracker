'use client';

import { statuses } from '@/app/utils';
import { Issue, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const [selectedStatus, setSelectedStatus] = useState<Status>(issue.status);
  const router = useRouter();

  useEffect(() => {
    setSelectedStatus(issue.status);
  }, [issue.status]);

  const handleAssignStatus = async (status: Status) => {
    const prevStatus = selectedStatus;
    try {
      setSelectedStatus(status);
      await axios.patch(`/api/issues/${issue.id}`, {
        status,
      });
      router.refresh();
    } catch (error) {
      setSelectedStatus(prevStatus);
      toast.error('Changes could not be saved');
    }
  };

  return (
    <>
      <Select.Root onValueChange={handleAssignStatus} value={selectedStatus}>
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
