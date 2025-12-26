import type {ColumnDef} from '@tanstack/react-table';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {MoreHorizontal} from 'lucide-react';
import {formatDate} from '@/utils/formatDate';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import type {IAssessmentQuestion} from './type';

export const columns: ColumnDef<IAssessmentQuestion>[] = [
  // 🔢 Question No
  {
    accessorKey: 'questionId',
    header: '#',
    cell: ({row}) => <Badge variant="outline">{row.original.questionId}</Badge>,
  },

  // ❓ Question Text
  {
    accessorKey: 'question',
    header: 'Question',
    cell: ({row}) => (
      <p className="max-w-md truncate font-medium">{row.original.question}</p>
    ),
  },

  // 🔢 Order
  {
    accessorKey: 'order',
    header: 'Order',
    cell: ({row}) => <Badge variant="secondary">{row.original.order}</Badge>,
  },

  // 📄 Document Required
  {
    accessorKey: 'isDocument',
    header: 'Document',
    cell: ({row}) =>
      row.original.isDocument ? (
        <Badge className="bg-blue-600 text-white">Yes</Badge>
      ) : (
        <Badge variant="outline">No</Badge>
      ),
  },

  // ✍️ Input Field
  {
    accessorKey: 'isInputField',
    header: 'Input',
    cell: ({row}) =>
      row.original.isInputField ? (
        <Badge className="bg-green-600 text-white">Yes</Badge>
      ) : (
        <Badge variant="outline">No</Badge>
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
      const question = row.original;
      console.log(question);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Question</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-destructive">
              Delete Question
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
