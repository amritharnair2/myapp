import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

function UserLayout() {
  return (
    <div className="flex w-full max-w-screen min-h-screen flex-col"> 
      <Header />
      <main className='flex-grow px-8 py-4 bg-base-200'>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  )
}

export default UserLayout
