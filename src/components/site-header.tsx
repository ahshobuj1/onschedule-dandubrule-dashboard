import {Separator} from '@/components/ui/separator';
import {SidebarTrigger} from '@/components/ui/sidebar';
import {useLocation, Link} from 'react-router';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Route configuration for breadcrumb labels
const routeConfig: Record<string, {label: string; hasLink: boolean}> = {
  dashboard: {label: 'Dashboard', hasLink: true},
  users: {label: 'Users', hasLink: true},
  courses: {label: 'Courses', hasLink: true},
  modules: {label: 'Modules', hasLink: true},
  lessons: {label: 'Lessons', hasLink: false},
  plans: {label: 'Course Plans', hasLink: false},
  profile: {label: 'Profile', hasLink: true},
};

// Helper to check if a segment is a UUID
const isUUID = (str: string): boolean => {
  return /^[a-f0-9-]{36}$/i.test(str);
};

function Breadcrumbs() {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);

  // Build breadcrumb items by filtering out IDs
  const breadcrumbItems: Array<{
    path: string;
    label: string;
    isLast: boolean;
    hasLink: boolean;
  }> = [];

  // Always add Home
  breadcrumbItems.push({
    path: '/',
    label: 'Home',
    isLast: false,
    hasLink: true,
  });

  let currentPath = '';
  parts.forEach((part, index) => {
    currentPath += '/' + part;

    // Skip UUIDs (they don't need to be shown in breadcrumbs)
    if (isUUID(part)) {
      return;
    }

    const routeInfo = routeConfig[part];
    const isLast = index === parts.length - 1;

    if (routeInfo) {
      breadcrumbItems.push({
        path: currentPath,
        label: routeInfo.label,
        isLast,
        hasLink: routeInfo.hasLink && !isLast,
      });
    } else {
      // Fallback for unknown routes
      const label = part
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      breadcrumbItems.push({
        path: currentPath,
        label,
        isLast,
        hasLink: !isLast,
      });
    }
  });

  // Mark the last item correctly
  if (breadcrumbItems.length > 0) {
    breadcrumbItems[breadcrumbItems.length - 1].isLast = true;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <div key={item.path} className="flex items-center">
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : item.hasLink ? (
                <BreadcrumbLink asChild>
                  <Link to={item.path}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <span className="text-muted-foreground">{item.label}</span>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function SiteHeader() {
  return (
    <header className="flex h-[--header-height] shrink-0 py-2 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[--header-height]">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1  cursor-pointer" />
        <Separator orientation="vertical" className="mx-2 h-4" />
        <Breadcrumbs />
        <div className="ml-auto flex items-center gap-2"></div>
      </div>
    </header>
  );
}
