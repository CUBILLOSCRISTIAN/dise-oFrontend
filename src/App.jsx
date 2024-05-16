import React from "react";
import { SideBar } from "../src/components/SideBar.jsx";
import { Routes, Route } from "react-router-dom";

import { Home } from "./Screens/Home.jsx";
import { CreateUser } from "./Screens/CreateUser.jsx";
import { Users } from "./Screens/Users.jsx";
import { SearchLogger } from "./Screens/SearchLogger.jsx";


function App() {
  return (
    <>
      <div className="flex flex-1 bg-white">
        <SideBar />
        <div className="flex flex-col flex-1">
          <main>
            <div className="py-6">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Users" element={<Users />} />
                  <Route path="/CreateUser" element={<CreateUser />} />
                  <Route path="/SearchLogger" element={<SearchLogger />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
