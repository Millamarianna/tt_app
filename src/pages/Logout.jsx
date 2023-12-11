import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import cookie from 'cookie'

const Logout = () => {
  const [apiError, setApiError] = useState();
  const { setAuth } = useAuth();
  const cookie = require('cookie');
  let navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, } = useForm();

  const getUserData = async (token) => {
    const response = await fetch("https://damp-basin-12729-bd0230035c83.herokuapp.com/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      let userData = await response.json();
      console.log("getUserData:" + userData);
      userData["token"] = token;
      setAuth((prevAuth) => {
        console.log("Login: getUserData:" + JSON.stringify(userData));
        userData["token"] = token;
        console.log("Login: Authprovider, getuserdata, if response ok, auth:" + JSON.stringify(prevAuth));
        return userData;
      });
      setApiError(null);
      navigate("/", { replace: true });
    }
  };

  const onFormSubmit = async (data) => {
    const response = await fetch("https://damp-basin-12729-bd0230035c83.herokuapp.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const result = await response.json();
      putCookies(result);
    } else {
      let errorResponse = await response.json();
      setApiError(errorResponse["detail"]);
      setAuth(null);
    }
  };

  function putCookies(res) {
    console.log('Response from server:', res);
    const jwt = res.token;
    console.log('Before setting cookie:', document.cookie);
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/, SameSite=None";
    document.cookie = cookie.serialize(
        'jwt', jwt,
        {
          path: '/',
          sameSite: 'strict',
          maxAge:  30 * 24 * 60 * 60,

        }
      )
      getUserData(jwt);
      console.log('After setting cookie:', document.cookie);
      
  }


  const onErrors = (errors) => console.error(errors);

  return (
    <div className="mx-auto p-10 rounded-lg shadow-2xl">
      <h2 className="text-xl text-primary text-center font-bold my-2">
        Login page
      </h2>

      <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
        <div className="flex flex-col justify-center items-center">
          <input
            type="text"
            placeholder="email@email.com"
            className="input input-bordered input-accent w-full max-w-xs m-3"
            name="email"
            autoComplete="off"
            {...register("email", { required: "The email is required" })}
          />
          {errors?.email && errors.email.message}

          <input
            type="password"
            placeholder="your password"
            className="input input-bordered input-accent w-full max-w-xs m-3"
            name="password"
            {...register("password", { required: "The password is required" })}
          />
          {errors?.password && errors.password.message}

          <button className="btn btn-outline btn-accent m-3 btn-block">
            Login
          </button>
        </div>
      </form>

      {apiError && (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{apiError}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;