import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";

import img from "../../shared/images/Group 1116606595.png";
import img1 from "../../shared/images/div.MuiPaper-root.png";
import img2 from "../../shared/images/iconly-glass-chart.svg.png";
import img3 from "../../shared/images/iconly-glass-discount.svg.png";
import img4 from "../../shared/images/iconly-glass-tick.svg.png";
import img5 from "../../shared/images/div.MuiBox-root.png";
import img6 from "../../shared/images/Image.png";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const Dashboard = () => {
  const { t } = useTranslation();
  let navigate = useNavigate();
  let token = localStorage.getItem("admin_token");

  useEffect(() => {
    token ? navigate("/") : navigate("/login");
  }, []);

  const { theme, setTheme } = useTheme();
  const data = [
    { name: t("dashboard.1"), uv: 0, pv: 2400, amt: 2400 },
    { name: t("dashboard.2"), uv: 200, pv: 2400, amt: 2400 },
    { name: t("dashboard.3"), uv: 300, pv: 2400, amt: 2400 },
    { name: t("dashboard.4"), uv: 200, pv: 2400, amt: 2400 },
    { name: t("dashboard.5"), uv: 550, pv: 2400, amt: 2400 },
    { name: t("dashboard.6"), uv: 600, pv: 2400, amt: 2400 },
    { name: t("dashboard.7"), uv: 750, pv: 2400, amt: 2400 },
    { name: t("dashboard.8"), uv: 800, pv: 2400, amt: 2400 },
    { name: t("dashboard.9"), uv: 700, pv: 2400, amt: 2400 },
    { name: t("dashboard.10"), uv: 900, pv: 2400, amt: 2400 },
    { name: t("dashboard.11"), uv: 1100, pv: 2400, amt: 2400 },
  ];

  return (
    <div className="p-2">
      <div className="p-0 lg:p-6 overflow-y-scroll w-[100%] h-[91vh] lg:h-[88vh]">
        <h1 className="text-2xl font-bold mb-6">{t("dashboard.12")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 ">
          <div className={`lg:col-span-2  p-4 `}>
            <div className="grid grid-cols-3 gap-2 lg:gap-4 mb-6">
              <div className="bg-[#FEF3F2] p-4 rounded lg:flex-row flex-col justify-center flex items-center gap-5">
                <img className="lg:w-auto w-3/4" src={img2} alt="" />
                <div>
                  <p className="text-gray-600">{t("dashboard.13")}</p>
                  <p className="text-sm lg:text-2xl font-bold text-black">
                    $152k
                  </p>
                </div>
              </div>
              <div className="bg-[#FFFAEB] p-4 rounded lg:flex-row flex-col justify-center flex items-center gap-5">
                <img className="lg:w-auto w-3/4" src={img3} alt="" />
                <div>
                  <p className="text-gray-600">{t("dashboard.14")}</p>
                  <p className="text-sm lg:text-2xl font-bold text-black">
                    $99.7k
                  </p>
                </div>
              </div>
              <div className="bg-[#F0FDF9] p-4 rounded lg:flex-row flex-col justify-center flex items-center gap-5">
                <img className="lg:w-auto w-3/4" src={img4} alt="" />
                <div>
                  <p className="text-gray-600">{t("dashboard.15")}</p>
                  <p className="text-sm lg:text-2xl font-bold text-black">
                    $32.1k
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-4">{t("dashboard.16")}</p>
              <div className="w-full h-25 lg:h-78  rounded flex items-center justify-center text-blue-600 font-medium">
                <LineChart
                  width={800}
                  height={300}
                  data={data}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
                  <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="purple"
                    strokeWidth={2}
                    name={t("dashboard.17")}
                  />
                  <XAxis dataKey="name" />
                  <YAxis
                    width="auto"
                    label={{ value: "UV", position: "insideLeft", angle: -90 }}
                  />
                  <Legend align="right" />
                  <Tooltip />
                </LineChart>
              </div>
            </div>
          </div>

          <div className={` lg:p-4 rounded shadow`}>
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold">{t("dashboard.18")}</p>
              <button className="font-semibold text-sm flex items-center gap-2">
                {t("dashboard.19")} <ArrowRight size={20} />
              </button>
            </div>
            <div className="space-y-2.5">
              {[1, 2, 3, 4, 5].map((e, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={img5}
                      alt="product"
                      className="w-10 h-10 rounded"
                    />
                    <div>
                      <p className="font-medium text-sm">{t("dashboard.20")}</p>
                      <p className="text-sm text-gray-500">
                        {t("dashboard.21")}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-green-600">13,153</p>
                    <p className="text-sm text-gray-500">{t("dashboard.22")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className={` lg:p-4 rounded shadow`}>
            <p className="font-semibold mb-4">{t("dashboard.23")}</p>
            <table className="w-full text-sm ">
              <thead className="text-gray-300 text-left">
                <tr>
                  <th className="px-2">{t("dashboard.24")}</th>
                  <th className="px-2">{t("dashboard.25")}</th>
                  <th className="px-2">{t("dashboard.26")}</th>
                  <th className="px-2">{t("dashboard.27")}</th>
                </tr>
              </thead>

              <tbody className="text-gray-400 my-2">
                {[
                  {
                    name: "Jagarnath S.",
                    date: "24.05.2023",
                    amount: "$124.97",
                    status: "Paid",
                  },
                  {
                    name: "Jagarnath S.",
                    date: "24.05.2023",
                    amount: "$124.97",
                    status: "Pending",
                  },
                  {
                    name: "Jagarnath S.",
                    date: "24.05.2023",
                    amount: "$124.97",
                    status: "Paid",
                  },
                  {
                    name: "Jagarnath S.",
                    date: "24.05.2023",
                    amount: "$124.97",
                    status: "Pending",
                  },
                ].map((item, idx) => (
                  <tr key={idx} className=" space-y-2">
                    <td className="px-1">{item.name}</td>
                    <td className="px-1">{item.date}</td>
                    <td className="px-1">{item.amount}</td>
                    <td className="p-1">
                      <span
                        className={`inline-block  py-1 px-5 text-xs font-medium rounded ${
                          item.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {t(
                          item.status === "Paid"
                            ? "dashboard.28"
                            : "dashboard.29"
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={` lg:p-4 rounded shadow`}>
            <p className="font-semibold mb-4">{t("dashboard.30")}</p>
            <table className="w-full text-sm ">
              <thead className="text-gray-300 text-left">
                <tr>
                  <th>{t("dashboard.31")}</th>
                  <th>{t("dashboard.32")}</th>
                  <th>{t("dashboard.33")}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Men Grey Hoodie", price: "$49.90", units: 204 },
                  { name: "Men Grey Hoodie", price: "$49.90", units: 204 },
                  { name: "Men Grey Hoodie", price: "$49.90", units: 204 },
                ].map((e, idx) => (
                  <tr key={idx} className="space-y-2">
                    <td className="flex items-center gap-2">
                      <img src={img6} alt="" />
                      {e.name}
                    </td>
                    <td>{e.price}</td>
                    <td>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium`}
                      >
                        {e.units}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
