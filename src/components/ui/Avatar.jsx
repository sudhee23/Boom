import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Avatar = ({ src, alt = "User avatar", size = 40, className = "" }) => {
  return src ? (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  ) : (
    <FaUserCircle size={size} className={`text-gray-400 ${className}`} />
  );
};

export default Avatar;
