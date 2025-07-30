import React, { useState } from "react";
import Menu from "./menu";
import { Link } from "react-router";
import img from "../../shared/images/Category-CellPhone (1).png";
import Orders from "./orders";
import { LogOut, Search, SquarePen } from "lucide-react";
const Others = () => {
  const orders = [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
  let [addModal, setaddModal] = useState(false);
  return (
    <div className="flex items-start">
      <Menu />
      <div className="p-6 overflow-y-scroll h-[88vh] w-full">
        <div className="flex justify-between items-center ">
          <div className="flex gap-3">
            <button className="text-xl font-medium">Categories </button>
            <button className="text-xl font-medium">Brands </button>
            <button className="text-xl font-medium">Banners </button>
          </div>

          <button
            onClick={() => setaddModal(true)}
            className="bg-blue-600 text-white px-8 py-2 rounded"
          >
            + Add new
          </button>
        </div>

        {addModal && (
          <div
            style={{ backdropFilter: "blur(6px)" }}
            className="fixed flex items-center justify-center inset-0 bg-[rgba(255,255,255,0.3)] "
          >
            <div className="w-[400px] bg-white shadow rounded p-5 space-y-5">
              <h1 className="font-semibold">Add category</h1>
              <input
                type="text"
                placeholder="Product name"
                className="border border-[#E5E5E5] p-2 rounded w-7/10 "
              />
              <div className="border border-dashed border-gray-400 p-5 text-center mb-2 rounded font-semibold flex items-center justify-center flex-col">
                <div className="bg-[#E5E7EB] rounded-full p-2 ">
                  <LogOut className="-rotate-90" size={20} />
                </div>
                <p>
                  Click to upload or drag and drop <br /> (SVG, JPG, PNG, or max
                  size 800x400)
                </p>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setaddModal(false)}
                  className="border border-[#E2E8F0] text-blue-600 px-8 py-2 rounded"
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-8 py-2 rounded">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="w-2/5 py-5">
          <fieldset className=" px-3 pb-3 border border-[#E2E8F0] rounded flex items-center justify-between">
            <legend className="text-xs px-1 text-[#737373]">Search</legend>
            <input type="text" placeholder="..." className="outline-none" />
            <Search color="#737373" />
          </fieldset>
        </div>

        <article className="grid grid-cols-5 gap-5">
          {orders.map((e, i) => (
            <div
              key={i}
              className="flex items-start justify-between p-5 border border-[] rounded"
            >
              <div>
                <img src={img} alt="" />
                <p>Phones</p>
              </div>

              <button>
                <SquarePen size={18} color="blue" />
              </button>
            </div>
          ))}
        </article>
      </div>
    </div>
  );
};

export default Others;
