'use client';
import {
  IconDotsVertical,
  IconLogout,
  IconUserCircle,
} from '@tabler/icons-react';
import defaultUserImage from '@/assets/default-image.jpg';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {useMemo} from 'react';
import {useNavigate} from 'react-router';
// import {useLogoutMutation, useProfileQuery} from '@/features/auth/authApi';
// import type {TUser} from '@/pages/Users/type';

export function NavUser() {
  const {isMobile} = useSidebar();
  const navigate = useNavigate();
  // const {data: profile, isFetching} = useProfileQuery(undefined, {
  //   refetchOnMountOrArgChange: true,
  // });
  // const [logout, {isLoading: isLoggingOut}] = useLogoutMutation();

  // const [setAvatarError] = useState(false);

  // Dummy user for display only
  const user = useMemo(
    () => ({
      id: 'dummy-1',
      displayName: 'John Doe',
      email: 'john.doe@example.com',
      avatarUrl: '', // empty to fallback to default image
    }),
    []
  );

  const handleLogout = () => {
    console.log('Dummy logout clicked');
    navigate('/login');

    // try {
    //   await logout().unwrap();
    // } catch (error) {
    //   console.error('Logout failed:', error);
    // }
  };

  // if (isFetching && !user) {
  //   return (
  //     <SidebarMenu>
  //       <SidebarMenuItem>
  //         <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
  //           Loading profile...
  //         </div>
  //       </SidebarMenuItem>
  //     </SidebarMenu>
  //   );
  // }

  // if (!user) {
  //   return (
  //     <SidebarMenu>
  //       <SidebarMenuItem>
  //         <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
  //           <Avatar className="h-8 w-8 rounded-lg grayscale">
  //             <AvatarFallback className="rounded-lg">?</AvatarFallback>
  //           </Avatar>
  //           <span>Guest</span>
  //         </div>
  //       </SidebarMenuItem>
  //     </SidebarMenu>
  //   );
  // }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              aria-label="User menu">
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                {/* {!avatarError && user.avatarUrl ? (
                  <AvatarImage
                    src={defaultUserImage}
                    // src={user.avatarUrl}
                    alt={user.displayName}
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <AvatarFallback className="rounded-lg">
                    {user.displayName?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                )} */}
                <AvatarImage
                  src={user.avatarUrl || defaultUserImage}
                  alt={user.displayName}
                  // onError={() => setAvatarError(true)}
                />
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.displayName}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <IconDotsVertical
                className="ml-auto size-4 opacity-70 group-hover:opacity-100"
                aria-hidden="true"
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.avatarUrl || defaultUserImage}
                    alt={user.displayName}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user.displayName?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user.displayName}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle className="mr-2 size-4" />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive">
              <IconLogout className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
