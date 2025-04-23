import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import UserLayout from "../layout/UserLayout";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "../components/ProtectedRoute";
import SingleMoviePage from "../pages/SingleMoviePage";
import ProfilePage from "../pages/ProfilePage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import AdminRoute from "../components/Admin/AdminRoute";
import AdminPage from "../pages/admin/AdminPage";
import EditProfile from "../pages/EditProfile";
import AdminLoginPage from "../pages/admin/AdminLogin";
import AdminLayout from "../layout/AdminLayout";
import AdminUsersPage from "../pages/admin/UserPage";
import AdminReviewsPage from "../pages/admin/ReviewPage";
import AddMovie from "../pages/admin/AddMovie";
import SingleMovie from "../pages/admin/SingleMovie"
import UpdateMoviePage from "../pages/admin/UpdateMovie";


export const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: <AdminLoginPage/>
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    errorElement: <h1>Error Page</h1>,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: "review",
        element: <AdminReviewsPage />,
      },
      {
        path: "user",
        element: <AdminUsersPage />,
      },
      {
        path: "addmovie",
        element: <AddMovie />,
      },
      {
        path: "updatemovie/:movieId",
        element: <UpdateMoviePage />,
      },
      {
        path: "singlemovie/:movieId",
        element: <SingleMovie />,
      },

    ]
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage/>
  },
    {
      path: "/login",
      element: <LoginPage/>
    },
    {
      path: "/signup",
      element: <SignupPage/>
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <UserLayout />
        </ProtectedRoute>
      ),
      errorElement: <h1>Error Page</h1>,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "movie/:movieId",   
          element: <SingleMoviePage />,
        },
        {
          path: "profile",   
          element: <ProfilePage />,
        }
        ,
        {
          path: "editprofile",
          element: <EditProfile />
        }
      ]

    }
    
  ]);

