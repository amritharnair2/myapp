import React from 'react'
import { persistor } from '../../redux/store'
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from '../../redux/features/userSlice';
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    try {
        persistor.purge()
        localStorage.removeItem("admin-token");
        dispatch(clearUser())
        toast.success("Admin Logout successful!!!");
        navigate("/admin/login");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
  <div className="relative navbar bg-base-100 text-base-content w-full shadow-sm h-20">
    {/* Logo Left */}
    <div className="absolute left-4 top-1/2 -translate-y-1/2">
      <a className="btn btn-ghost text-xl">
        <h1 className="text-3xl font-bold">
          Flick<span className="text-red-600">Rate</span>
        </h1>
      </a>
    </div>

    {/* Center Nav */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <nav className="flex gap-8 text-md font-semibold">
        <Link to="/admin" className="text-gray-400 hover:underline">Movies</Link>
        <Link to="/admin/user" className="text-gray-400 hover:underline">Users</Link>
        <Link to="/admin/review" className="text-gray-400 hover:underline">Reviews</Link>
      </nav>
    </div>

    {/* Admin Right */}
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-3 items-center">
      <span className='text-md me-5'>Welcome Admin</span>
      <span>
        <a onClick={handleLogout} className='cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" x2="9" y1="12" y2="12"/>
          </svg>
        </a>
      </span>
    </div>
  </div>
</div>

  )
}

export default Header