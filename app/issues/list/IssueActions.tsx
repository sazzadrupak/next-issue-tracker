'use client';

import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';
import PageSelect from './PageSelect';

const IssueActions = () => {
  return (
    <Flex justify="between">
      <Flex gap="5">
        <IssueStatusFilter />
        <PageSelect />
      </Flex>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
