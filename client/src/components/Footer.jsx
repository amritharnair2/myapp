import React from 'react'
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()

  return (
    <div>
      <footer className="bg-base-100 text-base-content w-full p-4 mt-auto">
        <div className="flex items-center justify-between flex-wrap w-full">
          
          {/* Logo on the left */}
          <div className="ms-0">
            <a className="btn btn-ghost text-xl" onClick={() => navigate("/")}>
              <h1 className="text-3xl font-bold">
                Flick<span className="text-red-600">Rate</span>
              </h1>
            </a>
          </div>

          {/* Centered content */}
          <div className="flex flex-col items-center mx-auto text-center">
            <p className="text-sm">&copy; 2025 FlickRate. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-1 text-sm">
              <a href="#" className="text-gray-400 hover:text-red">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-red">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-red">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer



