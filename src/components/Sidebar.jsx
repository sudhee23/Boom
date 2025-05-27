// import { Link, useNavigate } from "react-router-dom";
// import { useLogoutUser } from "../api/authApi";
// import { AiOutlineHome, AiOutlineUser, AiOutlinePlusCircle } from "react-icons/ai";
// import { Button } from "./ui/button";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const { logout } = useLogoutUser();

//   const handleLogout = () => {
//     logout();
//     localStorage.removeItem("token");
//     navigate("/auth/login");
//   };

//   return (
//     <aside className="hidden md:flex flex-col justify-between h-full bg-pink-100 text-blue-900 w-64 p-6 shadow-lg rounded-r-3xl">
//       <div className="space-y-6">
//         <Link to="/" className="flex items-center gap-3 text-lg font-semibold hover:text-pink-600">
//           <AiOutlineHome size={20} /> Home
//         </Link>
//         <Link to="/profile" className="flex items-center gap-3 text-lg font-semibold hover:text-pink-600">
//           <AiOutlineUser size={20} /> Profile
//         </Link>
//         <Link to="/uploadvideo" className="flex items-center gap-3 text-lg font-semibold hover:text-pink-600">
//           <AiOutlinePlusCircle size={20} /> Upload Video
//         </Link>
//       </div>

//       <Button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white">
//         Log Out
//       </Button>
//     </aside>
//   );
// };

// export default Sidebar;

import SidebarContent from "./SidebarContent";

const Sidebar = () => {
  return (
    <aside className="hidden md:flex bg-pink-100 text-blue-900 w-64 shadow-lg rounded-r-3xl">
      <SidebarContent />
    </aside>
  );
};

export default Sidebar;
