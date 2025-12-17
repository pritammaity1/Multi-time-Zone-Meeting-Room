import React, { useState } from "react";
import SideBar from "./SideBar";
import HeaderBar from "./HeaderBar";
import RoomBrowser from "../Rooms/RoomBrowser";
import BookingList from "../Bookings/BookingList";
import ConflictView from "../Conflicts/ConflictView";

const AppShell = () => {
  const [activeView, setActiveView] = useState("rooms");
  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-50">
      {/* SideBar */}
      <SideBar activeView={activeView} onChangeView={setActiveView} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <HeaderBar />
        <main className="flex-1 px-6 py-4 overflow-y-auto bg-slate-900/60 backdrop-blur">
          {activeView === "rooms" && <RoomBrowser />}
          {activeView === "bookings" && <BookingList />}
          {activeView === "conflicts" && <ConflictView />}
        </main>
      </div>
    </div>
  );
};

export default AppShell;
