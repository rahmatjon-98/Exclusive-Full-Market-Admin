import React, { useEffect, useState } from "react";
import {
  AlignJustify,
  Bell,
  ChevronDown,
  Folder,
  House,
  Search,
  ShoppingBasket,
} from "lucide-react";
import { Link, Outlet } from "react-router";
import logo from "../../shared/images/Group 1116606595 (1).svg";

const Layout = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token");
    setToken(storedToken);
  }, []);

  return (
    <div className=" w-full">
      {token && (
        <header className="bg-[#1C2536] flex items-center justify-between text-white py-2.5 px-10 w-full">
          <img className="pr-10" src={logo} alt="admin visual" />
          <div className="flex items-center w-3/6 gap-3">
            <Search />
            <input
              type="text"
              placeholder="Search..."
              className="w-full outline-none bg-transparent text-white"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative mr-5">
              <div className="flex items-center justify-center text-[12px] bg-[#1E5EFF] rounded-full w-4 h-4 p-1 absolute ml-3 -mt-1">
                0
              </div>
              <Bell />
            </div>

            <div className="rounded-full w-8 h-8 flex items-center justify-center bg-[#1FD286] font-semibold">
              R
            </div>

            <div className="flex items-center gap-3">
              <p>Randhir kumar</p>
              <button>
                <ChevronDown />
              </button>
            </div>
          </div>
        </header>
      )}

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
