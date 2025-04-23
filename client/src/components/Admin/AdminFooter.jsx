import React from 'react'


function Footer() {

  return (
    <div>
      <footer className="bg-base-100 text-base-content w-full p-4 mt-auto">
        <div className="flex items-center justify-between flex-wrap w-full">
          
          {/* Logo on the left */}
          <div className="ms-0">
            <a className="btn btn-ghost text-xl">
              <h1 className="text-3xl font-bold">
                Flick<span className="text-red-600">Rate</span>
              </h1>
            </a>
          </div>
          <div className="flex flex-col items-center mx-auto text-center">
            <p className="text-sm">&copy; 2025 FlickRate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
