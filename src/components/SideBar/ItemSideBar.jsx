import React from "react";
import { NavLink } from "react-router-dom";

export function ItemSideBar({ children, icon, to }) {
  const defaultClasses =
    "flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200";
  const activeClasses = "text-white bg-[#0e101c] rounded-lg group";
  const inactiveClasses =
    "text-gray-900 hover:text-white rounded-lg hover:bg-[#0e101c] group";

  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return isActive
          ? `${defaultClasses} ${activeClasses}`
          : `${defaultClasses} ${inactiveClasses}`;
      }}
    >
      <svg
        className="flex-shrink-0 w-5 h-5 mr-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
      {children}
    </NavLink>
  );
}
