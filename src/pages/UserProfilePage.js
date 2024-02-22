import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserProfile from '../features/user/components/UserProfile'

function UserProfilePage() {
  return (
    <>
      <div>
        <Navbar>
        <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
            My Profile
          </h1>
            <UserProfile></UserProfile>
        </Navbar>
      </div>
    </>
  )
}

export default UserProfilePage