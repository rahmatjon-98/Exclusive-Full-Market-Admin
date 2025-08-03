import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeClosed } from "lucide-react";
import { useForm } from "react-hook-form";
import img from "../../shared/images/Group 1116606595 (1).svg";
import { useLoginMutation } from "../../entities/allApi";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { Skeleton } from "antd";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  let [login] = useLoginMutation();
  // const { data, isLoading } = useGetUserRoleQuery();

  const [btnShow, setbtnShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const userData = {
        userName: formData.adminName,
        password: formData.adminPassword,
      };

      const response = await login(userData).unwrap();

      const token = response.data;
      localStorage.setItem("admin_token", token);

      const roleResponse = await axios.get(
        "https://store-api.softclub.tj/UserProfile/get-user-roles",
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const isAdmin =
        roleResponse.data?.data.some((e) => e.name === "Admin") || false;

      if (isAdmin) navigate("/");
    } catch (error) {
      console.error(error);
      alert(t("login.error"));
    }
  };

  // if (isLoading) return <Skeleton active />;

  return (
    <div className="lg:flex w-full h-[130vh] lg:h-[120vh] fixed -top-10 -left-0">
      <div className="lg:pt-0 pt-10 w-full lg:w-1/2 h-1/5 lg:h-full bg-[#1C2536] flex items-center justify-center">
        <div className="w-full px-10">
          <h1 className="text-2xl text-white font-medium">
            {t("login.welcome")}
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
          <label className="text-2xl text-[#3b5e9a] font-bold">
            {t("login.title")}
          </label>

          <input
            className={`border border-[#E5E5E5] rounded w-full p-2.5 outline-none ${
              theme == "light" ? "text-black" : "text-white"
            }`}
            type="text"
            placeholder={t("login.usernamePlaceholder")}
            autoComplete="name"
            {...register("adminName", {
              required: true,
              maxLength: 30,
            })}
          />
          {errors.adminName && (
            <p className="text-red-500 text-sm">{t("login.usernameError")}</p>
          )}

          <div
            className={`border border-[#E5E5E5] rounded w-full relative ${
              theme == "light" ? "text-black" : "text-white"
            }`}
          >
            <input
              className="p-2.5 outline-none w-9/10"
              type={btnShow ? "text" : "password"}
              placeholder={t("login.passwordPlaceholder")}
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
            <p className="text-red-500 text-sm">{t("login.passwordError")}</p>
          )}

          <Link to={"/forgotPassword"}>
            <p className="text-base text-[#2563EB] font-medium text-center cursor-pointer">
              {t("login.forgotPassword")}
            </p>
          </Link>

          <button
            type="submit"
            className="text-base bg-[#2563EB] text-white py-2.5 rounded font-medium cursor-pointer"
          >
            {t("login.submitButton")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default React.memo(Login);
