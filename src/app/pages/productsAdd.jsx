import {
  ArrowLeft,
  Check,
  LogOut,
  Search,
  SquarePen,
  Trash,
  X,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

import img from "../../shared/images/Button → SVG.svg";
import img1 from "../../shared/images/Button → SVG (1).svg";
import img2 from "../../shared/images/Button → SVG (2).svg";
import img3 from "../../shared/images/Button → SVG (3).svg";
import img4 from "../../shared/images/Button → SVG (4).svg";
import img5 from "../../shared/images/Button → SVG (5).svg";
import img6 from "../../shared/images/Button → SVG (6).svg";
import img7 from "../../shared/images/div.MuiBox-root.png";
import { useForm } from "react-hook-form";
import {
  useAddProductMutation,
  useGetBrandsQuery,
  useGetColorsQuery,
  useGetProductsQuery,
  useGetSubCategoriesQuery,
} from "../../entities/allApi";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const ProductsAdd = () => {
  const { t } = useTranslation();

  let navigate = useNavigate();
  let { data, refetch } = useGetProductsQuery();
  let { data: dataBrands, refetch: refetchBrands } = useGetBrandsQuery();
  let { data: dataSubCategories, refetch: refetchSubCategories } =
    useGetSubCategoriesQuery();
  let { data: dataColors, refetch: refetchColors } = useGetColorsQuery();

  let [addProduct] = useAddProductMutation();
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 1000000000) + 1
  );
  const [selectedColorId, setSelectedColorId] = useState(3);
  const [colorValue, setColorValue] = useState(null);
  const [showImage, setshowImage] = useState(null);

  function sendIdName(e) {
    setSelectedColorId(e.id);
    setColorValue(e.colorName);
  }

  const onSubmit = async (data) => {
    console.log("Form Values:", data);
    try {
      const formData = new FormData();

      formData.append("ProductName", data.ProductName);
      formData.append("Code", data.Code);
      formData.append("Description", data.Description);
      formData.append("BrandId", data.BrandId);
      formData.append("SubCategoryId", data.SubCategoryId);
      formData.append("Price", data.Price);
      formData.append("DiscountPrice", data.DiscountPrice || 0);
      formData.append("Quantity", data.Quantity);
      formData.append("Weight", data.Weight || "");
      formData.append("Size", data.Size || "");
      formData.append("ColorId", selectedColorId);

      formData.append("HasDiscount", data.HasDiscount == true);

      if (data.Images && data.Images.length > 0) {
        formData.append("Images", data.Images[0]);
      }

      const response = await addProduct(formData).unwrap();
      navigate("/products");
      refetch();
      reset();
      console.log("Product added successfully:", response);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-start">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-2 lg:p-6 overflow-y-scroll  h-[91vh] lg:h-[88vh]"
      >
        <div className="  z-5 flex justify-between items-center mb-4">
          <h1 className=" lg:text-sm text-[10px] font-bold flex items-center gap-2">
            <Link to={"/products"}>
              <ArrowLeft />
            </Link>
            {t("productsAdd.1")}
          </h1>

          <div className="space-x-3  lg:text-sm text-[10px] ">
            <Link to={"/products"}>
              <button className="cursor-pointer border border-[#E2E8F0] text-blue-600 px-2 lg:px-8 py-0.5 lg:py-2 rounded">
                {t("productsAdd.2")}
              </button>
            </Link>
            <button
              type="submit"
              className="cursor-pointer bg-blue-600 text-white  px-2 lg:px-8 py-0.5 lg:py-2 rounded "
            >
              {t("productsAdd.3")}
            </button>
          </div>
        </div>

        <div className="p-2 lg:p-6  min-h-screen text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <label className="font-bold  mb-1">{t("productsAdd.4")}</label>
                <div className="flex  justify-between py-5 ">
                  <div className="relative w-[68%]">
                    <input
                      {...register("ProductName", { required: true })}
                      type="text"
                      placeholder={t("productsAdd.5")}
                      className="border border-[#E5E5E5] p-2 rounded w-full"
                    />
                    {errors.ProductName && (
                      <span className="text-red-500 text-2xl absolute right-2 mt-1">
                        *
                      </span>
                    )}
                  </div>

                  <div className="relative w-[30%]">
                    <input
                      {...register("Code", { required: true })}
                      type="text"
                      placeholder={t("productsAdd.6")}
                      className="border border-[#E5E5E5] p-2 rounded w-full"
                      defaultValue={randomNumber}
                    />
                    {errors.Code && (
                      <span className="text-red-500 text-2xl absolute right-2 mt-1">
                        *
                      </span>
                    )}
                  </div>
                </div>

                <div className="border border-[#E5E5E5] rounded relative">
                  <div className="flex items-center lg:gap-10 p-2 border-b border-[#E5E5E5] ">
                    <p className="">{t("productsAdd.7")}</p>
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
                    {...register("Description", { required: true })}
                    rows="4"
                    placeholder={t("productsAdd.8")}
                    className="w-full h-[30vh] rounded p-2 resize-none"
                  />
                  {errors.Description && (
                    <span className="text-red-500 text-2xl absolute right-2 mt-1">
                      *
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <p className="py-2">{t("productsAdd.9")}</p>
                  <select
                    {...register("BrandId", { required: true })}
                    className={`border border-[#E5E5E5] p-2  rounded w-full  ${theme == "dark" ? "bg-black" : "bg-white"}`}
                  >
                    <option value="">{t("productsAdd.10")}</option>
                    {dataBrands &&
                      dataBrands.data.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.brandName}
                        </option>
                      ))}
                  </select>
                  {errors.BrandId && (
                    <span className="text-red-500 text-2xl absolute right-5 mt-1">
                      *
                    </span>
                  )}
                </div>

                <div className="relative">
                  <p className="py-2">{t("productsAdd.11")}</p>
                  <select
                    {...register("SubCategoryId", { required: true })}
                    className={`border border-[#E5E5E5] p-2  rounded w-full  ${
                      theme == "dark" ? "bg-black" : "bg-white"
                    }`}
                  >
                    <option value="">{t("productsAdd.12")}</option>
                    {dataSubCategories &&
                      dataSubCategories.data.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.subCategoryName}
                        </option>
                      ))}
                  </select>
                  {errors.SubCategoryId && (
                    <span className="text-red-500 text-2xl absolute right-5 mt-1">
                      *
                    </span>
                  )}
                </div>
              </div>

              <div className="py-5 space-y-5">
                <p className="font-bold">{t("productsAdd.13")}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="relative">
                    <input
                      {...register("Price", { required: true })}
                      type="number"
                      placeholder={t("productsAdd.14")}
                      className="border border-[#E5E5E5] p-2 rounded w-full"
                    />
                    {errors.Price && (
                      <span className="text-red-500 text-2xl absolute right-7 mt-1">
                        *
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      {...register("Quantity", { required: true })}
                      type="number"
                      placeholder={t("productsAdd.15")}
                      className="border border-[#E5E5E5] p-2 rounded w-full"
                    />
                    {errors.Quantity && (
                      <span className="text-red-500 text-2xl absolute right-7 mt-1">
                        *
                      </span>
                    )}
                  </div>

                  <div className="border border-[#E5E5E5] p-2 rounded flex justify-between">
                    <input
                      {...register("HasDiscount")}
                      type="checkbox"
                      id="tax"
                    />

                    <input
                      {...register("DiscountPrice")}
                      type="number"
                      placeholder={t("productsAdd.16")}
                      className="outline-none w-9/10"
                    />
                  </div>
                </div>
              </div>

              <div className="py-5">
                <p className="font-bold">{t("productsAdd.17")}</p>

                <div className="space-y-5 py-5">
                  <div className="grid grid-cols-2 gap-5">
                    <fieldset className="border border-[#E5E5E5] rounded">
                      <legend className="text-xs px-1 text-[#737373] mx-2">
                        {t("productsAdd.18")}
                      </legend>
                      <p className="p-3">{t("productsAdd.19")}</p>
                    </fieldset>
                    <fieldset className="border border-[#E5E5E5] rounded">
                      <legend className="text-xs px-1 text-[#737373] mx-2">
                        {t("productsAdd.20")}
                      </legend>

                      <input
                        {...register("Size")}
                        type="text"
                        placeholder={t("productsAdd.19")}
                        className="w-full outline-none p-2 rounded"
                      />
                    </fieldset>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <fieldset className="border border-[#E5E5E5] rounded">
                      <legend className="text-xs px-1 text-[#737373] mx-2">
                        {t("productsAdd.21")}
                      </legend>
                      <p className="p-3">{t("productsAdd.22")}</p>
                    </fieldset>

                    <fieldset className="border border-[#E5E5E5] rounded">
                      <legend className="text-xs px-1 text-[#737373] mx-2">
                        {t("productsAdd.20")}
                      </legend>

                      <input
                        {...register("Weight")}
                        type="number"
                        placeholder={t("productsAdd.22")}
                        className="w-full outline-none p-2 rounded"
                      />
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-[#D9E1EC] rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium ">{t("productsAdd.23")}</p>

                  <div className="flex items-center gap-2">
                    {!colorValue && (
                      <p className="text-sm">
                        {t("productsAdd.24")}{" "}
                        <span className="text-red-500 font-bold text-xl">
                          *
                        </span>
                      </p>
                    )}
                    <div
                      className={`w-7 h-7 rounded-full border border-[rgb(156,156,156)] `}
                      style={{ backgroundColor: colorValue }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 mb-2">
                  {dataColors &&
                    dataColors.data.map((e, i) => (
                      <div
                        key={i}
                        onClick={() => sendIdName(e)}
                        style={{ backgroundColor: e.colorName }}
                        className={`w-10 h-10 rounded-full border border-[rgb(230,230,230)] ${
                          selectedColorId === e.id ? "ring-2 ring-blue-500" : ""
                        }`}
                      ></div>
                    ))}
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-base">
                  {t("productsAdd.25")}
                </label>
                <div className="border border-dashed border-gray-400 p-5 text-center mb-2 rounded font-semibold flex items-center justify-center flex-col">
                  <div className=" p-2 cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      {...register("Images", { required: true })}
                      className="border border-gray-300 px-3 py-2 w-full"
                      onChange={(e) => setshowImage(e.target.files[0])}
                    />
                    {errors.Images && (
                      <span className="text-red-500 text-2xl absolute right-5">
                        *
                      </span>
                    )}
                    {showImage ? (
                      <div>
                        <img
                          src={URL.createObjectURL(showImage)}
                          alt="Preview"
                          className="mt-4 max-h-52 rounded shadow-md object-contain mx-auto"
                        />

                        <p className="text-sm mt-2 text-gray-600 my-5">
                          {showImage.name}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 my-5">
                        {t("productsAdd.26")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border border-[#D9E1EC] rounded my-5 p-3 space-y-3">
                  <p className="block font-medium">{t("productsAdd.27")}</p>
                  <div className="flex items-center gap-3 ">
                    <input
                      type="text"
                      placeholder={t("productsAdd.28")}
                      className="border border-[#D9E1EC] rounded p-3"
                    />
                    <button className="border border-[#2563EB] text-[#2563EB] rounded p-2.5">
                      <Check size={18} />
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

                <table className="border border-[#D9E1EC] rounded w-full text-[10px]">
                  <thead>
                    <tr className="bg-[#F5F5F5] text-[#5A607F]">
                      <th className="p-0 py-1 lg:p-3">{t("productsAdd.29")}</th>
                      <th>{t("productsAdd.30")}</th>
                      <th className="p-0 py-1 lg:p-3">{t("productsAdd.31")}</th>
                    </tr>
                  </thead>

                  <tbody className="">
                    {[1, 2, 3].map((e, idx) => (
                      <tr key={idx}>
                        <td className="flex items-center space-x-2 p-0 lg:p-3">
                          <img
                            className="w-10 h-10 bg-gray-200 rounded"
                            src={img7}
                            alt=""
                          />
                        </td>
                        <td>Healthcare_Erbology.png</td>
                        <td className="flex justify-center items-center">
                          <button className="text-[#7E84A3] p-0 lg:p-3">
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
      </form>
    </div>
  );
};

export default ProductsAdd;
