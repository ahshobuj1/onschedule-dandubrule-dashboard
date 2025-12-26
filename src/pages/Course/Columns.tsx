import type {ColumnDef} from '@tanstack/react-table';
import type {TCourse} from './type';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {ChevronDown, MoreHorizontal} from 'lucide-react';
import {Link} from 'react-router';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import DeleteCourse from './DeleteCourse';
import EditCourse from './EditCourse';

export const columns: ColumnDef<TCourse>[] = [
  {
    id: 'thumbnailUrl',
    header: 'Thumbnail',
    cell: ({row}) => {
      const thumbnail = row.original.thumbnailUrl;
      return (
        <EditCourse
          item={row.original}
          trigger={
            <div className="aspect-video h-20 w-32 overflow-hidden rounded-lg border">
              <img
                src={thumbnail || 'https://placehold.co/300x200?text=No+Image'}
                alt={row.original.title}
                className="h-full w-full object-cover"
              />
            </div>
          }
        />
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({row}) => (
      <EditCourse item={row.original} trigger={<h1>{row.original.title}</h1>} />
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({row}) => {
      const description = row.original.description || '—';

      if (description.length <= 50) {
        return <p className="whitespace-pre-wrap text-sm">{description}</p>;
      }
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="h-auto justify-start text-left text-sm p-2">
              <p className="text-sm flex items-center gap-2">
                {description.length > 50
                  ? description.slice(0, 30) + '...'
                  : description}
                <ChevronDown size={16} />
              </p>
            </Button>
          </PopoverTrigger>

          <PopoverContent className=" p-4" align="start">
            <ScrollArea className="max-h-[60vh]">
              <p className="whitespace-pre-wrap text-sm">{description}</p>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      );
    },
  },
  {
    accessorKey: 'difficultyLevel',
    header: 'Level',
    cell: ({row}) => {
      const level = row.original.difficultyLevel;
      const color =
        level === 'beginner'
          ? 'bg-green-500'
          : level === 'intermediate'
          ? 'bg-yellow-500'
          : 'bg-red-500';
      return (
        <Badge className={`${color} text-white capitalize`}>{level}</Badge>
      );
    },
  },
  {
    accessorKey: 'estimatedDurationHours',
    header: 'Duration',
    cell: ({row}) => (
      <span>{row.original.estimatedDurationHours ?? '—'} hrs</span>
    ),
  },
  {
    accessorKey: 'basePrice',
    header: 'Price',
    cell: ({row}) => {
      const {basePrice, discountedPrice} = row.original;

      return (
        <div className="flex flex-col">
          <span className="font-semibold">${discountedPrice}</span>
          {discountedPrice ? (
            <span className="text-xs line-through text-muted-foreground">
              ${basePrice}
            </span>
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: 'isPublished',
    header: 'Status',
    cell: ({row}) =>
      row.original.isPublished ? (
        <Badge className="bg-blue-500 text-white">Published</Badge>
      ) : (
        <Badge variant="outline">Draft</Badge>
      ),
  },
  {
    accessorKey: 'modules',
    header: 'Modules',
    cell: ({row}) => {
      const modules = row.original.modules ?? [];
      const courseId = row.original.id;

      return (
        <Link to={`/dashboard/courses/${courseId}/modules`}>
          <Button variant="link" className="p-0 h-auto font-medium">
            {modules.length} {modules.length === 1 ? 'Module' : 'Modules'}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: 'coursePlans',
    header: 'Plans',
    cell: ({row}) => {
      const coursePlans = row.original.coursePlans ?? [];
      const courseId = row.original.id;
      return (
        <Link to={`/dashboard/courses/${courseId}/plans`}>
          <Button variant="link" className="p-0 h-auto font-medium">
            {coursePlans.length} {coursePlans.length === 1 ? 'Plan' : 'Plans'}
          </Button>
        </Link>
      );
    },
  },
  // {
  //   accessorKey: 'hasFinalQuiz',
  //   header: 'Final Quiz',
  //   cell: ({row}) => {
  //     console.log(row.original);
  //     const hasFinalQuiz = row.original.hasFinalQuiz;
  //     return (
  //       <Link to={`/dashboard/courses/${row.original.id}/quizes`}>
  //         <Badge className={`${hasFinalQuiz ? 'bg-green-500' : 'bg-red-500'}`}>
  //           {hasFinalQuiz ? 'Yes' : 'No'}
  //         </Badge>
  //       </Link>
  //     );
  //   },
  // },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({row}) => {
      const course = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => console.log('View', course.id)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Edit', course.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" asChild>
              <DeleteCourse
                id={course.id!}
                onSuccess={() => console.log('Course deleted successfully')}
                trigger={
                  <Button className="text-destructive w-full" variant={'ghost'}>
                    Delete
                  </Button>
                }
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
