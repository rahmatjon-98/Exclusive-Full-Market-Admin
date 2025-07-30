import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Eye, EyeClosed } from "lucide-react";
import { useForm } from "react-hook-form";
import img from "../../shared/images/Group 1116606595 (1).svg";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token");
    if (storedToken) {
      navigate("/");
    }
    setToken(storedToken);
  }, []);

  const [btnShow, setbtnShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login form data:", data);
  };

  return (
    <div  className="flex items-start">
      <Menu />
      <div className="p-6 overflow-y-scroll h-[88vh] w-full">
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
            <div>
              <Link to={"/login"} className="flex items-center gap-2">
                <ArrowLeft />
                <h1 className="text-[18px] text-[#111927] font-medium">
                  Log in
                </h1>
              </Link>
            </div>
            <label className="text-2xl text-[#111927] font-bold">
              Forgot password
            </label>
            <input
              className="border border-[#E5E5E5] rounded w-full p-2.5 outline-none"
              type="email"
              placeholder="Email"
              autoComplete="email"
              {...register("adminEmail", {
                required: true,
                maxLength: 30,
              })}
            />
            {errors.adminEmail && (
              <p className="text-red-500 text-sm">Max 30 characters</p>
            )}

            <Link to={"/resetPassword"}>
              <button
                type="submit"
                className="text-base w-full bg-[#2563EB] text-white py-2.5 rounded font-medium cursor-pointer"
              >
                Send reset link
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
