import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Eye, EyeClosed } from "lucide-react";
import { useForm } from "react-hook-form";
import img from "../../shared/images/Group 1116606595 (1).svg";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token");
    if (storedToken) {
      navigate("/");
    }
    setToken(storedToken);
  }, []);

  const [btnShowPas1, setbtnShowPas1] = useState(false);
  const [btnShowPas2, setbtnShowPas2] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("adminPassword");

  const onSubmit = (data) => {
    console.log("Reset password data:", data);
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
          <input
            type="text"
            name="username"
            autoComplete="username"
            className="hidden"
          />

          <div className="border border-[#E5E5E5] rounded w-full relative">
            <input
              className="p-2.5 outline-none w-9/10"
              type={btnShowPas1 ? "text" : "password"}
              placeholder="Password"
              autoComplete="new-password"
              {...register("adminPassword", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Minimum 4 characters",
                },
              })}
            />
            <button
              type="button"
              className="absolute right-2 top-2.5 z-10 cursor-pointer"
              onClick={() => setbtnShowPas1(!btnShowPas1)}
            >
              {btnShowPas1 ? <Eye strokeWidth={1.5} /> : <EyeClosed />}
            </button>
          </div>
          {errors.adminPassword && (
            <p className="text-red-500 text-sm">
              {errors.adminPassword.message}
            </p>
          )}

          <div className="border border-[#E5E5E5] rounded w-full relative">
            <input
              className="p-2.5 outline-none w-9/10"
              type={btnShowPas2 ? "text" : "password"}
              placeholder="Confirm password"
              autoComplete="new-password"
              {...register("adminPasswordConfirm", {
                required: "Please confirm your password",
                minLength: {
                  value: 4,
                  message: "Minimum 4 characters",
                },
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <button
              type="button"
              className="absolute right-2 top-2.5 z-10 cursor-pointer"
              onClick={() => setbtnShowPas2(!btnShowPas2)}
            >
              {btnShowPas2 ? <Eye strokeWidth={1.5} /> : <EyeClosed />}
            </button>
          </div>
          {errors.adminPasswordConfirm && (
            <p className="text-red-500 text-sm">
              {errors.adminPasswordConfirm.message}
            </p>
          )}

          <button
            type="submit"
            className="text-base bg-[#2563EB] text-white py-2.5 rounded font-medium cursor-pointer"
          >
            Send reset link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
