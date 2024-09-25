import { Issue, Status } from '@prisma/client';

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
  sort: 'asc' | 'desc';
  pageSize: string;
}
