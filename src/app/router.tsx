// src/app/router.tsx
import {createBrowserRouter} from 'react-router';
import Dashboard from '@/pages/Dashboard/Dashboard';
import DashboardLayout from '@/layout/dashboard-layout';
import Users from '@/pages/Users/Users';
import LoginPage from '@/pages/Login/LoginPage';
// import Courses from '@/pages/Course/Courses';
// import ProfileForm from '@/pages/Profile/ProfileForm';
// import Transactions from '@/pages/Transactions/Transactions'; // ✨ Import
// import Supplier from '@/pages/Supplier/Supplier';
// import Assignment from '@/pages/Assignment/Assignment';
// import Questions from '@/pages/Questions/Questions';
import Clients from '@/pages/Clients/Clients';
import Epmloyees from '@/pages/Epmloyees/Epmloyees';
import Plan from '@/pages/Plan/Plan';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      // <ProtectedRoute>
      <DashboardLayout />
      // </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'plans',
        element: <Plan />,
      },
      {
        path: 'clients',
        element: <Clients />,
      },
      {
        path: 'employees',
        element: <Epmloyees />,
      },
      // {
      //   path: 'suppliers',
      //   element: <Supplier />,
      // },
      // {
      //   path: 'assignments',
      //   element: <Assignment />,
      // },
      // {
      //   path: 'assignments/:assignmentId/categories',
      //   element: <Categories />,
      // },
      // {
      //   path: 'assignments/categories/:categoryId/questions',
      //   element: <Questions />,
      // },
      // {
      //   path: 'Courses',
      //   element: <Courses />,
      // },

      // {
      //   path: 'vendor',
      //   element: <Users />,
      // },
      // {
      //   path: 'transactions',
      //   element: <Transactions />,
      // },
      {
        path: '*',
        element: <h1>404</h1>,
      },
    ],
  },
]);

export default router;

// {
//     "success": true,
//     "message": "Suppliers retrieved successfully",
//     "data": [
//         {
//             "id": "93009819-bb81-4836-b660-1e766a552b3f",
//             "name": "Sabbir Mridha",
//             "contactPerson": "Sabbir Mridha",
//             "email": "sabbirmridha880@gmail.com",
//             "phone": "+8801790377973",
//             "category": "security",
//             "criticality": "MEDIUM",
//             "contractStartDate": "2025-12-18T00:00:00.000Z",
//             "contractEndDate": "2025-12-30T00:00:00.000Z",
//             "documentUrl": "https://res.cloudinary.com/dx8o5d32h/image/upload/v1765484544/suppliers/documents/CoverLatter_zfs5so.pdf",
//             "documentType": "application/pdf",
//             "isDeleted": false,
//             "createdAt": "2025-12-11T20:22:14.113Z",
//             "updatedAt": "2025-12-11T20:22:14.113Z",
//             "vendorId": "d2e9d796-1e45-4b99-9941-46c0c825e5a7",
//             "invitationSentAt": "2025-12-11T20:22:14.112Z",
//             "invitationToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhYmJpcm1yaWRoYTg4MEBnbWFpbC5jb20iLCJ2ZW5kb3JJZCI6ImQyZTlkNzk2LTFlNDUtNGI5OS05OTQxLTQ2YzBjODI1ZTVhNyIsInR5cGUiOiJzdXBwbGllcl9pbnZpdGF0aW9uIiwiaWF0IjoxNzY1NDg0NTM0LCJleHAiOjE3NjYwODkzMzR9.XP8MGvuI7NLYM9HsWbMKiZN_R3zdPlUXQkCOkZI0w68",
//             "userId": null,
//             "isActive": false,
//             "companyLogo": null
//         }
//     ]
// }
