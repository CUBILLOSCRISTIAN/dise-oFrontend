import React from "react";
import { ItemSideBar } from "./ItemSideBar";
import { SearchInput } from "./SearchInput";

export function SideBar() {
  const iconHome =
    "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6";
  const iconUsers =
    "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z";
  const iconLog =
    "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z";

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 h-screen overflow-y-auto bg-white">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="font-extrabold size-max">DISEÑO 2</h1>
        </div>

        

        {/* Sidebar items */}
        <div className="px-4 mt-6">
          <hr className="border-gray-200" />
        </div>

        <div className="flex flex-col flex-1 px-3 mt-6">
          <div className="space-y-4">
            <nav className="flex-1 space-y-2">
              <ItemSideBar icon={iconHome} to="/">
                Home
              </ItemSideBar>

              <hr className="border-gray-200" />

              <ItemSideBar icon={iconUsers} to="/Users">
                Users
              </ItemSideBar>

              <hr className="border-gray-200" />


              <hr className="border-gray-200" />

              <ItemSideBar icon={iconLog} to="/SearchLogger">
                Search Logger
              </ItemSideBar>
            </nav>

            <hr className="border-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
