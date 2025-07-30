import {  Search, SquarePen, Trash } from "lucide-react";
import React from "react";
import noBasket from "../../shared/images/basket.png";
import Menu from "./menu";
const Orders = () => {
  const orders = [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
  // const orders = [];

  return (
    <div className="flex items-start">
      <Menu  />
      <div className="p-6 overflow-y-scroll h-[88vh] w-full">
        {orders.length == 0 ? (
          <div className="w-full">
            <h1 className="text-2xl font-bold">Orders</h1>
            <div className="w-full h-[70vh] flex items-center justify-center">
              <div className="flex flex-col items-center justify-center w-2/4 text-center">
                <img src={noBasket} alt="" />
                <p className="text-xl font-bold text-[#131523]">
                  No Orders Yet
                </p>
                <p className="text-base  text-[#5A607F]">
                  All the upcoming orders from your store will be visible in
                  this page. You can add orders by yourself if you sell offline.
                </p>
                <button className="bg-blue-600 text-white px-8 py-2 rounded my-5">
                  + Add order
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Orders</h1>
              <button className="bg-blue-600 text-white px-8 py-2 rounded">
                + Add order
              </button>
            </div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <fieldset className=" px-3 pb-3 border border-[#E2E8F0] rounded flex items-center justify-between">
                  <legend className="text-xs px-1 text-[#737373]">
                    Search
                  </legend>
                  <input
                    type="text"
                    placeholder="..."
                    className="outline-none"
                  />
                  <Search color="#737373" />
                </fieldset>

                <fieldset className="border border-[#E2E8F0] rounded">
                  <legend className="text-xs px-1 text-[#737373] mx-2">
                    Filter
                  </legend>
                  <select className="px-3 pb-3 outline-none">
                    <option>Newest</option>
                    <option>Oldest</option>
                  </select>
                </fieldset>
              </div>

              <div className="flex items-center gap-3">
                <button className="border border-[#E2E8F0] text-blue-500 p-2 rounded ">
                  <SquarePen size={20} />
                </button>
                <button className="border border-[#E2E8F0] text-blue-500 p-2 rounded ">
                  <Trash size={20} />
                </button>
              </div>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="text-gray-500 border-b-2 border-[#E6E9F4] ">
                <tr>
                  <th className="py-2">
                    <input type="checkbox" />
                  </th>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Payment status</th>
                  <th>Order Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} className=" border-b border-[#E6E9F4] ">
                    <td className="py-2">
                      <input type="checkbox" />
                    </td>
                    <td className="font-medium ">#51232q</td>
                    <td>May 5, 4:03 PM</td>
                    <td>Rosalie Singleton</td>
                    <td>
                      <span
                        className={`text-xs px-2 py-1 rounded text-[#06A561] bg-[#C4F8E2] `}
                      >
                        Paid
                      </span>
                    </td>
                    <td>
                      <span
                        className={`text-xs px-2 py-1 rounded text-white bg-[#F99600]`}
                      >
                        Received
                      </span>
                    </td>
                    <td>$91.63</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
