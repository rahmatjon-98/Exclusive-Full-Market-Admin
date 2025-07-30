import { Search, SquarePen, Trash } from "lucide-react";
import React from "react";
import noBasket from "../../shared/images/basket.png";
import img1 from "../../shared/images/Image.png";
import { Link } from "react-router";
import Menu from "./menu";
import { useGetProductsQuery } from "../../entities/allApi";

const Products = () => {
  const orders = [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
  // const orders = [];

  let { data } = useGetProductsQuery();
  return (
    <div className="flex items-start">
      <Menu />
      <div className="p-6 overflow-y-scroll h-[88vh] w-full">
        {/* {data.data.products.length == 0 ? (
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="w-full h-[75vh] flex items-center justify-center">
              <div className="flex flex-col items-center justify-center w-2/4 text-center">
                <img src={noBasket} alt="" />
                <p className="text-xl font-bold text-[#131523]">
                  Add new products
                </p>
                <p className="text-base  text-[#5A607F]">
                  Start making sales by adding your products. You can import and
                  manage your products at any time.
                </p>
                <button className="bg-blue-600 text-white px-8 py-2 rounded my-5">
                  + Add product
                </button>
              </div>
            </div>
          </div>
        ) : ( */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Products </h1>
            <Link to={"/productsAdd"}>
              <button className="bg-blue-600 text-white px-8 py-2 rounded">
                + Add product
              </button>
            </Link>
          </div>

          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <fieldset className=" px-3 pb-3 border border-[#E2E8F0] rounded flex items-center justify-between">
                <legend className="text-xs px-1 text-[#737373]">Search</legend>
                <input type="text" placeholder="..." className="outline-none" />
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
                <th>Product</th>
                <th>Inventory</th>
                <th>Category</th>
                <th>Price</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data && data.data.products.map((e) => (
                <tr key={e.id} className=" border-b border-[#E6E9F4] ">
                  <td className="py-2">
                    <input type="checkbox" />
                  </td>
                  <td className="flex items-center gap-3 py-2">
                    <img src={img1} alt="" />
                    <p>Men Grey Hoodie</p>
                  </td>
                  <td>Rosalie Singleton</td>
                  <td>Hoodies</td>
                  <td>$91.63</td>

                  <td className="flex items-center justify-center gap-3">
                    <button className="border border-[#E2E8F0] text-blue-500 p-2 rounded ">
                      <SquarePen size={20} />
                    </button>

                    <button className="border border-[#E2E8F0] text-red-500 p-2 rounded ">
                      <Trash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Products;
