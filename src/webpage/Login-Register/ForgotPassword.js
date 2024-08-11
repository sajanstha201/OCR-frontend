import React, { useState } from 'react';
import { activate_loader, showAlert } from '../../components/AlertLoader';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
export const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const location=useLocation()
  const queryPrams=new URLSearchParams(location.search)
  const email=queryPrams.get('email')
  const otp=queryPrams.get('otp')
  const baseUrl=useSelector((state)=>state.baseUrl).backend
  const [isSuccess,setIsSuccess]=useState(false)
  if(isSuccess){
    return <Navigate to='/login'></Navigate>
  }
  const handleSubmit =async (e) => {
    try{
      activate_loader(true)
        e.preventDefault();
        if (newPassword !== confirmPassword) {
        showAlert('Passwords do not match','red');
        return;
        } 
        else {
        const response=await axios.post(baseUrl+'api/change-password/',{
            'email':email,
            'otp':otp,
            'password':newPassword
        })
        setIsSuccess(true)
        console.log(response.data)
        }
    }
    catch(error){
            console.log(error);
            showAlert(error.response.data.error,'red')
    }
    finally{
      activate_loader(false)
    }
}


  return (
    <div className="absolute h-screen w-full bg-white flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-100 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={ (e) => {
                setNewPassword(e.target.value);
              }}
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};
