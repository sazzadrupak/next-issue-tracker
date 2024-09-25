import { Issue, Status } from '@prisma/client';

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
  sort: 'asc' | 'desc';
  pageSize: string;
}

export const statuses: { label: string; value: Status }[] = [
  { label: 'Open', value: 'OPEN' },
  { label: 'In progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];
