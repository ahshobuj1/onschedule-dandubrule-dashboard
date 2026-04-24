import {
  IconDashboard,
  IconUsers,
  IconReceipt2,
  IconMessageUser,
  IconListCheck,
  IconPalette,
  IconLock,
} from '@tabler/icons-react';

import {NavMain} from '@/components/nav-main';
import {NavUser} from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {Link} from 'react-router';
import {CalendarCheck} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const navData = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: IconDashboard,
  },
  {
    title: 'Users',
    url: '/dashboard/users',
    icon: IconUsers,
    permission: 'USER_VIEW',
  },
  {
    title: 'Plans',
    url: '/dashboard/plans',
    icon: IconReceipt2,
    permission: 'SYSTEM_VIEW',
  },
  {
    title: 'Clients',
    url: '/dashboard/clients',
    icon: IconMessageUser,
    permission: 'CLIENT_VIEW',
  },
  {
    title: 'Employees',
    url: '/dashboard/employees',
    icon: IconListCheck,
    permission: 'EMPLOYEE_VIEW',
  },
  {
    title: 'Transactions',
    url: '/dashboard/transactions',
    icon: IconReceipt2,
    permission: 'BILLING_VIEW',
  },
  {
    title: 'Landing Page',
    url: '/dashboard/landing-page',
    icon: IconPalette,
    permission: 'SYSTEM_EDIT',
  },
  {
    title: 'Permissions',
    url: '/dashboard/permissions',
    icon: IconLock,
    permission: 'USER_EDIT',
  },
];

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  const { role, permissions = [] } = useAuth();

  // Filter navigation items based on permissions
  const filteredNavMain = navData.filter((item) => {
    // Admin sees everything
    if (role === 'admin') return true;

    // If no permission required, show it
    if (!item.permission) return true;

    // Check if user has the required permission
    return permissions.includes(item.permission);
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link to="/dashboard">
                <CalendarCheck />

                <span className="text-base font-semibold">
                  On<span className="text-primary">Schedule</span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
