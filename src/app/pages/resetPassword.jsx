import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Eye, EyeClosed } from "lucide-react";
import { useForm } from "react-hook-form";
import img from "../../shared/images/Group 1116606595 (1).svg";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
const ResetPassword = () => {
  const { t, i18n } = useTranslation();

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

  const { theme, setTheme } = useTheme();

  return (
    <div className="lg:flex w-full h-[130vh] lg:h-[120vh] fixed -top-10 -left-0">
      <div className="lg:pt-0 pt-10 w-full lg:w-1/2 h-1/5 lg:h-full bg-[#1C2536] flex items-center justify-center">
        <div className="w-full px-10">
          <h1 className="text-2xl text-white font-medium">
            {t("resetPassword.welcome")}
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
            type="text"
            name="username"
            autoComplete="username"
            className="hidden"
          />

          <div className="border border-[#E5E5E5] rounded w-full relative">
            <input
              className="p-2.5 outline-none w-9/10"
              type={btnShowPas1 ? "text" : "password"}
              placeholder={t("resetPassword.passwordPlaceholder")}
              autoComplete="new-password"
              {...register("adminPassword", {
                required: t("resetPassword.passwordRequired"),
                minLength: {
                  value: 4,
                  message: t("resetPassword.passwordMinLength"),
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
              placeholder={t("resetPassword.confirmPasswordPlaceholder")}
              autoComplete="new-password"
              {...register("adminPasswordConfirm", {
                required: t("resetPassword.confirmPasswordRequired"),
                minLength: {
                  value: 4,
                  message: t("resetPassword.passwordMinLength"),
                },
                validate: (value) =>
                  value === password || t("resetPassword.passwordsNotMatch"),
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
            {t("resetPassword.submitButton")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default React.memo(ResetPassword);
