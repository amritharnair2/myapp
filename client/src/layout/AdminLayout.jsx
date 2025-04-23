import React from 'react'
import { Outlet } from "react-router-dom";
import AdminHeader from '../components/Admin/AdminHeader';
import AdminFooter from '../components/Admin/AdminFooter';

function AdminLayout() {
  return (
    <div className="flex w-full max-w-screen min-h-screen flex-col"> 
      <AdminHeader />
      <main className='flex-grow px-8 py-4 bg-base-200'>
        <Outlet /> 
      </main>
      <AdminFooter />
    </div>
  )
}

export default AdminLayout