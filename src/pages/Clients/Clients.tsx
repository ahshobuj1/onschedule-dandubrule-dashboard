import {useState} from 'react';
import {Input} from '@/components/ui/input';

import {Button} from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {ArrowDownNarrowWide, ArrowUpNarrowWide} from 'lucide-react';
import ClientsTable from './ClientsTable';

export default function Clients() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // ✅ Sorting options array
  const sortOptions = [
    {value: 'displayName', label: 'Name'},
    {value: 'email', label: 'Email'},
    {value: 'createdAt', label: 'Created At'},
    {value: 'updatedAt', label: 'Updated At'},
    {value: 'role', label: 'Role'},
    {value: 'status', label: 'Status'},
  ];

  const handleSearch = () => setQuery(search);
  const handleSort = (value: string) => setSort(value);
  const handleSortOrder = () =>
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

  return (
    <div className="p-2">
      <header className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Clients</h1>
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
        </div>
      </header>

      <ClientsTable
        searchQuery={query}
        sortQuery={sort}
        sortOrder={sortOrder}
      />
    </div>
  );
}
