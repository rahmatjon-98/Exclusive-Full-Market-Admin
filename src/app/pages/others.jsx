import React, { useState } from "react";

import { Link } from "react-router";
import img from "../../shared/images/Category-CellPhone (1).png";
import { LogOut, Search, SquarePen, Trash } from "lucide-react";
import {
  useAddBrandMutation,
  useDeleteBrandMutation,
  useEditBrandMutation,
  useGetBrandsQuery,
  useGetSubCategoriesQuery,
} from "../../entities/allApi";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const Others = () => {
  const { t } = useTranslation();

  let { data: dataBrands, refetch: refetchBrands } = useGetBrandsQuery();
  let [addBrand] = useAddBrandMutation();
  let [editBrand] = useEditBrandMutation();
  let [deleteBrand] = useDeleteBrandMutation();

  let [addModal, setaddModal] = useState(false);
  let [addBrandName, setaddBrandName] = useState("");

  let [editModal, seteditModal] = useState(false);
  let [editBrandName, seteditBrandName] = useState("");
  let [idx, setIdx] = useState(null);

  async function ADDBrandName(e) {
    e.preventDefault();
    await addBrand(addBrandName);
    refetchBrands();
    setaddModal(false);
  }

  function openEditModal(e) {
    seteditBrandName(e.brandName);
    setIdx(e.id);
    seteditModal(true);
  }

  async function EDITBrandName(e) {
    e.preventDefault();
    let formData = {
      id: idx,
      brandname: editBrandName,
    };
    await editBrand(formData);
    refetchBrands();
    seteditModal(false);
  }

  async function removeBrand(id) {
    await deleteBrand(id);
    refetchBrands();
  }

  let [search, setSearch] = useState("");

  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-start">
      <div className="p-2 lg:p-6 overflow-y-scroll h-[88vh] w-full">
        <div className="flex justify-between items-center lg:text-xl text-xs">
          <div className="flex items-center gap-1 lg:gap-5">
            <Link to={"/others"}>
              <button className="font-medium border-b-4 border-gray-300 py-2">
                {t("brands.1")}
              </button>
            </Link>
            <Link to={"/othersCategories"}>
              <button className="font-medium">{t("brands.2")}</button>
            </Link>
            <Link to={"/othersSubCategories"}>
              <button className="font-medium">{t("brands.3")}</button>
            </Link>
            <Link to={"/othersColors"}>
              <button className="font-medium ">{t("brands.4")}</button>
            </Link>
          </div>

          <button
            onClick={() => setaddModal(true)}
            className="bg-blue-600 text-white px-2 lg:px-8 py-0.5 lg:py-2 rounded lg:text-xs text-[10px]"
          >
            {t("brands.5")}
          </button>
        </div>

        {addModal && (
          <div
            style={{ backdropFilter: "blur(6px)" }}
            className={`fixed flex items-center justify-center inset-0  ${
              theme == "dark"
                ? "bg-[rgba(0,0,0,0.3)]"
                : "bg-[rgba(255,255,255,0.3)]"
            } `}
          >
            <form
              onSubmit={ADDBrandName}
              className={`w-[380px] shadow rounded p-5 space-y-5  ${
                theme == "dark" ? "bg-black" : "bg-white"
              }`}
            >
              <h1 className="font-semibold">{t("brands.6")}</h1>
              <input
                type="text"
                placeholder={t("brands.7")}
                className="border border-[#E5E5E5] p-2 rounded w-full"
                value={addBrandName}
                onChange={(e) => setaddBrandName(e.target.value)}
              />

              <div className="flex gap-3 justify-between text-xs">
                <button
                  onClick={() => setaddModal(false)}
                  className="border border-[#E2E8F0] text-blue-600 px-8 py-2 rounded"
                >
                  {t("brands.8")}
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-2 rounded "
                >
                  {t("brands.9")}
                </button>
              </div>
            </form>
          </div>
        )}

        {editModal && (
          <div
            style={{ backdropFilter: "blur(6px)" }}
            className={`fixed flex items-center justify-center inset-0  ${
              theme == "dark"
                ? "bg-[rgba(0,0,0,0.3)]"
                : "bg-[rgba(255,255,255,0.3)]"
            } `}
          >
            <form
              onSubmit={EDITBrandName}
              className={`w-[380px] shadow rounded p-5 space-y-5  ${
                theme == "dark" ? "bg-black" : "bg-white"
              }`}
            >
              <h1 className="font-semibold">{t("brands.10")}</h1>
              <input
                type="text"
                placeholder={t("brands.7")}
                className="border border-[#E5E5E5] p-2 rounded w-7/10"
                value={editBrandName}
                onChange={(e) => seteditBrandName(e.target.value)}
              />

              <div className="flex gap-3 justify-between">
                <button
                  onClick={() => seteditModal(false)}
                  className="border border-[#E2E8F0] text-blue-600 px-8 py-2 rounded"
                >
                  {t("brands.8")}
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-2 lg:px-8 py-2 rounded text-xs lg:text-xl"
                >
                  {t("brands.9")}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className=" lg:w-2/5 py-5">
          <fieldset className="  px-3 pb-3 border border-[#E2E8F0] rounded flex items-center justify-between">
            <legend className="text-xs px-1 text-[#737373]">
              {t("brands.11")}
            </legend>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="..."
              className="w-full outline-none "
            />
            <Search color="#737373" />
          </fieldset>
        </div>

        <article className="grid lg:grid-cols-5 gap-5">
          {dataBrands &&
            dataBrands.data
              .filter((e) =>
                e.brandName.toLowerCase().includes(search.toLowerCase())
              )
              .map((e, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between p-5 border border-gray-400 rounded"
                >
                  <div>
                    <p>{e.brandName}</p>
                  </div>

                  <div className="space-x-3">
                    <button onClick={() => openEditModal(e)}>
                      <SquarePen size={18} color="blue" />
                    </button>
                    <button onClick={() => removeBrand(e.id)}>
                      <Trash size={18} color="red" />
                    </button>
                  </div>
                </div>
              ))}
        </article>
      </div>
    </div>
  );
};

export default Others;
