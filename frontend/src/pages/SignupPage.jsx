import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
// import {ToastContainer,toast} from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
import AOuth from "../Components/AOuth";


function SignupPage() {
  const [formData, setFormData] = useState({}); // ✅ inside the component
  const [error, Seterror]= useState(null);
  const [ Loading, SetLoading]= useState(false)
  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      SetLoading(true),
      Seterror(null)

      if(!(formData.username && formData.email && formData.password)){
        toast.error("Please fill all fields")
        SetLoading(false)
        return;
      }
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if(data.success== false)
      {
        toast.error(data.message || 'Registration failed')
        Seterror(data.message)
        SetLoading(false)
        return;
      }
      
      toast.success("User registered successfully!", {
  onClose: () => navigate("/signin")
});

     
    } 
    catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.')
      SetLoading(error.message)
      SetLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Signup</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={handleChange}
            type="text"
            id="username"
            placeholder="Username"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            onChange={handleChange}
            type="email"
            id="email"
            placeholder="Email"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            onChange={handleChange}
            type="password"
            id="password"
            placeholder="Password"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-slate-700 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
          <AOuth/>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-700 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default SignupPage;