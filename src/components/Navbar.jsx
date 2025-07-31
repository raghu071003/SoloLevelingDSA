import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-between p-5 text-xl'>
        <div className='flex gap-2 items-center justify-center p-2'>
            <p onClick={()=>navigate('/roadmap')}>RoadMap</p>
            <p>Progress</p>
        </div>
        <div className='flex gap-2 items-center justify-center p-2'>
            <p>Profile</p>
            <p>Signout</p>
        </div>
    </div>
  )
}

export default Navbar