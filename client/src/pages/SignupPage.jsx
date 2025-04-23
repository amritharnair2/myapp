import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userSignup } from '../services/userServices'
import { toast } from 'react-toastify'
import { saveUser } from '../redux/features/userSlice'

function SignupPage() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: ''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = () => {
    userSignup(values)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data.userObject));
        const userData = localStorage.getItem('user');
        const user = JSON.parse(userData);
        console.log(user)
        localStorage.setItem("token", res.data.token)
        toast.success("User Signup successful!!!")
        dispatch(saveUser(res.data.userObject))
        navigate("/")
      })
      .catch((err) => {
        toast.error(err.response.data.error, {
          position: 'top-center'
        })
      })
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('src/images/regimg.jpg')` }} 
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
      <div className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-xl p-8 w-[400px] shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-1">
          Flick<span className="text-red-500">Rate</span>
        </h1>
        <p className="text-center text-sm mb-4">
          Share your thoughts on every movie
        </p>
        <h2 className="text-center text-lg font-semibold mb-4 underline">
          Register Your Account
        </h2>
        <fieldset className="space-y-4">
          <div>
            <label className="block text-sm">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered w-full bg-white/80 text-black"
              required
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-white/80 text-black"
              required
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-white/80 text-black"
              required
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm">Confirm Password:</label>
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm your password"
              className="input input-bordered w-full bg-white/80 text-black"
              required
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <button
              className="btn bg-red-600 text-white w-full hover:bg-red-700"
              onClick={onSubmit}
            >
              Register
            </button>
          </div>
        </fieldset>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage
