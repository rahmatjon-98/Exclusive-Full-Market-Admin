import React, { useState } from "react";
import { Link } from "react-router";
import { LogOut, Search, SquarePen, Trash } from "lucide-react";
import {
  useAddColorMutation,
  useDeleteColorMutation,
  useEditColorMutation,
  useGetColorsQuery,
} from "../../entities/allApi";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
const othersColors = () => {
  const { t } = useTranslation();

  let { data: dataColors, refetch: refetchColor } = useGetColorsQuery();
  let [addColor] = useAddColorMutation();
  let [editColor] = useEditColorMutation();
  let [deleteColor] = useDeleteColorMutation();

  let [addModal, setaddModal] = useState(false);
  let [addName, setaddName] = useState("");

  let [editModal, seteditModal] = useState(false);
  let [editName, seteditName] = useState("");
  let [idx, setIdx] = useState(null);

  async function AddColor(e) {
    e.preventDefault();

    if (!addName.trim()) {
      alert(t("colors.alert"));
      return;
    }

    await addColor({ colorName: addName });
    refetchColor();
    setaddModal(false);
  }

  function openEditModal(e) {
    seteditName(e.colorName);
    setIdx(e.id);
    seteditModal(true);
  }

  async function EditColor(e) {
    e.preventDefault();
    let formData = {
      id: idx,
      colorName: editName,
    };
    await editColor(formData);
    refetchColor();
    seteditModal(false);
  }

  async function removeColor(id) {
    await deleteColor(id);
    refetchColor();
  }

  let [search, setSearch] = useState("");
  const [selectedColorId, setSelectedColorId] = useState(1);
  const { theme, setTheme } = useTheme();
  return (
    <div className="p-2 lg:p-6 overflow-y-scroll h-[88vh] w-full">
      <div className="flex justify-between items-center lg:text-xl text-xs">
        <div className="flex items-center gap-1 lg:gap-5">
          <Link to={"/others"}>
            <button className="font-medium">{t("colors.brands")}</button>
          </Link>
          <Link to={"/othersCategories"}>
            <button className="font-medium">{t("colors.categories")}</button>
          </Link>
          <Link to={"/othersSubCategories"}>
            <button className="font-medium">{t("colors.subcategories")}</button>
          </Link>
          <Link to={"/othersColors"}>
            <button className="font-medium border-b-4 border-gray-300 py-2">
              {t("colors.colors")}
            </button>
          </Link>
        </div>

        <button
          onClick={() => setaddModal(true)}
          className="bg-blue-600 text-white px-2 lg:px-8 py-0.5 lg:py-2 rounded lg:text-xs text-[10px]"
        >
          {t("colors.addNew")}
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
            onSubmit={AddColor}
            className={`w-[380px] shadow rounded p-5 space-y-5  ${
              theme == "dark" ? "bg-black" : "bg-white"
            }`}
          >
            <h1 className="font-semibold">{t("colors.addColor")}</h1>
            <input
              type="color"
              className="border border-gray-300 p-2 h-10 rounded w-7/10"
              value={addName}
              onChange={(e) => setaddName(e.target.value)}
            />

            <div className="flex gap-3 justify-between text-xs">
              <button
                onClick={() => setaddModal(false)}
                className="border border-[#E2E8F0] text-blue-600 px-8 py-2 rounded"
              >
                {t("colors.cancel")}
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-2 rounded "
              >
                {t("colors.save")}
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
            onSubmit={EditColor}
            className={`w-[380px] shadow rounded p-5 space-y-5  ${
              theme == "dark" ? "bg-black" : "bg-white"
            }`}
          >
            <h1 className="font-semibold">{t("colors.editColor")}</h1>
            <input
              type="color"
              className="border border-gray-300 p-2 h-10 rounded w-7/10"
              value={editName}
              onChange={(e) => seteditName(e.target.value)}
            />

            <div className="flex gap-3 justify-between text-xs">
              <button
                onClick={() => seteditModal(false)}
                className="border border-[#E2E8F0] text-blue-600 px-8 py-2 rounded"
              >
                {t("colors.cancel")}
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-2 rounded "
              >
                {t("colors.save")}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="lg:w-2/5 py-5">
        <fieldset className=" px-3 pb-3 border border-[#E2E8F0] rounded flex items-center justify-between">
          <legend className="text-xs px-1 text-[#737373]">
            {t("colors.search")}
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

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 mb-2">
        {dataColors &&
          dataColors.data
            ?.filter((e) =>
              e.colorName.toLowerCase().includes(search.toLowerCase())
            )
            .map((e, i) => (
              <div
                key={i}
                className="border border-gray-300 rounded p-2.5 flex justify-between"
              >
                <div>
                  <p className="font-bold uppercase text-[18px] mb-3">
                    {e.colorName}
                  </p>

                  <div
                    style={{ backgroundColor: e.colorName }}
                    className={`w-10 h-10 rounded-full border border-[rgb(183,183,183)]`}
                  ></div>
                </div>

                <div className="space-x-3 flex flex-col justify-center gap-5">
                  <button onClick={() => openEditModal(e)}>
                    <SquarePen size={18} color="blue" />
                  </button>
                  <button onClick={() => removeColor(e.id)}>
                    <Trash size={18} color="red" />
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default othersColors;
