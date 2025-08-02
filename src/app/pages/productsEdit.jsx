import { ArrowLeft, Eye, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import img from "../../shared/images/Button → SVG.svg";
import img1 from "../../shared/images/Button → SVG (1).svg";
import img2 from "../../shared/images/Button → SVG (2).svg";
import img3 from "../../shared/images/Button → SVG (3).svg";
import img4 from "../../shared/images/Button → SVG (4).svg";
import img5 from "../../shared/images/Button → SVG (5).svg";
import img6 from "../../shared/images/Button → SVG (6).svg";
import { useForm } from "react-hook-form";
import {
  useAddImageToProductMutation,
  useDeleteImageProductMutation,
  useEditProductMutation,
  useGetBrandsQuery,
  useGetByIdProductQuery,
  useGetColorsQuery,
  useGetProductsQuery,
  useGetSubCategoriesQuery,
} from "../../entities/allApi";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { Skeleton } from "antd";

const ProductsEdit = () => {
  const { t } = useTranslation();

  const { id } = useParams();
  const {
    data: productById,
    refetch: refetchImage,
    isLoading,
  } = useGetByIdProductQuery(id);
  let { data: dataBrands, refetch: refetchBrands } = useGetBrandsQuery();

  const [selectedColorId, setSelectedColorId] = useState(null);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [colorValue, setColorValue] = useState(null);

  useEffect(() => {
    dataBrands &&
      dataBrands.data.map((e) =>
        e.brandName == productById?.data.brand ? setSelectedBrandId(e.id) : null
      );
  }, [dataBrands]);

  let navigate = useNavigate();
  let { data, refetch } = useGetProductsQuery();
  let { data: dataSubCategories, refetch: refetchSubCategories } =
    useGetSubCategoriesQuery();
  let { data: dataColors, refetch: refetchColors } = useGetColorsQuery();

  let [editProduct] = useEditProductMutation();
  let [addImageToProduct] = useAddImageToProductMutation();
  let [deleteImageProduct] = useDeleteImageProductMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 1000000000) + 1
  );

  function sendIdName(e) {
    setSelectedColorId(e.id);
    setColorValue(e.colorName);
  }
  useEffect(() => {
    if (productById && productById.data) {
      const product = productById.data;
      setValue("ProductName", product.productName);
      setValue("Code", randomNumber);
      setValue("Description", product.description);
      setValue("Price", product.price);
      setValue("DiscountPrice", product.discountPrice || "");
      setValue("HasDiscount", product.hasDiscount ? true : false);
      setValue("Quantity", product.quantity || 1);
      setValue("Weight", product.weight || "");
      setValue("Size", product.size || "");
      setValue("Color", null);
      setColorValue(product.color);
      setValue("SubCategoryId", product.subCategoryId);
      // setValue("BrandId", selectedBrandId);
    }
  }, [productById]);

  const onSubmit = async (data) => {
    try {
      const newProduct = {
        id: id,
        productName: data.ProductName,
        code: data.Code,
        description: data.Description,
        price: data.Price,
        quantity: data.Quantity,
        hasDiscount: data.HasDiscount,
        discountPrice: data.DiscountPrice,
        size: data.Size,
        weight: data.Weight,
        brandId: data.BrandId,
        subCategoryId: data.SubCategoryId,
        colorId: selectedColorId,
      };

      await editProduct(newProduct);
      navigate("/products");
      refetch();
      reset();
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const [addImageFile, setaddImageFile] = useState(null);

  async function addImage(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ProductId", id);
    formData.append("Files", addImageFile);

    try {
      await addImageToProduct(formData).unwrap();
      refetchImage();
      setaddImageFile(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function removeImage(id) {
    try {
      await deleteImageProduct(id).unwrap();
      refetchImage();
    } catch (error) {
      console.error(error);
      alert("error");
    }
  }

  let [ImageFull, setImageFull] = useState(false);
  let [ImageUrl, setImageUrl] = useState(null);

  function openImage(image) {
    setImageFull(true);
    setImageUrl(image);
  }
  const { theme, setTheme } = useTheme();
  // if (isLoading) return <Skeleton active />;

  return (
    <div className="flex items-start">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-2 lg:p-6 overflow-y-scroll w-full h-[91vh] lg:h-[88vh]"
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className=" lg:text-sm text-[10px] font-bold flex items-center gap-2">
            <Link to={"/products"}>
              <ArrowLeft size={18} />
            </Link>
            {t("productsEdit.1")}
          </h1>

          <div className="space-x-3 lg:text-sm text-[10px]">
            <Link to={"/products"}>
              <button className="cursor-pointer border border-[#E2E8F0] text-blue-600 px-2 lg:px-8 py-0.5 lg:py-2 rounded">
                {t("productsEdit.2")}
              </button>
            </Link>
            <button
              type="submit"
              className="bg-blue-600 text-white px-2 lg:px-8 py-0.5 lg:py-2 rounded "
            >
              {t("productsEdit.3")}
            </button>
          </div>
        </div>

        <div className="p-2 lg:p-6  min-h-screen text-sm grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div>
              <label className="font-bold  mb-1">{t("productsEdit.4")}</label>

              <div className="flex justify-between py-5">
                <div className="relative w-[68%]">
                  <input
                    {...register("ProductName", { required: true })}
                    type="text"
                    placeholder={t("productsEdit.5")}
                    className="border border-[#E5E5E5] p-2 rounded w-[100%]"
                  />
                  {errors.ProductName && (
                    <span className="text-red-500 text-2xl absolute z-1 right-5 mt-1">
                      *
                    </span>
                  )}
                </div>

                <div className="relative w-[30%]">
                  <input
                    {...register("Code", { required: true })}
                    type="text"
                    placeholder={t("productsEdit.6")}
                    className="border border-[#E5E5E5] p-2 rounded w-full"
                  />
                  {errors.Code && (
                    <span className="text-red-500 text-2xl absolute z-1 right-5 mt-1">
                      *
                    </span>
                  )}
                </div>
              </div>

              <div className="border border-[#E5E5E5] rounded relative">
                <div className="flex items-center gap-10 p-2 border-b border-[#E5E5E5] ">
                  <p className="">{t("productsEdit.7")}</p>
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
                  placeholder={t("productsEdit.8")}
                  className="w-full h-[30vh] rounded p-2 resize-none"
                />
                {errors.Description && (
                  <span className="text-red-500 text-2xl absolute z-1 right-5 mt-1">
                    *
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 ">
              <div className="relative">
                <p className="py-2">{t("productsEdit.9")}</p>
                <select
                  {...register("BrandId", { required: true })}
                  className={`border border-[#E5E5E5] p-2  rounded w-full  ${
                    theme == "dark" ? "bg-black" : "bg-white"
                  }`}
                >
                  <option value="">{t("productsEdit.10")}</option>
                  {dataBrands &&
                    dataBrands.data.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.brandName}
                      </option>
                    ))}
                </select>
                {errors.BrandId && (
                  <span className="text-red-500 text-2xl absolute z-1 right-5 mt-1">
                    *
                  </span>
                )}
              </div>

              <div className="relative">
                <p className="py-2">{t("productsEdit.11")}</p>
                <select
                  {...register("SubCategoryId", { required: true })}
                  className={`border border-[#E5E5E5] p-2  rounded w-full  ${
                    theme == "dark" ? "bg-black" : "bg-white"
                  }`}
                >
                  <option value="">{t("productsEdit.12")}</option>
                  {dataSubCategories &&
                    dataSubCategories.data.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.subCategoryName}
                      </option>
                    ))}
                </select>
                {errors.SubCategoryId && (
                  <span className="text-red-500 text-2xl absolute z-1 right-5 mt-1">
                    *
                  </span>
                )}
              </div>
            </div>

            <div className="py-5 space-y-5">
              <p className="font-bold">{t("productsEdit.13")}</p>
              <div className="grid grid-cols-3 gap-4 relative">
                <div className="relative">
                  <input
                    {...register("Price", { required: true })}
                    type="number"
                    placeholder={t("productsEdit.14")}
                    className="border border-[#E5E5E5] p-2 rounded w-full"
                  />

                  {errors.Price && (
                    <span className="text-red-500 text-2xl absolute z-1 right-5 mt-1">
                      *
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input
                    {...register("Quantity", { required: true })}
                    type="number"
                    placeholder={t("productsEdit.15")}
                    className="border border-[#E5E5E5] p-2 rounded w-full"
                  />
                  {errors.Quantity && (
                    <span className="text-red-500 text-2xl absolute z-1 right-5 mt-1">
                      *
                    </span>
                  )}
                </div>

                <div className="border border-[#E5E5E5] p-2 rounded flex justify-between">
                  <input {...register("HasDiscount")} type="checkbox" />

                  <input
                    {...register("DiscountPrice")}
                    type="number"
                    placeholder={t("productsEdit.16")}
                    className="outline-none w-9/10"
                  />
                </div>
              </div>
            </div>

            <div className="py-5">
              <p className="font-bold">{t("productsEdit.17")}</p>

              <div className="space-y-5 py-5">
                <div className="grid grid-cols-2 gap-5">
                  <fieldset className="border border-[#E5E5E5] rounded">
                    <legend className="text-xs px-1 text-[#737373] mx-2">
                      {t("productsEdit.18")}
                    </legend>
                    <p className="p-3">{t("productsEdit.19")}</p>
                  </fieldset>
                  <fieldset className="border border-[#E5E5E5] rounded">
                    <legend className="text-xs px-1 text-[#737373] mx-2">
                      {t("productsEdit.20")}
                    </legend>

                    <input
                      {...register("Size")}
                      type="text"
                      placeholder={t("productsEdit.19")}
                      className="w-full outline-none p-2 rounded"
                    />
                  </fieldset>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <fieldset className="border border-[#E5E5E5] rounded">
                    <legend className="text-xs px-1 text-[#737373] mx-2">
                      {t("productsEdit.21")}
                    </legend>
                    <p className="p-3">{t("productsEdit.22")}</p>
                  </fieldset>

                  <fieldset className="border border-[#E5E5E5] rounded">
                    <legend className="text-xs px-1 text-[#737373] mx-2">
                      {t("productsEdit.20")}
                    </legend>

                    <input
                      {...register("Weight")}
                      type="number"
                      placeholder={t("productsEdit.22")}
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
                <p className="font-medium ">{t("productsEdit.23")}</p>

                <div className="flex items-center gap-2">
                  {!selectedColorId && (
                    <p className="text-sm">
                      {t("productsEdit.24")}
                      <span className="text-red-500 font-bold text-xl">*</span>
                    </p>
                  )}
                  <div
                    className={`w-7 h-7 rounded-full border border-[rgb(156,156,156)] `}
                    style={{ backgroundColor: colorValue }}
                  ></div>
                </div>
              </div>

              {isLoading ? (
                <Skeleton active />
              ) : (
                <div
                  className={`${
                    dataColors ? "grid" : ""
                  }  grid-cols-4 lg:grid-cols-6 gap-2 mb-2`}
                >
                  {dataColors ? (
                    dataColors.data.map((e, i) => (
                      <div
                        key={i}
                        onClick={() => sendIdName(e)}
                        style={{ backgroundColor: e.colorName }}
                        className={`w-10 h-10 rounded-full border border-[rgb(230,230,230)] ${
                          selectedColorId === e.id ? "ring-2 ring-blue-500" : ""
                        }`}
                      ></div>
                    ))
                  ) : (
                    <div className=" w-full text-center text-red-600 lg:text-xl font-medium">
                      {t("layout.7")}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="border border-dashed border-gray-400 p-5 text-center mb-2 rounded font-semibold flex items-center justify-center flex-col">
              <div className="p-2 w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setaddImageFile(e.target.files[0])}
                  className="border border-gray-300 px-3 py-2 w-full"
                />

                {addImageFile ? (
                  <div>
                    <img
                      src={URL.createObjectURL(addImageFile)}
                      alt="Preview"
                      className="mt-4 max-h-52 rounded shadow-md object-contain mx-auto"
                    />

                    <p className="text-sm mt-2 text-gray-600 my-5">
                      {addImageFile.name}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 my-5">
                    {t("productsEdit.25")}
                  </p>
                )}

                <button
                  className={` bg-blue-600 text-white px-6 py-2 rounded w-full transition 
                     ${
                       !addImageFile
                         ? "cursor-not-allowed opacity-50"
                         : "hover:bg-blue-700 cursor-pointer"
                     }`}
                  type="button"
                  onClick={addImage}
                  disabled={!addImageFile}
                >
                  {t("productsEdit.26")}
                </button>
              </div>
            </div>

            {ImageFull && (
              <div
                style={{ backdropFilter: "blur(6px)" }}
                onClick={() => setImageFull((e) => !e)}
                className="fixed inset-0 flex items-center justify-center z-10"
              >
                <img
                  className="w-[100%] lg:w-[50%] h-[80vh] object-contain p-10 rounded mt-0"
                  src={ImageUrl}
                  alt="avatar"
                />
              </div>
            )}

            <div className="border border-[#D9E1EC] rounded ">
              <table className="w-full ">
                <thead>
                  <tr className="bg-[#F5F5F5] text-[#5A607F] text-sm">
                    <th className="p-3">{t("productsEdit.27")}</th>
                    <th className="p-3">{t("productsEdit.28")}</th>
                    <th className="p-3">{t("productsEdit.29")}</th>
                  </tr>
                </thead>

                <tbody className="text-[10px]">
                  {productById?.data.images.map((e) => (
                    <tr key={e.id} className="">
                      <td className=" p-3 ">
                        <img
                          className="w-15 h-15 bg-gray-200 rounded object-cover"
                          src={`https://store-api.softclub.tj/images/${e.images}`}
                          alt=""
                        />
                      </td>

                      <td>{e.images}</td>

                      <td>
                        <div className="p-2 flex gap-2 top-2 right-2">
                          <button
                            className="cursor-pointer p-2 rounded"
                            onClick={() =>
                              openImage(
                                `https://store-api.softclub.tj/images/${e.images}`
                              )
                            }
                            type="button"
                          >
                            <Eye size={20} />
                          </button>

                          <button
                            onClick={() => removeImage(e.id)}
                            className=" p-2 rounded cursor-pointer"
                            type="button"
                          >
                            <Trash size={20} color="red" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
      {setValue("BrandId", selectedBrandId)}
    </div>
  );
};

export default ProductsEdit;
