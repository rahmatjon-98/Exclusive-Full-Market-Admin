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
import Menu from "./menu";

const Dashboard = () => {
  let navigate = useNavigate();
  let token = localStorage.getItem("admin_token");

  useEffect(() => {
    token ? navigate("/") : navigate("/login");
  }, []);

  const data = [
    { name: "Page 1", uv: 300, pv: 2400, amt: 2400 },
    { name: "Page 2", uv: 200, pv: 2400, amt: 2400 },
    { name: "Page 3", uv: 700, pv: 2400, amt: 2400 },
    { name: "Page 4", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page 5", uv: 100, pv: 2400, amt: 2400 },
    { name: "Page 6", uv: 800, pv: 2400, amt: 2400 },
    { name: "Page 7", uv: 500, pv: 2400, amt: 2400 },
    { name: "Page 8 ", uv: 900, pv: 2400, amt: 2400 },
  ];

  return (
    <div className="flex items-start">
      <Menu />
      
      <div className="p-6 overflow-y-scroll h-[88vh]">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2 bg-white p-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#FEF3F2] p-4 rounded flex items-center gap-5">
                <img src={img2} alt="" />
                <div>
                  <p className="text-gray-600">Sales</p>
                  <p className="text-2xl font-bold">$152k</p>
                </div>
              </div>
              <div className="bg-[#FFFAEB] p-4 rounded flex items-center gap-5">
                <img src={img3} alt="" />
                <div>
                  <p className="text-gray-600">Cost</p>
                  <p className="text-2xl font-bold">$99.7k</p>
                </div>
              </div>
              <div className="bg-[#F0FDF9] p-4 rounded flex items-center gap-5">
                <img src={img4} alt="" />
                <div>
                  <p className="text-gray-600">Profit</p>
                  <p className="text-2xl font-bold">$32.1k</p>
                </div>
              </div>
            </div>
            <p className="font-semibold mb-4">Sales Revenue</p>
            <div className="w-full h-78  rounded flex items-center justify-center text-blue-600 font-medium">
              {/* <img className="w-full" src={img1} alt="" /> */}
              <LineChart
                width={600}
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
                  name="My 1"
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

          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold">Top selling products</p>
              <button className="font-semibold text-sm flex items-center gap-2">
                See All <ArrowRight size={20} />
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
                      <p className="font-medium text-sm">Healthcare Erbology</p>
                      <p className="text-sm text-gray-500">in Accessories</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-green-600">13,153</p>
                    <p className="text-sm text-gray-500">in sales</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <p className="font-semibold mb-4">Recent Transactions</p>
            <table className="w-full text-sm ">
              <thead className="text-gray-500 text-left">
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody className="text-gray-700 my-2">
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
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>{item.amount}</td>
                    <td className="py-1">
                      <span
                        className={`inline-block  py-1 px-5 text-xs font-medium rounded ${
                          item.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <p className="font-semibold mb-4">Top Products by Units Sold</p>
            <table className="w-full text-sm ">
              <thead className="text-gray-500 text-left">
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>units</th>
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
                        className={`inline-block px-2 py-1 text-xs font-medium `}
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
