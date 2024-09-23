'use client';

import { Select } from '@radix-ui/themes';

const AssigneeSelect = ({ issueId }: { issueId: number }) => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">Sazzad Rupak</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
