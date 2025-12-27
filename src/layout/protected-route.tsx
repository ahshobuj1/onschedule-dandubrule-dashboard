// // src/components/layout/protected-route.tsx
// import {Navigate, useLocation} from 'react-router';
// import {useAuth} from '@/hooks/useAuth';
// import {toast} from 'sonner';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
//   const {isAuthenticated, isLoading, role} = useAuth();
//   const location = useLocation();

//   if (isLoading) {
//     return <div>Please wait a moment, Checking Authentication...</div>;
//   }

//   // Not logged in
//   if (!isAuthenticated) {
//     return <Navigate to="/dashboard" state={{from: location}} replace />;
//   }

//   // Role check — only ADMIN allowed
//   if (role !== import.meta.env.VITE_AUTHORIZED_ROLE) {
//     toast.warning('You are not authorized!');
//     return <Navigate to="/login" replace />;
//   }

//   // Otherwise show children
//   return <>{children}</>;
// };
