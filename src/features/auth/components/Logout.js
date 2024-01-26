import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser, signOutAsnyc } from '../authSlice'
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Logout = () => {
    
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);

    useEffect(()=>{
        dispatch(signOutAsnyc());
    })

    // but useEffect runs after render, so we have to delay navigate part
  return (
    <>
        {!user && <Navigate to="/login" replace={true}></Navigate>}
    </>
  )
}

export default Logout;
