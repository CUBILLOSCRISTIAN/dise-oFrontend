import React from "react";
import { SideBar } from "./components/SideBar/SideBar";
import { Routes, Route } from "react-router-dom";
import  UserDashboard  from "./components/UserDashboard/UserDashboard.jsx";

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
                  <Route path="/" element={<UserDashboard />} />
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
