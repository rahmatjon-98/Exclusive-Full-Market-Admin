import { Search, SquarePen, Trash } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import noBasket from "../../shared/images/basket.png";

const Orders = () => {
  const { t } = useTranslation();

  const orders = [1, 2, 3, 1, 2, 3, 1, 2, 3];

  return (
    <div className="">
      <div className="p-2 lg:p-6 overflow-y-scroll w-full h-[91vh] lg:h-[88vh]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="lg:text-2xl font-bold">{t("orders.1")}</h1>
          <button className="cursor-pointer bg-blue-600 text-white px-2 lg:px-8 py-2 rounded text-xs ">
            {t("orders.2")}
          </button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <fieldset className=" lg:px-3 pb-3 border border-[#E2E8F0] rounded flex items-center justify-between">
            <legend className="text-xs px-1 text-[#737373]">
              {t("orders.3")}
            </legend>
            <input type="text" placeholder="..." className="outline-none" />
            <Search color="#737373" />
          </fieldset>
        </div>

        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b-2 border-[#E6E9F4] ">
            <tr>
              <th className="py-2">
                <input type="checkbox" />
              </th>
              <th className="px-2">{t("orders.4")}</th>
              <th className="px-2 hidden lg:inline lg:mx-5">{t("orders.5")}</th>
              <th className="px-2 hidden lg:inline lg:ml-35">
                {t("orders.6")}
              </th>
              <th className="px-2">{t("orders.7")}</th>
              <th className="px-2 hidden lg:inline lg:mx-5">{t("orders.8")}</th>
              <th className="px-2">{t("orders.9")}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className=" border-b border-[#E6E9F4] ">
                <td className="py-2">
                  <input type="checkbox" />
                </td>
                <td className="font-medium ">#51232</td>
                <td className=" hidden lg:inline lg:mx-5">May 5, 4:03 PM</td>
                <td className="hidden lg:inline lg:ml-20">Rosalie Singleton</td>
                <td className="">
                  <div className="flex justify-center">
                    <span
                      className={`text-xs px-2 mx-5 py-1 rounded text-[#06A561] bg-[#C4F8E2]`}
                    >
                      {t("orders.10")}
                    </span>
                  </div>
                </td>
                <td className="hidden lg:inline">
                  <div className="flex justify-center">
                    <p
                      className={`text-xs px-2 lg:m-2  py-1 rounded text-white bg-[#F99600]`}
                    >
                      {t("orders.11")}
                    </p>
                  </div>
                </td>
                <td>$91.63</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
