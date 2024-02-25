import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, Navigate } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { resetOrder, selectCurrentOrder } from "../features/order/orderSlice";

export const OrderSuccessPage = () => {
  const params = useParams();                 // here getting paramaters(like /:id) that is passed to url of this page 

  const currentOrder = useSelector(selectCurrentOrder);

  const dispatch = useDispatch();
  useEffect(() => {
    //reset cart
    dispatch(resetCartAsync());

    // //reset currentOrder
    // was reseting order here, but now commented as i am reseting order at home page i.e keeping currentOrder state not null at order-success-page
    // dispatch(resetOrder());
  }, [dispatch]);

  return (
    <>
      
      {!params.id && !currentOrder && (                    // !currentOrder: if currentOrder is null & !params.id: if url doesnt contains id, then navigate to homepage.
        <Navigate to="/" replace={true}></Navigate>
      )}
      {
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">
              Order Successfully Placed
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Order No. #{params.id}
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {" You can check your order in My account > My Orders"}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      }
    </>
  );
};

export default OrderSuccessPage;
