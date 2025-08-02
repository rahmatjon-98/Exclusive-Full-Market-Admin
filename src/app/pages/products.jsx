import { Search, SquarePen, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import noBasket from "../../shared/images/basket.png";
import { Link, useNavigate } from "react-router";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../entities/allApi";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { Skeleton } from "antd";

const Products = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    token ? navigate("/products") : navigate("/login");
  }, []);

  const { data, refetch, isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  async function removeProduct(id) {
    try {
      await deleteProduct(id).unwrap();
      refetch();
    } catch (error) {
      console.error(error);
      alert(t("products.14"));
    }
  }
  const { theme, setTheme } = useTheme();

  // if(isLoading) return  <Skeleton avatar paragraph={{ rows: 4 }} />

  return (
    <div>
      <div className="p-2 lg:p-6 overflow-y-scroll lg:w-full h-[91vh] lg:h-[88vh]">
        <div>
          <div className=" lg:text-sm text-[10px] flex justify-between items-center mb-4">
            <h1 className=" lg:text-sm text-xl font-bold">{t("products.1")}</h1>
            <Link to={"/productsAdd"}>
              <button className="cursor-pointer bg-blue-600 text-white px-2 lg:px-8 py-2 rounded ">
                {t("products.4")}
              </button>
            </Link>
          </div>

          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="grid grid-cols-3 gap-10">
              <fieldset className="col-span-2 px-3 pb-3 border border-[#E2E8F0] rounded flex items-center justify-between">
                <legend className="text-xs px-1 text-[#737373]">
                  {t("products.5")}
                </legend>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="..."
                  className="outline-none"
                />
                <Search color="#737373" />
              </fieldset>

              <fieldset className="text-xs border border-[#E2E8F0] rounded">
                <legend className="text-xs px-1 text-[#737373] mx-2">
                  {t("products.6")}
                </legend>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={`outline-none p-2  rounded w-full  ${
                    theme == "dark" ? "bg-black" : "bg-white"
                  }`}
                >
                  <option value="">{t("products.7")}</option>
                  <option value="true">{t("products.8")}</option>
                  <option value="false">{t("products.9")}</option>
                </select>
              </fieldset>
            </div>
          </div>

          <table className="w-full lg:text-sm text-[10px]">
            <thead className="text-gray-500 border-b-2 border-[#E6E9F4] ">
              <tr>
                <th className="w-80 py-2">{t("products.10")}</th>
                <th className="hidden lg:block">{t("products.11")}</th>
                <th className="px-1">{t("products.12")}</th>
                <th className="hidden lg:block">{t("products.13")}</th>
                <th className="px-1">{t("products.15")}</th>
                <th className="px-1">{t("products.16")}</th>
                <th className="text-center">{t("products.17")}</th>
              </tr>
            </thead>
            {isLoading ? (
              <div className="py-5">
                <Skeleton active avatar paragraph={{ rows: 0 }} />
                <Skeleton active avatar paragraph={{ rows: 0 }} />
                <Skeleton active avatar paragraph={{ rows: 0 }} />
              </div>
            ) : (
              <tbody>
                {data ? (
                  data.data.products
                    .filter((e) => e.hasDiscount.toString().includes(status))
                    .filter((e) =>
                      e.productName.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((e) => (
                      <tr
                        key={e.id}
                        className=" border-b border-[#E6E9F4] text-center"
                      >
                        <td className="w-10">
                          <div className="lg:flex items-center gap-1 lg:gap-3 p-2">
                            <img
                              className="lg:w-15 w-10 lg:h-15 h-10 rounded object-contain"
                              src={`https://store-api.softclub.tj/images/${e.image}`}
                              alt=""
                            />
                            <p className="">{e.productName}</p>
                          </div>
                        </td>
                        <td className="hidden lg:inline ">
                          <span
                            className={`font-semibold ${
                              e.hasDiscount ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            ${e.discountPrice}
                          </span>
                        </td>
                        <td className="p-2">{e.categoryName}</td>
                        <td className="hidden lg:block ">
                          <div
                            style={{ backgroundColor: e.color }}
                            className="w-10 h-10 rounded-full border border-gray-300 mt-5"
                          ></div>
                        </td>
                        <td>${e.price}</td>
                        <td>{e.quantity}</td>
                        <td>
                          <div className="flex items-center w-full gap-3 justify-center">
                            <Link to={`/productsEdit/${e.id}`}>
                              <button className="cursor-pointer border border-[#E2E8F0] text-blue-500 p-2 rounded ">
                                <SquarePen className="lg:w-5 lg:h-5 w-3 h-3" />
                              </button>
                            </Link>

                            <button
                              onClick={() => removeProduct(e.id)}
                              className="border border-[#E2E8F0] text-red-500 p-2 rounded"
                            >
                              <Trash className="lg:w-5 lg:h-5 w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                ) : (
                  <div className="absolute mt-20 left-[35%] text-center text-red-600 lg:text-2xl font-medium">
                    {t("layout.7")}
                  </div>
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
