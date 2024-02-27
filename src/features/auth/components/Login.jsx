import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUserAsync } from "../authSlice";
// import { increment, incrementByAmount, selectCount } from "./counterSlice";
import { Link, Navigate } from "react-router-dom";
import { selectError, selectLoggedInUser } from "../authSlice";
import { useAlert } from "react-alert";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function Login() {
  //   const count = useSelector(selectCount);
  const alert = useAlert();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const showError = useSelector(selectError);

  const error = useSelector(selectLoggedInUser);
  const user = useSelector(selectLoggedInUser);
  // console.log(errors);

  useEffect(() => {
    if (showError) {
      alert.error("Invalid username or password");
    }
  }, [showError]);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {user && <Navigate to="/" replace={true} />}{" "}
      {/* if credential are correct it will navigate to home page */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="/shopee.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              {
                dispatch(
                  loginUserAsync({ email: data.email, password: data.password })
                );
              }
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                      message: "Email is not valid",
                    },
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"} // Toggle input type
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10" // Add padding-right for icon
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility} // Toggle password visibility on click
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                  {/* Toggle eye icon based on password visibility */}
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              {error && <p className="text-red-500">{error.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create a new account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
