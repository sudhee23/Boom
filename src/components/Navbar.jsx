import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./ui/Avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import SidebarContent from "./SidebarContent";
import TooltipWrapper from "./ui/TooltipWrapper";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("")); // adjust based on your app
    if (user) {
      setIsLoggedIn(true);
      setUserName(user.name);
    }
  }, []);

  return (
    <nav className="bg-pink-500 text-white fixed top-0 w-full z-50 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          {/* Hamburger for mobile */}
          <div className="md:hidden cursor-pointer">
            <Sheet>
              <SheetTrigger className="text-white text-2xl">
                <AiOutlineMenu />
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 bg-pink-100 h-full">
                <SheetHeader>
                  <SheetTitle className="text-blue-900 text-lg px-4 pt-4">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <SidebarContent mobile />
              </SheetContent>
            </Sheet>
          </div>

          <Link to="/" className="text-2xl font-bold text-white">
            Boom
          </Link>
        </div>

        {/* Medium-size search bar */}
        <div className="hidden md:block flex-1 mx-6 max-w-md">
          <Input
            placeholder="Search..."
            className="rounded-xl px-4 py-1 w-full bg-white text-gray-700"
          />
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <TooltipWrapper content={userName}>
              <div
                onClick={() => navigate("/profile")}
                className="cursor-pointer"
              >
                <Avatar src="/avatar.jpg" size={36} />
              </div>
            </TooltipWrapper>
          ) : (
            <Button
              onClick={() => navigate("/auth/login")}
              className="bg-white text-pink-600 hover:bg-gray-100"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
