import React, { useEffect, useState } from "react";
import {
  AlignJustify,
  Bell,
  ChevronDown,
  Folder,
  Globe,
  House,
  LogOut,
  Moon,
  Search,
  ShoppingBasket,
  Sun,
} from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router";
import logo from "../../shared/images/Group 1116606595 (1).svg";
import { useUserId } from "./useUserId";
import { useGetUserDataQuery } from "../../entities/allApi";
import { useTranslation } from "react-i18next";

import gb from "../../shared/images/gb.svg";
import ru from "../../shared/images/ru.svg";
import tj from "../../shared/images/tj.svg";
import { useTheme } from "next-themes";

const Layout = () => {
  const { t, i18n } = useTranslation();
  function TranslateClick(lang) {
    i18n.changeLanguage(lang);
    setdashboard((e) => !e);
  }

  const { theme, setTheme } = useTheme();

  let userId = useUserId();
  let { data } = useGetUserDataQuery(userId);

  const navigate = useNavigate();

  let [account, setAccount] = useState(false);
  function btnAccount() {
    setAccount((e) => !e);
  }
  async function logOut() {
    localStorage.removeItem("admin_token");
    btnAccount();
    navigate("/login");
  }

  let [ImageFull, setImageFull] = useState(false);
  let [dashboard, setdashboard] = useState(true);
  return (
    <div className=" w-full">
      {ImageFull && (
        <div
          style={{ backdropFilter: "blur(6px)" }}
          onClick={() => setImageFull((e) => !e)}
          className="fixed inset-0 flex items-center justify-center z-10"
        >
          <img
            className="w-[100%] lg:w-[50%] lg:h-[100vh]  p-10  object-cover mt-0"
            src={`https://store-api.softclub.tj/images/${data.data.image}`}
            alt="avatar"
          />
        </div>
      )}

      <header className="bg-[#1C2536] flex items-center justify-between text-white py-2.5 px-5 w-full">
        <div className="flex items-center gap-3">
          <button onClick={() => setdashboard((e) => !e)}>
            <AlignJustify />
          </button>
          <img className="lg:w-auto w-3/5" src={logo} alt="admin visual" />
        </div>
        <div className="flex items-center w-4/6 lg:w-3/6 gap-0.5 lg:gap-3">
          <Search className="w-5 lg:w-6" />
          <input
            type="text"
            placeholder={t("layout.1")}
            className="w-full outline-none bg-transparent text-white"
          />
        </div>

        <button
          className="btn btn-sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>

        <div className="flex items-center gap-3">
          <div className="relative lg:mr-5">
            <div className="flex items-center justify-center text-[12px] bg-[#1E5EFF] rounded-full w-4 h-4 p-1 absolute ml-3 -mt-1">
              0
            </div>
            <Bell />
          </div>

          <div className="rounded-full w-8 h-8 flex items-center justify-center bg-[#1FD286] font-semibold">
            {data && data.data.image ? (
              <img
                src={`https://store-api.softclub.tj/images/${data?.data.image}`}
                alt="img"
                onClick={() => setImageFull((e) => !e)}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div>{data?.data.userName.at(0)}</div>
            )}
          </div>

          <div
            onClick={() => setAccount((e) => !e)}
            className="flex items-center gap-3 relative cursor-pointer"
          >
            <p className="lg:block hidden">{data?.data.userName}</p>
            <button>
              <ChevronDown />
            </button>

            {account && (
              <div
                style={{ backdropFilter: "blur(6px)" }}
                className="absolute z-5 top-13 right-0 flex flex-col gap-5 p-5 rounded  text-white bg-[#000000B8]"
              >
                <button onClick={logOut} className="flex items-center gap-5">
                  <LogOut /> {t("layout.2")}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        <div
          className={`${
            dashboard ? "lg:w-1/20 w-[16%]" : "lg:w-1/5"
          } bg-[#1C2536] pt-1 h-[93.4vh] lg:h-[90.2vh]`}
        >
          <div className="p-2.5 flex flex-col gap-2.5">
            <div
              className={`flex gap-5 w-full px-2 rounded text-white text-xs`}
            >
              <Globe onClick={() => setdashboard((e) => !e)} color="#979797" />
              <div className={`${dashboard ? "hidden" : "block"} flex gap-5`}>
                <button onClick={() => TranslateClick("ru")}>
                  <img
                    className="w-6 h-4 object-cover border border-[#00000053]"
                    src={ru}
                    alt=""
                  />
                  Ru
                </button>
                <button onClick={() => TranslateClick("tj")}>
                  <img
                    className="w-6 h-4 object-cover border border-[#00000053]"
                    src={tj}
                    alt=""
                  />
                  Tj
                </button>
                <button onClick={() => TranslateClick("en")}>
                  <img
                    className="w-6 h-4 object-cover border border-[#00000053]"
                    src={gb}
                    alt=""
                  />
                  En
                </button>
              </div>
            </div>
            <Link to={"/"}>
              <button className={`flex gap-5 w-full p-2.5 rounded text-white`}>
                <House color="#979797" />
                <span className={`${dashboard ? "hidden" : "block"}`}>
                  {t("layout.3")}
                </span>
              </button>
            </Link>

            <Link to={"/orders"}>
              <button className={`flex gap-5 w-full p-2.5 rounded text-white`}>
                <AlignJustify color="#979797" />
                <span className={`${dashboard ? "hidden" : "block"}`}>
                  {t("layout.4")}
                </span>
              </button>
            </Link>

            <Link to={"/products"}>
              <button className={`flex gap-5 w-full p-2.5 rounded text-white`}>
                <ShoppingBasket color="#979797" />
                <span className={`${dashboard ? "hidden" : "block"}`}>
                  {t("layout.5")}
                </span>
              </button>
            </Link>

            <Link to={"/others"}>
              <button className={`flex gap-5 w-full p-2.5 rounded text-white`}>
                <Folder color="#979797" />
                <span className={`${dashboard ? "hidden" : "block"}`}>
                  {t("layout.6")}
                </span>
              </button>
            </Link>
          </div>
        </div>

        <main
          className={`${
            dashboard ? "lg:w-full w-[84%]" : "lg:w-full w-[100%]"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
