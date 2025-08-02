// import { AlignJustify, Folder, House, ShoppingBasket } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router";

// const Menu = () => {
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("admin_token");
//     setToken(storedToken);
//   }, []);

//   let [btnLink, setbtnLink] = useState();

//   return (
//     <div className="w-1/5 h-[88vh]">
//       {token && (
//         <div className="bg-[#1C2536] h-full">
//           <div className="p-2.5 flex flex-col gap-2.5">
//             <Link to={"/"}>
//               <button
//                 // onClick={() => setbtnLink("dash")}
//                 className={` flex gap-5  w-full p-2.5 rounded
//                      ${
//                        btnLink
//                          ? "text-[#5A607F] bg-white"
//                          : "text-white bg-inherit"
//                      }
//                      `}
//               >
//                 <House color="#979797" /> <span>Dashboard</span>
//               </button>
//             </Link>

//             <Link to={"/orders"}>
//               <button
//                 // onClick={() => setbtnLink("ord")}
//                 className={` flex gap-5  w-full p-2.5 rounded
//                      ${
//                        btnLink
//                          ? "text-[#5A607F] bg-white"
//                          : "text-white bg-inherit"
//                      }`}
//               >
//                 <AlignJustify color="#979797" /> <span>Orders</span>
//               </button>
//             </Link>

//             <Link to={"/products"}>
//               <button
//                 // onClick={() => setbtnLink("pro")}
//                 className={` flex gap-5  w-full p-2.5 rounded
//                      ${
//                        btnLink
//                          ? "text-[#5A607F] bg-white"
//                          : "text-white bg-inherit"
//                      }`}
//               >
//                 <ShoppingBasket color="#979797" /> <span>Products</span>
//               </button>
//             </Link>

//             <Link to={"/others"}>
//               <button
//                 // onClick={() => setbtnLink("oth")}
//                 className={` flex gap-5  w-full p-2.5 rounded
//                      ${
//                        btnLink
//                          ? "text-[#5A607F] bg-white"
//                          : "text-white bg-inherit"
//                      }`}
//               >
//                 <Folder color="#979797" /> <span>Other</span>
//               </button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default React.memo(Menu);
