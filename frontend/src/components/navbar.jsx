import React from 'react'
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
const Navbar = () => {
  const token = localStorage.getItem("authToken");
  let auth = true;
  if(!token) auth =false; // if token is not present then user is not logged in
  return(
    <Stack direction="row" p={3} spacing={2} sx={{ position:  "sticky", background: '#000000', top: 0 ,justifyContent:'space-between'}}>
      <Stack direction="row">
      <Link to='/' className='text-danger px-2'>Home</Link>
      <Link to='/flights' className='text-danger px-2'>Flights</Link>
      <Link to='/aboutus' className='text-danger px-2'>About Us</Link>
      </Stack> 
      <Stack direction="row">
        {auth ? (
          <>
              <Link to='/register' className='text-danger px-2'>SignUp</Link>
          </>
        ):(
          <>
          <Link to='/login' className='text-danger px-2'>Login</Link>
          <Link to='/register' className='text-danger px-2'>SignUp</Link>
          </>
        )
        }

      </Stack>
    </Stack>
  )
}

export default Navbar;