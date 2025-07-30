import {
  ArrowLeft,
  Check,
  LogOut,
  Search,
  SquarePen,
  Trash,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";

import img from "../../shared/images/Button → SVG.svg";
import img1 from "../../shared/images/Button → SVG (1).svg";
import img2 from "../../shared/images/Button → SVG (2).svg";
import img3 from "../../shared/images/Button → SVG (3).svg";
import img4 from "../../shared/images/Button → SVG (4).svg";
import img5 from "../../shared/images/Button → SVG (5).svg";
import img6 from "../../shared/images/Button → SVG (6).svg";
import img7 from "../../shared/images/div.MuiBox-root.png";
import Menu from "./menu";

const ProductsEdit = () => {
  const orders = [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
  // const orders = [];

  const [options, setOptions] = useState([
    { name: "Size", values: ["S", "M", "L", "XL", "XXL"] },
    { name: "Weight", values: ["10", "20", "30", "40", "50"] },
  ]);

  const [tags, setTags] = useState([
    "T-Shirt",
    "Men Clothes",
    "Summer Collection",
  ]);
  const [images, setImages] = useState([
    "Healthcare_Erbology.png",
    "Healthcare_Erbology.png",
    "Healthcare_Erbology.png",
  ]);
  return (
    <div className="flex items-start">
      <Menu />
      <div className="p-6 overflow-y-scroll h-[88vh] w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Link to={"/products"}>
              <ArrowLeft />
            </Link>
            Products / Add new
          </h1>

          <div className="space-x-3">
            <Link to={"/products"}>
              <button className="border border-[#E2E8F0] text-blue-600 px-8 py-2 rounded">
                Cancel
              </button>
            </Link>
            <button className="bg-blue-600 text-white px-8 py-2 rounded">
              Save
            </button>
          </div>
        </div>

        <div className="p-6 bg-white min-h-screen text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <label className="font-bold  mb-1">Information</label>
                <div className="flex justify-between py-5">
                  <input
                    type="text"
                    placeholder="Product name"
                    className="border border-[#E5E5E5] p-2 rounded w-7/10 "
                  />
                  <input
                    type="text"
                    placeholder="Code"
                    className="border border-[#E5E5E5] p-2 rounded"
                  />
                </div>

                <div className="border border-[#E5E5E5] rounded">
                  <div className="flex items-center gap-10 p-2 border-b border-[#E5E5E5] ">
                    <p className="">Normal</p>
                    <div className="flex items-center gap-2">
                      <img src={img} alt="" />
                      <img src={img1} alt="" />
                      <img src={img2} alt="" />
                      <img src={img3} alt="" />
                      <img src={img4} alt="" />
                      <img src={img5} alt="" />
                      <img src={img6} alt="" />
                    </div>
                  </div>
                  <textarea
                    rows="4"
                    placeholder="Description"
                    className="w-full h-[30vh] rounded p-2 resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select className="border border-[#E5E5E5] p-2 rounded">
                  <option>Categories</option>
                </select>
                <select className="border border-[#E5E5E5] p-2 rounded">
                  <option>SubCategories</option>
                </select>
              </div>

              <div className="py-5 space-y-5">
                <p className="font-bold">Price</p>
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="number"
                    placeholder="Product price"
                    className="border border-[#E5E5E5] p-2 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Discount"
                    className="border border-[#E5E5E5] p-2 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Count"
                    className="border border-[#E5E5E5] p-2 rounded"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="tax" />
                  <label htmlFor="tax">Add tax for this product</label>
                </div>
              </div>

              <div className="flex justify-between items-center mb-2 border border-[#E5E5E5] p-2 rounded">
                <div>
                  <span className="font-bold">Different Options</span>
                  <p className="text-[#737373] ">
                    This product has multiple options
                  </p>
                </div>

                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="" />
                </label>
              </div>

              <div className="py-5">
                <p className="font-bold">Options</p>

                <div className="space-y-5 py-5">
                  <div className="grid grid-cols-2 gap-5">
                    <fieldset className="border border-[#E5E5E5] rounded">
                      <legend className="text-xs px-1 text-[#737373] mx-2">
                        Option 1
                      </legend>
                      <p className="px-3 pb-3">Size</p>
                    </fieldset>
                    <fieldset className="border border-[#E5E5E5] rounded">
                      <legend className="text-xs px-1 text-[#737373] mx-2">
                        Value
                      </legend>

                      <div className="flex items-center gap-2 flex-wrap px-3">
                        <div className=" bg-[#E6E9F4] flex items-center px-1 rounded gap-3">
                          S
                          <button>
                            <X size={15} color="#7E84A3" strokeWidth={3} />
                          </button>
                        </div>
                        <div className=" bg-[#E6E9F4] flex items-center px-1 rounded gap-3">
                          S
                          <button>
                            <X size={15} color="#7E84A3" strokeWidth={3} />
                          </button>
                        </div>
                        <div className=" bg-[#E6E9F4] flex items-center px-1 rounded gap-3">
                          S
                          <button>
                            <X size={15} color="#7E84A3" strokeWidth={3} />
                          </button>
                        </div>
                        <div className=" bg-[#E6E9F4] flex items-center px-1 rounded gap-3">
                          S
                          <button>
                            <X size={15} color="#7E84A3" strokeWidth={3} />
                          </button>
                        </div>
                      </div>
                    </fieldset>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <fieldset className="border border-[#E5E5E5] rounded">
                      <legend className="text-xs px-1 text-[#737373] mx-2">
                        Option 2
                      </legend>
                      <p className="px-3 pb-3">Weight</p>
                    </fieldset>
                    <fieldset className="border border-[#E5E5E5] rounded">
                      <legend className="text-xs px-1 text-[#737373] mx-2">
                        Value
                      </legend>

                      <div className="flex items-center gap-2 flex-wrap px-3">
                        <div className=" bg-[#E6E9F4] flex items-center px-1 rounded gap-3">
                          10
                          <button>
                            <X size={15} color="#7E84A3" strokeWidth={3} />
                          </button>
                        </div>
                        <div className=" bg-[#E6E9F4] flex items-center px-1 rounded gap-3">
                          20
                          <button>
                            <X size={15} color="#7E84A3" strokeWidth={3} />
                          </button>
                        </div>
                        <div className=" bg-[#E6E9F4] flex items-center px-1 rounded gap-3">
                          20
                          <button>
                            <X size={15} color="#7E84A3" strokeWidth={3} />
                          </button>
                        </div>
                        <div className=" bg-[#E6E9F4] flex items-center px-1 rounded gap-3">
                          40
                          <button>
                            <X size={15} color="#7E84A3" strokeWidth={3} />
                          </button>
                        </div>
                        <div className=" bg-[#E6E9F4] flex items-center px-1 rounded gap-3">
                          10
                          <button>
                            <X size={15} color="#7E84A3" strokeWidth={3} />
                          </button>
                        </div>
                        <div className=" bg-[#E6E9F4] flex items-center px-1 rounded gap-3">
                          20
                          <button>
                            <X size={15} color="#7E84A3" strokeWidth={3} />
                          </button>
                        </div>
                        <div className=" bg-[#E6E9F4] flex items-center px-1 rounded gap-3">
                          20
                          <button>
                            <X size={15} color="#7E84A3" strokeWidth={3} />
                          </button>
                        </div>
                        <div className=" bg-[#E6E9F4] flex items-center px-1 rounded gap-3">
                          40
                          <button>
                            <X size={15} color="#7E84A3" strokeWidth={3} />
                          </button>
                        </div>
                      </div>
                    </fieldset>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <fieldset className="border border-[#E5E5E5] rounded">
                      <legend className="text-xs px-1 text-[#737373] mx-2">
                        Option 3
                      </legend>
                      <p className="px-3 pb-3">Size</p>
                    </fieldset>
                    <fieldset className="border border-[#E5E5E5] rounded">
                      <legend className="text-xs px-1 text-[#737373] mx-2">
                        Value
                      </legend>

                      <div className="flex items-center gap-2 flex-wrap px-3">
                        {/* <div className=" bg-[#E6E9F4] flex items-center px-1 rounded gap-3">
                        S
                        <button>
                          <X size={15} color="#7E84A3" strokeWidth={3} />
                        </button>
                      </div> */}
                      </div>
                    </fieldset>
                  </div>
                </div>

                <button className="text-blue-600 text-sm mt-2">
                  + Add more
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-[#D9E1EC] rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium ">Colour:</p>
                  <button className="text-blue-600 text-sm font-medium flex gap-1 items-center">
                    <Check size={18} />
                    Create new
                  </button>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  {[
                    "bg-blue-600",
                    "bg-red-500",
                    "bg-purple-500",
                    "bg-yellow-400",
                    "bg-green-500",
                    "bg-gray-700",
                  ].map((color, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-full border border-white ${color}`}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="border border-[#D9E1EC] rounded p-3 space-y-3">
                <p className="block font-medium">Tags</p>
                <div className="flex items-center gap-3 ">
                  <input
                    type="text"
                    placeholder="Tags name"
                    className="border border-[#D9E1EC] rounded p-3"
                  />
                  <button className="border border-[#2563EB] text-[#2563EB] rounded p-2.5">
                    <Check />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-[#E6E9F4] text-[#5A607F] rounded flex gap-2 items-center">
                    T-Shirt <X size={15} color="#7E84A3" strokeWidth={3} />
                  </span>
                  <span className="px-2 py-1 text-xs bg-[#E6E9F4] text-[#5A607F] rounded flex gap-2 items-center">
                    T-Shirt <X size={15} color="#7E84A3" strokeWidth={3} />
                  </span>
                  <span className="px-2 py-1 text-xs bg-[#E6E9F4] text-[#5A607F] rounded flex gap-2 items-center">
                    T-Shirt <X size={15} color="#7E84A3" strokeWidth={3} />
                  </span>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-base">
                  Images
                </label>
                <div className="border border-dashed border-gray-400 p-5 text-center mb-2 rounded font-semibold flex items-center justify-center flex-col">
                  <div className="bg-[#E5E7EB] rounded-full p-2 ">
                    <LogOut className="-rotate-90" size={20} />
                  </div>
                  <p>
                    Click to upload or drag and drop <br /> (SVG, JPG, PNG, or
                    max size 800x400)
                  </p>
                </div>

                <table className="border border-[#D9E1EC] rounded w-full ">
                  <thead>
                    <tr className="bg-[#F5F5F5] text-[#5A607F] text-sm">
                      <th className="p-3">Image</th>
                      <th>File name</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>

                  <tbody className="">
                    {images.map((e, idx) => (
                      <tr key={idx}>
                        <td className="flex items-center space-x-2 p-3">
                          <img
                            className="w-10 h-10 bg-gray-200 rounded"
                            src={img7}
                            alt=""
                          />
                        </td>
                        <td>Healthcare_Erbology.png</td>
                        <td className="flex justify-center items-center">
                          <button className="text-[#7E84A3] text-sm p-3">
                            <Trash size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsEdit;
