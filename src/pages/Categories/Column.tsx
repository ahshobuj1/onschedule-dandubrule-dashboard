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

import type {IAssessmentCategory} from './type';

export const columns: ColumnDef<IAssessmentCategory>[] = [
  // 🆔 Category Slug
  {
    accessorKey: 'categoryId',
    header: 'Category ID',
    cell: ({row}) => (
      <span className="font-mono text-sm">{row.original.categoryId}</span>
    ),
  },

  // 📘 Category Title
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({row}) => <div className="font-semibold">{row.original.title}</div>,
  },

  // ❓ Questions Count
  {
    header: 'Questions',
    cell: ({row}) => (
      <Badge
        variant={`${
          row.original.questions?.length ? 'default' : 'destructive'
        }`}>
        <Link
          to={`/dashboard/assignments/categories/${row.original.id}/questions`}>
          {row.original.questions?.length ?? 0}
        </Link>
      </Badge>
    ),
  },

  // 🔢 Order
  {
    accessorKey: 'order',
    header: 'Order',
    cell: ({row}) => <Badge variant="outline">{row.original.order}</Badge>,
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
      const category = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                to={`dashboard/assignments/${category.assessmentId}/categories/${category.id}`}>
                View Questions
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-destructive">
              Delete Category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
