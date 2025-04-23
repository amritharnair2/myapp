import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import regImg from '../../images/regimg.jpg';
import { adminLogin } from '../../services/AdminServices';

function AdminLoginPage() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await adminLogin(values); 
      const { adminObject, token } = response;
      localStorage.setItem('admin-token', token);
      localStorage.setItem('admin', JSON.stringify(adminObject));
      toast.success("Admin Login Successful!");
      navigate('/admin');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed. Please try again.', {
        position: 'top-center',
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${regImg})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Frosted glass card */}
      <div className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-xl p-8 w-96 shadow-2xl m-5">
        <h1 className="text-4xl font-bold text-center mb-1">
          Flick<span className="text-red-500">Rate</span>
        </h1>
        <h1 className="text-center text-xl font-semibold mb-4">
          Admin Login
        </h1>
        <fieldset className="space-y-4">
          <div>
            <label className="block text-sm">Email:</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={onChange}
              placeholder="Enter your Email"
              className="input input-bordered w-full bg-white/80 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Password:</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={onChange}
              placeholder="Enter your password"
              className="input input-bordered w-full bg-white/80 text-black"
              required
            />
          </div>
          <div className="mt-4">
            <button
              className="btn bg-red-600 text-white w-full hover:bg-red-700"
              onClick={onSubmit}
            >
              Login
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default AdminLoginPage;
