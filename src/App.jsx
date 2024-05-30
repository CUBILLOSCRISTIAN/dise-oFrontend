import React from "react";
import { SideBar } from "./components/SideBar/SideBar";
import { Routes, Route } from "react-router-dom";
import UserDashboard from "./components/UserDashboard/UserDashboard.jsx";
import { Home } from "./components/Pages/HomePage.jsx";
import LogerDashboard from "./components/LogerDashboard/LogerDashboard.jsx";

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
                  <Route path="/Users" element={<UserDashboard />} />
                  <Route path="/SearchLogger" element={<LogerDashboard />} />
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
