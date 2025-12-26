import type {ColumnDef} from '@tanstack/react-table';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {MoreHorizontal} from 'lucide-react';
import {formatDate} from '@/utils/formatDate';
import {Link} from 'react-router';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import type {IAssignment} from './type';

export const columns: ColumnDef<IAssignment>[] = [
  // 🆔 Exam ID
  {
    accessorKey: 'examId',
    header: 'Exam ID',
    cell: ({row}) => (
      <span className="font-mono text-sm">{row.original.examId}</span>
    ),
  },

  // 📘 Title
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({row}) => <div className="font-semibold">{row.original.title}</div>,
  },

  // 🧾 Description (short)
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({row}) => (
      <p className="max-w-xs truncate text-muted-foreground">
        {row.original.description}
      </p>
    ),
  },

  // 📂 Categories count
  {
    header: 'Categories',
    cell: ({row}) => (
      <Badge variant="default">
        <Link to={`/dashboard/assignments/${row.original.id}/categories`}>
          {row.original._count.categories}
        </Link>
      </Badge>
    ),
  },

  // ❓ Questions count
  {
    header: 'Questions',
    cell: ({row}) => {
      const totalQuestions =
        row.original.categories?.reduce(
          (sum, c) => sum + c.questions.length,
          0
        ) ?? 0;

      return <Badge variant="outline">{totalQuestions}</Badge>;
    },
  },

  // 📤 Submissions count
  {
    header: 'Submissions',
    cell: ({row}) => (
      <Badge variant={'secondary'}>{row.original._count.submissions}</Badge>
    ),
  },

  // ⏳ Latest submission status
  {
    header: 'Status',
    cell: ({row}) => {
      const last = row.original.submissions?.[0];

      if (!last) {
        return <Badge variant="outline">No Submission</Badge>;
      }

      const color =
        last.status === 'APPROVED'
          ? 'bg-green-600'
          : last.status === 'SUBMITTED'
          ? 'bg-blue-600'
          : 'bg-yellow-500';

      return <Badge className={`${color} text-white`}>{last.status}</Badge>;
    },
  },

  // ✅ Active / Inactive
  {
    accessorKey: 'isActive',
    header: 'Active',
    cell: ({row}) =>
      row.original.isActive ? (
        <Badge className="bg-green-600 text-white">Active</Badge>
      ) : (
        <Badge className="bg-gray-500 text-white">Inactive</Badge>
      ),
  },

  // 📅 Created At
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({row}) => <span>{formatDate(row.original.createdAt)}</span>,
  },

  // ⚙️ Actions
  {
    id: 'actions',
    header: 'Actions',
    cell: ({row}) => {
      const assignment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={`dashboard/assignments/${assignment.id}`}>
                View Details
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
