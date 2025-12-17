import React from "react";

const navItems = [
  { id: "rooms", label: "Rooms" },
  { id: "bookings", label: "Bookings" },
  { id: "conflicts", label: "Conflicts" },
];

const SideBar = ({ activeView, onChangeView }) => {
  return (
    <aside
      className="
        w-64 hidden md:flex flex-col
        border-r border-slate-800/70
        bg-slate-950/80 backdrop-blur-xl
        px-5 py-6
      "
    >
      {/* LOGO */}
      <div className="mb-10 flex items-center gap-3">
        <div
          className="
            h-9 w-9 rounded-xl
            bg-linear-to-br from-emerald-400/80 to-cyan-400/80
            shadow-[0_0_20px_rgba(16,185,129,0.35)]
          "
        />
        <div>
          <p className="text-sm font-semibold text-emerald-400 leading-tight">
            OrbitMeet
          </p>
          <p className="text-xs text-slate-400 leading-tight">Room Booking</p>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 flex flex-col gap-1.5">
        {navItems.map((item) => {
          const active = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`
                group relative flex items-center
                px-4 py-2.5 rounded-xl
                text-sm font-medium transition-all duration-200
                ${
                  active
                    ? "bg-slate-800/80 text-emerald-300 shadow-inner"
                    : "text-slate-300 hover:bg-slate-900/70"
                }
              `}
            >
              {/* ACTIVE INDICATOR */}
              {active && (
                <span
                  className="
                    absolute left-0 top-2 bottom-2 w-1
                    rounded-r bg-emerald-400
                  "
                />
              )}

              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="mt-8 pt-4 border-t border-slate-800/60">
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Multi-Office • Timezone-aware
        </p>
      </div>
    </aside>
  );
};

export default SideBar;
