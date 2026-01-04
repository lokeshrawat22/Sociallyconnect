import React from 'react'
import { toast } from "react-toastify";
const Logout = () => {
    const logout = ()=>{
        localStorage.removeItem("token");
        toast.success("Logged out");
    }
  return (
    <button className='mt-20' onClick={logout}>Logout</button>
  )
}

export default Logout