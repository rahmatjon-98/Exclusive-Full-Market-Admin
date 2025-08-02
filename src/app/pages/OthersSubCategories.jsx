import React, { useState } from "react";
import { Link } from "react-router";
import { Search, SquarePen, Trash } from "lucide-react";
import {
  useAddSubCategoriesMutation,
  useDeleteSubCategoriesMutation,
  useEditSubCategoriesMutation,
  useGetCategoryQuery,
  useGetSubCategoriesQuery,
} from "../../entities/allApi";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
const OthersCategories = () => {
  const { t } = useTranslation();

  let { data: dataCategory, refetch: refetchCategory } = useGetCategoryQuery();
  let { data: dataSubCategories, refetch: refetchSubCategories } =
    useGetSubCategoriesQuery();

  let [addSubCategories] = useAddSubCategoriesMutation();
  let [editSubCategories] = useEditSubCategoriesMutation();
  let [deleteSubCategories] = useDeleteSubCategoriesMutation();

  let [addModal, setaddModal] = useState(false);
  let [addName, setaddName] = useState("");
  let [categoryId, setcategoryId] = useState(null);

  let [editModal, seteditModal] = useState(false);
  let [editName, seteditName] = useState("");
  let [idx, setIdx] = useState(null);

  async function ADDCategory(event) {
    event.preventDefault();
    let formData = {
      id: categoryId,
      name: addName,
    };
    console.log(formData);

    await addSubCategories(formData);
    refetchSubCategories();
    setaddModal(false);
    setaddName("");
    setcategoryId(null);
    refetchCategory();
  }

  function openEditModal(e) {
    seteditName(e.subCategoryName);
    setIdx(e.id);
    setcategoryId(e.categoryId);
    seteditModal(true);
  }

  async function EDITCategory(event) {
    event.preventDefault();
    let formData = {
      id: categoryId,
      idSub: idx,
      name: editName,
    };
    await editSubCategories(formData);
    refetchSubCategories();
    seteditModal(false);
    seteditName("");
    setcategoryId(null);
    setIdx(null);
    refetchCategory();
  }

  async function removeSubCategories(id) {
    await deleteSubCategories(id);
    refetchSubCategories();
    refetchCategory();
  }

  let [search, setSearch] = useState("");

  const { theme, setTheme } = useTheme();

  const flatSubCategories = dataCategory?.data.flatMap((category) =>
    category.subCategories.map((sub) => ({
      ...sub,
      categoryName: category.categoryName,
      categoryId: category.id,
    }))
  );

  return (
    <div className="flex items-start">
      <div className="p-2 lg:p-6 overflow-y-scroll h-[88vh] w-full">
        <div className="flex justify-between items-center lg:text-xl text-xs">
          <div className="flex items-center gap-1 lg:gap-5">
            <Link to={"/others"}>
              <button className="font-medium">
                {t("subcategories.brands")}
              </button>
            </Link>
            <Link to={"/othersCategories"}>
              <button className="font-medium">
                {t("subcategories.categories")}
              </button>
            </Link>
            <Link to={"/othersSubCategories"}>
              <button className="font-medium border-b-4 border-gray-300 py-2">
                {t("subcategories.subcategories")}
              </button>
            </Link>
            <Link to={"/othersColors"}>
              <button className="font-medium">
                {t("subcategories.colors")}
              </button>
            </Link>
          </div>

          <button
            onClick={() => setaddModal(true)}
            className="bg-blue-600 text-white px-2 lg:px-8 py-0.5 lg:py-2 rounded text-[10px] lg:text-xs"
          >
            {t("subcategories.addNew")}
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
              <h1 className="font-semibold">
                {t("subcategories.addSubCategory")}
              </h1>
              <select
                value={categoryId ?? ""}
                onChange={(e) => setcategoryId(e.target.value)}
                className="border border-[#E5E5E5] p-2 rounded w-full"
              >
                <option value="" disabled>
                  {t("subcategories.selectCategory")}
                </option>
                {dataCategory?.data.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.categoryName}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder={t("subcategories.subCategoryName")}
                className="border border-[#E5E5E5] p-2 rounded w-1/1"
                value={addName}
                onChange={(e) => setaddName(e.target.value)}
              />

              <div className="flex gap-3 justify-between text-xs">
                <button
                  onClick={() => setaddModal(false)}
                  className="border border-[#E2E8F0] text-blue-600 px-8 py-2 rounded"
                >
                  {t("subcategories.cancel")}
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-2 rounded "
                >
                  {t("subcategories.save")}
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
              <h1 className="font-semibold">
                {t("subcategories.editCategory")}
              </h1>
              <select
                value={categoryId ?? ""}
                onChange={(e) => setcategoryId(e.target.value)}
                className="border border-[#E5E5E5] p-2 rounded w-full"
              >
                <option value="" disabled>
                  {t("subcategories.selectCategory")}
                </option>
                {dataCategory?.data.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.categoryName}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder={t("subcategories.categoryName")}
                className="border border-[#E5E5E5] p-2 rounded w-1/1"
                value={editName}
                onChange={(e) => seteditName(e.target.value)}
              />

              <div className="flex gap-3 justify-between text-xs">
                <button
                  onClick={() => seteditModal(false)}
                  className="border border-[#E2E8F0] text-blue-600 px-8 py-2 rounded"
                >
                  {t("subcategories.cancel")}
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-2 rounded "
                >
                  {t("subcategories.save")}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="lg:w-2/5 py-5">
          <fieldset className=" px-3 pb-3 border border-[#E2E8F0] rounded flex items-center justify-between">
            <legend className="text-xs px-1 text-[#737373]">
              {t("subcategories.search")}
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

        <article className="grid lg:grid-cols-5 gap-5">
          {flatSubCategories
            ?.filter((e) =>
              e.subCategoryName.toLowerCase().includes(search.toLowerCase())
            )
            .map((e, i) => (
              <div
                key={i}
                className="flex gap-2 justify-between p-5 border border-gray-400 rounded"
              >
                <div className="space-y-3 w-9/10">
                  <p className="text-sm text-gray-500">
                    {t("subcategories.categoryLabel")}: {e.categoryName}
                  </p>
                  <p className="font-semibold">
                    <span className="font-normal text-xs">
                      {t("subcategories.subCategoryLabel")}:
                    </span>{" "}
                    {e.subCategoryName}
                  </p>
                </div>

                <div className="space-y-5 w-1/10">
                  <button onClick={() => openEditModal(e)}>
                    <SquarePen size={18} color="blue" />
                  </button>
                  <button onClick={() => removeSubCategories(e.id)}>
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

export default OthersCategories;
