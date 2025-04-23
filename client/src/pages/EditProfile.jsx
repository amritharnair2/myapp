import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { userUpdate } from '../services/userServices';
import { saveUser } from '../redux/features/userSlice';
import { Eye, EyeOff } from 'lucide-react';

function EditProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);

  const [values, setValues] = useState({
    name: user?.name || '',
    email: user?.email || '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    profilepic: null,
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'profilepic') {
      setValues({ ...values, profilepic: files[0] });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    if (values.oldPassword) formData.append('oldPassword', values.oldPassword);
    if (values.newPassword) formData.append('newPassword', values.newPassword);
    if (values.confirmNewPassword) formData.append('confirmNewPassword', values.confirmNewPassword);
    if (values.profilepic) formData.append('profilepic', values.profilepic);

    try {
      const res = await userUpdate(formData); 
      const updatedUser = res.data.updatedUser;
      console.log(updatedUser)
      toast.success('Profile updated successfully!');
      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch(saveUser(updatedUser));
      navigate('/profile');
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Update failed');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold text-center mb-4">Edit Profile</h1>
        <fieldset className="space-y-4">
          <div>
            <label className="block text-sm">Name:</label>
            <input type="text" name="name" value={values.name} className="input input-bordered w-full bg-white/80 text-black"
              onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm">Email:</label>
            <input type="email" name="email" value={values.email} className="input input-bordered w-full bg-white/80 text-black"
              onChange={handleChange} />
          </div>
          <div className="relative">
            <label className="block text-sm">Old Password:</label>
            <input type={showOld ? 'text' : 'password'} name="oldPassword" placeholder="Enter old password"
              className="input input-bordered w-full bg-white/80 text-black" onChange={handleChange} />
            <div className="absolute right-2 top-9 cursor-pointer text-black" onClick={() => setShowOld(!showOld)}>
              {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm">New Password:</label>
            <input type={showNew ? 'text' : 'password'} name="newPassword" placeholder="Enter new password"
              className="input input-bordered w-full bg-white/80 text-black" onChange={handleChange} />
            <div className="absolute right-2 top-9 cursor-pointer text-black" onClick={() => setShowNew(!showNew)}>
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm">Confirm New Password:</label>
            <input type={showConfirm ? 'text' : 'password'} name="confirmNewPassword" placeholder="Confirm password"
              className="input input-bordered w-full bg-white/80 text-black" onChange={handleChange} />
            <div className="absolute right-2 top-9 cursor-pointer text-black" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
          <div>
            <label className="block text-sm">Profile Picture:</label>
            <input type="file" name="profilepic" className="file-input file-input-bordered w-full bg-white/80 text-black"
              accept="image/*" onChange={handleChange} />
          </div>
          <div className="mt-4">
            <button className="btn bg-red-600 text-white w-full hover:bg-red-700" onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default EditProfilePage;

