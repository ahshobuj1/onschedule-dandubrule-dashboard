import * as React from 'react';
import {
  IconDashboard,
  IconUsers,
  IconReceipt2,
  IconMessageUser,
  IconListCheck,
  IconPalette,
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

const data = {
  user: {
    name: 'shadcn',
    email: 'ahshobuj@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: IconDashboard,
    },
    {
      title: 'Users',
      url: '/dashboard/users',
      icon: IconUsers,
    },
    {
      title: 'Plans',
      url: '/dashboard/plans',
      icon: IconReceipt2,
    },
    {
      title: 'Clients',
      url: '/dashboard/clients',
      icon: IconMessageUser,
    },
    {
      title: 'Employees',
      url: '/dashboard/employees',
      icon: IconListCheck,
    },
    {
      title: 'Transactions',
      url: '/dashboard/transactions',
      icon: IconReceipt2,
    },
    {
      title: 'Landing Page',
      url: '/dashboard/landing-page',
      icon: IconPalette,
    },
  ],
};
export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
