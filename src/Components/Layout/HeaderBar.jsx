import React from "react";
import { offices } from "../../Data/MockData";

const HeaderBar = () => {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/60 backdrop-blur flex items-center justify-between px-4 md:px-6">
      <div>
        <h1 className="text-lg md:text-xl font-semibold tracking-tight">
          Meeting Room Booking
        </h1>
        <p className="text-xs text-slate-400">
          View availability in each office's local time
        </p>
      </div>
      <div className="flex items-center gap-4 text-xs md:text-sm">
        <div className="hidden sm:flex gap-3">
          {offices.map((office) => (
            <div
              key={office.id}
              className="px-2 py-1 rounded-lg border border-slate-800 bg-slate-900/60"
            >
              <p className="font-medium">{office.name}</p>
              <p className="text-[10px] text-slate-400">{office.timezone}</p>
            </div>
          ))}
        </div>
        <div className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px]">
          Your timezone: local browser time
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
