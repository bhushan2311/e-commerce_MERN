import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserOrders from '../features/user/components/UserOrders'

function UserOrderPage() {
  return (
    <>
      <div>
        <Navbar>
          <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
            My orders
          </h1>
            <UserOrders></UserOrders>
        </Navbar>
      </div>
    </>
  )
}

export default UserOrderPage