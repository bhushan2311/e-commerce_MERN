import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../authSlice'
import { Navigate } from 'react-router-dom';
// It is a component that protects component under it
// we r using it where if the user is logged in then only show the component under </Protected> as we used like local storage
export const Protected = ({children}) => {
    const user = useSelector(selectLoggedInUser);
    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
  return (
    children
  )
}