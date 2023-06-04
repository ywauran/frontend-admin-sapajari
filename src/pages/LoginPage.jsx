import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">SapaJari</h1>
        <h2 className="mb-8 mt-2 text-2xl font-bold text-center">Login</h2>
        <form onSubmit={Auth}>
          <div className="mb-4">
            <label className="label__input" htmlFor="username">
              Email
            </label>
            <input
              className="input"
              type="text"
              name="username"
              id="username"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="label__input" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full button__primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
