import React from 'react'
import { TextAlignJustify, LogOut } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../store/auth-slice'
import { useNavigate } from 'react-router-dom'
const AdminHeader = ({setOpen}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
    navigate("/auth/login");
  }

  return (
    <div className='flex items-center justify-between px-4 py-3 bg-background border'>
        <Button onClick ={()=>setOpen(true)} className="lg:hidden sm:block">
          <TextAlignJustify />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
        <div className='flex flex-1 justify-end'>
          <Button onClick={handleLogout} className="ml-2 inline-flex px-4 py-2 rounded-xl shadow" >
            <LogOut />
            LogOut
          </Button>
        </div>
    </div>
  )
}

export default AdminHeader
