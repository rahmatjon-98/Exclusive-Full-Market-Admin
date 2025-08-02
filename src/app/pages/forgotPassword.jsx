import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Eye, EyeClosed } from "lucide-react";
import { useForm } from "react-hook-form";
import img from "../../shared/images/Group 1116606595 (1).svg";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const ForgotPassword = () => {
  const { t } = useTranslation();

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
  const { theme, setTheme } = useTheme();
  return (
    <div className="lg:flex w-full h-[130vh] lg:h-[120vh] fixed -top-10 -left-0">
      <div className="lg:pt-0 pt-10 w-full lg:w-1/2 h-1/5 lg:h-full bg-[#1C2536] flex items-center justify-center">
        <div className="w-full px-10">
          <h1 className="text-2xl text-white font-medium">
            {t("forgotPassword.welcome")}
          </h1>
          <img className="w-3/5" src={img} alt="admin visual" />
        </div>
      </div>

      <div
        className={`w-full lg:w-1/2 h-2/3 lg:h-full flex lg:pt-0 pt-30 lg:items-center justify-center  ${
          theme == "dark" ? "bg-black" : "bg-white"
        }`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-3/5 relative"
        >
          <div>
            <Link to={"/login"} className="flex items-center gap-2">
              <ArrowLeft />
              <h1 className="text-[18px] text-[#3b5e9a] font-medium">
                {t("forgotPassword.backToLogin")}
              </h1>
            </Link>
          </div>
          <label className="text-2xl text-[#3b5e9a] font-bold">
            {t("forgotPassword.title")}
          </label>
          <input
            className="border border-[#E5E5E5] rounded w-full p-2.5 outline-none"
            type="email"
            placeholder={t("forgotPassword.emailPlaceholder")}
            autoComplete="email"
            {...register("adminEmail", {
              required: true,
              maxLength: 30,
            })}
          />
          {errors.adminEmail && (
            <p className="text-red-500 text-sm">
              {t("forgotPassword.emailError")}
            </p>
          )}

          <Link to={"/resetPassword"}>
            <button
              type="submit"
              className="text-base w-full bg-[#2563EB] text-white py-2.5 rounded font-medium cursor-pointer"
            >
              {t("forgotPassword.submitButton")}
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
