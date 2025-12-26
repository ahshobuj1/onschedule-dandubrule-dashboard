import {NavLink} from 'react-router';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {cn} from '@/lib/utils';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ElementType;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <NavLink
                to={item.url}
                end={item.url === '/dashboard'} // ensure exact match for dashboard
                className={({isActive}) =>
                  cn(
                    'relative group/navitem transition-all duration-200 rounded-lg border-2 flex items-center gap-3 px-3 py-3',
                    isActive
                      ? 'bg-primary  border text-background shadow-lg'
                      : 'bg-transparent border-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-md'
                  )
                }>
                {({isActive}) => (
                  <>
                    {/* Active indicator bar */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-background rounded-r-full shadow-sm" />
                    )}

                    {/* Icon */}
                    {item.icon && (
                      <item.icon
                        className={cn(
                          'w-5 h-5 transition-transform duration-200 shrink-0',
                          isActive
                            ? 'text-background'
                            : 'text-muted-foreground group-hover/navitem:text-foreground group-hover/navitem:scale-110'
                        )}
                      />
                    )}

                    {/* Title */}
                    <span
                      className={cn(
                        'font-medium transition-all duration-200',
                        isActive
                          ? 'text-background font-semibold'
                          : 'group-hover/navitem:text-foreground'
                      )}>
                      {item.title}
                    </span>
                  </>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
