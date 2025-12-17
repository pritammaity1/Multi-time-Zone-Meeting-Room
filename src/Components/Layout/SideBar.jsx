import React from "react";

const navItems = [
  { id: "rooms", label: "Rooms" },
  { id: "bookings", label: "Bookings" },
  { id: "conflicts", label: "Conflicts" },
];

const SideBar = ({ activeView, onChangeView }) => {
  return (
    <aside className="w-60 border-r border-slate-800 bg-slate-950/80 backdrop-blur-xl px-4 py-6 hidden md:flex flex-col">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-linear-to-br from-emerald-400/80 to-cyan-400/80 shadow-lg" />
          <div>
            <p className="text-sm font-semibold text-emerald-400">OrbitMeet</p>
            <p className="text-xs text-slate-400">Room Booking</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const active = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`text-sm text-left px-3 py-2 rounded-xl transition ${
                active
                  ? "bg-slate-800 text-emerald-300 shadow-inner"
                  : "text-slate-300 hover:bg-slate-900"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-6 text-xs text-shadow-slate-500">
        <p> Multi-Office • Timezone-aware</p>
      </div>
    </aside>
  );
};

export default SideBar;
