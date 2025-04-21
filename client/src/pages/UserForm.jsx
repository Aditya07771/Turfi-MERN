import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import Navbar from '../component/Navbar';

const UserForm = () => {


  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true; // Sends cookies

      if (state === "Sign Up") {
        toast.success("Sign-up successful (Backend integration needed)");
      } else {
        const { data } = await axios.post('/api/auth/login', { email, password });

        if (data.success) {
          toast.success("Login successful (Backend integration needed)");
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (

    <><Navbar /><div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text:sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3 '>
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className='text-center text-sm mb-6'>
          {state === "Sign Up" ? "Create Your Account" : "Login to Your Account!"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none text-white"
                type="text"
                placeholder='Full Name'
                required />
            </div>
          )}

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none text-white"
              type="email"
              placeholder='Email ID'
              required />
          </div>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none text-white"
              type="password"
              placeholder='Password'
              required />
          </div>

          <p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>
            Forgot password?
          </p>

          <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className='text-gray-400 text-center text-xs mt-4'>
            Already have an account? {' '}
            <span onClick={() => setState("Login")} className='text-blue-400 cursor-pointer underline'>Login here</span>
          </p>
        ) : (
          <p className='text-gray-400 text-center text-xs mt-4'>
            Don't have an account? {' '}
            <span onClick={() => setState("Sign Up")} className='text-blue-400 cursor-pointer underline'>Sign up</span>
          </p>
        )}
      </div>
    </div></>
  );
};

export default UserForm;
