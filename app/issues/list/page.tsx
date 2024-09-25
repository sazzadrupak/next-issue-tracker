import prisma from '@/prisma/client';

import Pagination from '@/app/components/Pagination';
import { IssueQuery } from '@/app/utils';
import { Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';
import IssueActions from './IssueActions';
import IssueTable, { columnNames } from './IssueTable';

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const sort = searchParams.sort === 'asc' ? 'desc' : 'asc';
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: sort,
      }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = parseInt(searchParams.pageSize) || 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable
        searchParams={{ ...searchParams, sort, pageSize: pageSize.toString() }}
        issues={issues}
      />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

// Making issues page rendering dynamically
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue tracker - Issue List',
  description: 'View all project issues',
};

export default IssuesPage;
