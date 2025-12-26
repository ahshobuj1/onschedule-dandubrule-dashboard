import {useState} from 'react';
import {CourseTable} from './CourseTable';
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
import CreateCourse from './CreateCourse';

export default function Courses() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // ✅ Sort options array
  const sortOptions = [
    {value: 'id', label: 'ID'},
    {value: 'title', label: 'Title'},
    {value: 'difficultyLevel', label: 'Difficulty Level'},
    {value: 'basePrice', label: 'Base Price'},
    {value: 'discountedPrice', label: 'Discounted Price'},
    {value: 'status', label: 'Status'},
    {value: 'estimatedDuration', label: 'Estimated Duration'},
    {value: 'isPublished', label: 'Published'},
    {value: 'publishedAt', label: 'Published At'},
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
          <h1 className="text-2xl font-bold">Courses</h1>
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
          <CreateCourse trigger={<Button>+ Create Course</Button>} />
        </div>
      </header>

      <CourseTable searchQuery={query} sortQuery={sort} sortOrder={sortOrder} />
    </div>
  );
}
