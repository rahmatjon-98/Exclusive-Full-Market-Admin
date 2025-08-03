import React, { useState } from "react";
import { Link } from "react-router";
import { Search, SquarePen, Trash } from "lucide-react";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoryQuery,
} from "../../entities/allApi";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { Skeleton } from "antd";

const OthersCategories = () => {
  const { t } = useTranslation();

  let {
    data: dataCategory,
    refetch: refetchCategory,
    isLoading,
  } = useGetCategoryQuery();

  let [addCategory] = useAddCategoryMutation();
  let [editCategory] = useEditCategoryMutation();
  let [deleteCategory] = useDeleteCategoryMutation();

  let [addModal, setaddModal] = useState(false);
  let [addCategoryName, setaddCategoryName] = useState("");
  let [addCategoryImage, setaddCategoryImage] = useState(null);

  let [editModal, seteditModal] = useState(false);
  let [editCategoryName, seteditCategoryName] = useState("");
  let [editCategoryImage, seteditCategoryImage] = useState("");
  let [idx, setIdx] = useState(null);

  async function ADDCategory(event) {
    event.preventDefault();
    let target = event.target;

    let formData = new FormData();
    formData.append("CategoryImage", target["addImage"].files[0]);
    formData.append("CategoryName", target["addName"].value);

    await addCategory(formData);
    refetchCategory();
    setaddModal(false);
  }

  function openEditModal(e) {
    seteditCategoryName(e.categoryName);
    setIdx(e.id);
    seteditModal(true);
  }

  async function EDITCategory(event) {
    event.preventDefault();
    let target = event.target;

    let formData = new FormData();
    formData.append("categoryImage", target["editImage"].files[0]);
    formData.append("categoryName", target["editName"].value);
    formData.append("Id", idx);

    await editCategory(formData);
    refetchCategory();
    seteditModal(false);
  }

  async function removeCategory(id) {
    try {
      await deleteCategory(id).unwrap();
      refetchCategory();
    } catch (error) {
      console.error(error);
      alert(t("categories.error"));
    }
  }

  let [search, setSearch] = useState("");
  const { theme, setTheme } = useTheme();
  // if (isLoading) return <Skeleton active />;

  return (
    <div className="flex items-start">
      <div className="p-2 lg:p-6 overflow-y-scroll h-[88vh] w-full">
        <div className="flex gap-1 justify-between items-center lg:text-xl text-xs">
          <div className="flex items-center gap-1 lg:gap-5">
            <Link to={"/others"}>
              <button className="cursor-pointer font-medium">
                {t("categories.brands")}
              </button>
            </Link>
            <Link to={"/othersCategories"}>
              <button className="cursor-pointer font-medium border-b-4 border-gray-300 py-2">
                {t("categories.categories")}
              </button>
            </Link>
            <Link to={"/othersSubCategories"}>
              <button className="cursor-pointer font-medium">
                {t("categories.subcategories")}
              </button>
            </Link>
            <Link to={"/othersColors"}>
              <button className="cursor-pointer font-medium">
                {t("categories.colors")}
              </button>
            </Link>
          </div>

          <button
            onClick={() => setaddModal(true)}
            className="bg-blue-600 text-white px-2 lg:px-8 py-0.5 lg:py-2 rounded text-[10px] lg:text-xs"
          >
            {t("categories.addNew")}
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
              onSubmit={ADDCategory}
              className={`w-[380px] shadow rounded p-5 space-y-5  ${
                theme == "dark" ? "bg-black" : "bg-white"
              }`}
            >
              <h1 className="font-semibold">{t("categories.addCategory")}</h1>
              <input
                className="border border-[#E5E5E5] p-2 rounded w-1/1"
                type="file"
                name="addImage"
              />

              <input
                type="text"
                placeholder={t("categories.categoryName")}
                className="border border-[#E5E5E5] p-2 rounded w-1/1"
                name="addName"
              />

              <div className="flex gap-3 justify-between text-xs">
                <button
                  onClick={() => setaddModal(false)}
                  className="border border-[#E2E8F0] text-blue-600 px-8 py-2 rounded"
                >
                  {t("categories.cancel")}
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-2 lg:px-8 py-2 rounded "
                >
                  {t("categories.save")}
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
              onSubmit={EDITCategory}
              className={`w-[380px] shadow rounded p-5 space-y-5  ${
                theme == "dark" ? "bg-black" : "bg-white"
              }`}
            >
              <h1 className="font-semibold">{t("categories.editCategory")}</h1>
              <input
                className="border border-[#E5E5E5] p-2 rounded w-1/1"
                type="file"
                name="editImage"
              />

              <input
                type="text"
                placeholder={t("categories.categoryName")}
                className="border border-[#E5E5E5] p-2 rounded w-1/1"
                name="editName"
                defaultValue={editCategoryName}
              />

              <div className="flex gap-3 justify-between">
                <button
                  onClick={() => seteditModal(false)}
                  className="border border-[#E2E8F0] text-blue-600 px-8 py-2 rounded"
                >
                  {t("categories.cancel")}
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-2 lg:px-8 py-2 rounded text-xs lg:text-xl"
                >
                  {t("categories.save")}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="lg:w-2/5 py-5">
          <fieldset className=" px-3 pb-3 border border-[#E2E8F0] rounded flex items-center justify-between">
            <legend className="text-xs px-1 text-[#737373]">
              {t("categories.search")}
            </legend>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="..."
              className="w-full outline-none"
            />
            <Search color="#737373" />
          </fieldset>
        </div>

        {isLoading ? (
          <Skeleton active />
        ) : (
          <article
            className={`${dataCategory ? "grid" : ""}  lg:grid-cols-5 gap-5`}
          >
            {dataCategory ? (
              dataCategory.data
                .filter((e) =>
                  e.categoryName.toLowerCase().includes(search.toLowerCase())
                )
                .map((e, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between p-5 border border-gray-400 rounded"
                  >
                    <div className="flex flex-col justify-between w-9/10">
                      <img
                        className="w-20 h-20 object-cover"
                        src={`https://store-api.softclub.tj/images/${e.categoryImage}`}
                        alt=""
                      />
                      <p>{e.categoryName}</p>
                    </div>

                    <div className="space-y-5 w-1/10">
                      <button onClick={() => openEditModal(e)}>
                        <SquarePen size={18} color="blue" />
                      </button>
                      <button onClick={() => removeCategory(e.id)}>
                        <Trash size={18} color="red" />
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <div className="w-full text-center text-red-600 lg:text-2xl font-medium">
                {t("layout.7")}
              </div>
            )}
          </article>
        )}
      </div>
    </div>
  );
};

export default React.memo(OthersCategories);
