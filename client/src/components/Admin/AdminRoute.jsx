// import { useSelector } from 'react-redux'
// import { Navigate } from 'react-router-dom'

// const AdminRoute = ({ children }) => {
//   const user = useSelector((state) => state.user.user)
//   if (!user || user.role !== 'admin') {
//     return <Navigate to="/unauthorized" />
//   }
//   return children
// }

// export default AdminRoute

import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("admin-token");
  return token ? children : <Navigate to="/unauthorized" replace />;
};

export default AdminRoute;

