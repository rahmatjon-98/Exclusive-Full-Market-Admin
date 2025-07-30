import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeClosed } from "lucide-react";
import { useForm } from "react-hook-form";
import img from "../../shared/images/Group 1116606595 (1).svg";
import { useLoginMutation } from "../../entities/allApi";
// import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [btnShow, setbtnShow] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [login] = useLoginMutation();

  const onSubmit = async (data) => {
    console.log("Login form data:", data);
    try {
      const response = await login({
        userName: data.adminEmail,
        password: data.adminPassword,
      }).unwrap();

      localStorage.setItem("admin_token", response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(t("Login.error"));
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 h-full bg-[#1C2536] flex items-center justify-center">
        <div className="w-full px-10">
          <h1 className="text-2xl text-white font-medium">
            Welcome to admin panel
          </h1>
          <img className="w-3/5" src={img} alt="admin visual" />
        </div>
      </div>

      <div className="w-1/2 h-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-3/5 relative"
        >
          <label className="text-2xl text-[#111927] font-bold">Log in</label>

          <input
            className="border border-[#E5E5E5] rounded w-full p-2.5 outline-none"
            type="text"
            placeholder="Admin name"
            autoComplete="email"
            {...register("adminEmail", {
              required: true,
              maxLength: 30,
            })}
          />
          {errors.adminEmail && (
            <p className="text-red-500 text-sm">Max 30 characters</p>
          )}

          <div className="border border-[#E5E5E5] rounded w-full relative">
            <input
              className="p-2.5 outline-none w-9/10"
              type={btnShow ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              {...register("adminPassword", {
                required: true,
                minLength: 4,
              })}
            />
            <button
              type="button"
              className="absolute right-2 top-2.5 z-10 cursor-pointer"
              onClick={() => setbtnShow(!btnShow)}
            >
              {btnShow ? <Eye strokeWidth={1.5} /> : <EyeClosed />}
            </button>
          </div>
          {errors.adminPassword && (
            <p className="text-red-500 text-sm">Minimum 4 characters</p>
          )}

          <Link to={"/forgotPassword"}>
            <p className="text-base text-[#2563EB] font-medium text-center cursor-pointer">
              Forgot password?
            </p>
          </Link>

          <button
            type="submit"
            className="text-base bg-[#2563EB] text-white py-2.5 rounded font-medium cursor-pointer"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
