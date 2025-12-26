import {useState} from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Button} from '@/components/ui/button';
import {ArrowDownNarrowWide, ArrowUpNarrowWide} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {AssignmentTable} from './AssignmentTable';
import CreateAssignment from './CreateAssignment';

export default function Assignment() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // ✅ Sort options array
  const sortOptions = [
    {value: 'id', label: 'ID'},
    {value: 'title', label: 'Title'},
    {value: 'isPublished', label: 'Published'},
    {value: 'createdAt', label: 'Created At'},
    {value: 'updatedAt', label: 'Updated At'},
  ];

  const handleSearch = () => setQuery(search);
  const handleSort = (value: string) => setSort(value);
  const handleSortOrder = () =>
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

  return (
    <div className="p-2">
      <header className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold">Assignment</h1>
        </div>
        <div className="flex items-center gap-2">
          <Select onValueChange={handleSort} value={sort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleSortOrder} size="icon" variant="outline">
            {sortOrder === 'asc' ? (
              <ArrowUpNarrowWide />
            ) : (
              <ArrowDownNarrowWide />
            )}
          </Button>

          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch}>Search</Button>
          <CreateAssignment trigger={<Button>+ Create Assignment</Button>} />
        </div>
      </header>

      <AssignmentTable
        searchQuery={query}
        sortQuery={sort}
        sortOrder={sortOrder}
      />
    </div>
  );
}
