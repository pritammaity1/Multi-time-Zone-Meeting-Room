import React from "react";
import { offices } from "../../Data/MockData";
import { getUserTimezone } from "../../Utils/DateUtils";

const HeaderBar = () => {
  const userTz = getUserTimezone();
  return (
    <header
      className="
        sticky top-0 z-30
        border-b border-slate-800/70
        bg-slate-950/70 backdrop-blur
        px-5 md:px-8 py-3
      "
    >
      <div className="flex items-center justify-between gap-6">
        {/* LEFT: TITLE */}
        <div>
          <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-100">
            Meeting Room Booking
          </h1>
          <p className="text-xs text-slate-400">
            View availability in each office’s local time
          </p>
        </div>

        {/* RIGHT: TIMEZONES */}
        <div className="flex items-center gap-3">
          {/* OFFICE TIMEZONES */}
          <div className="hidden md:flex items-center gap-2">
            {offices.map((office) => (
              <div
                key={office.id}
                className="
                  px-3 py-1.5 rounded-lg
                  bg-slate-900/70 border border-slate-800
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]
                "
              >
                <p className="text-xs font-medium text-slate-200 leading-tight">
                  {office.name}
                </p>
                <p className="text-[10px] text-slate-400 leading-tight">
                  {office.timezone}
                </p>
              </div>
            ))}
          </div>

          {/* USER TIMEZONE */}
          <div
            className="
              px-3 py-1.5 rounded-full
              bg-slate-900/80 border border-slate-800
              text-[11px] text-slate-300
            "
          >
            Your timezone: {userTz}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
