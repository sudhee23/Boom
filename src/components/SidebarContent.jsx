import { Link, useNavigate } from "react-router-dom";
import { useLogoutUser } from "../api/authApi";
import { AiOutlineHome, AiOutlineUser, AiOutlinePlusCircle } from "react-icons/ai";
import { Button } from "./ui/button";

const SidebarContent = ({ mobile = false }) => {
  const navigate = useNavigate();
  const { logout } = useLogoutUser();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/auth/login");
  };
//  ${mobile ? 'h-full p-4' : 'h-screen p-6'}
  return (
    <div className={`flex flex-col justify-between h-screen p-4`}>
      <div className="space-y-6">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-blue-900 hover:text-pink-600">
          <AiOutlineHome size={20} /> Home
        </Link>
        <Link to="/uploadvideo" className="flex items-center gap-3 text-lg font-semibold text-blue-900 hover:text-pink-600">
          <AiOutlinePlusCircle size={20} /> Upload Video
        </Link>
        <Link to="/profile" className="flex items-center gap-3 text-lg font-semibold text-blue-900 hover:text-pink-600">
          <AiOutlineUser size={20} /> Profile
        </Link>
      </div>

      <Button onClick={handleLogout} className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white">
        Log Out
      </Button>
    </div>
  );
};

export default SidebarContent;
