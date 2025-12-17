import React from "react";
import {
  formatRoomTimeRange,
  formatUserTimeRangeFromRoom,
  getUserTimezone,
} from "../../Utils/DateUtils";
import { rooms, offices } from "../../Data/MockData";

const statusColors = {
  scheduled: {
    pill: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
    bar: "bg-emerald-400",
  },
  canceled: {
    pill: "bg-slate-500/15 text-slate-300 border-slate-500/40",
    bar: "bg-slate-500",
  },
  "no-show": {
    pill: "bg-amber-500/15 text-amber-300 border-amber-500/40",
    bar: "bg-amber-400",
  },
  attended: {
    pill: "bg-sky-500/15 text-sky-300 border-sky-500/40",
    bar: "bg-sky-400",
  },
};

function getRoomAndOffice(roomId) {
  const room = rooms.find((r) => r.id === roomId);
  const office = room ? offices.find((o) => o.id === room.officeId) : null;
  return { room, office };
}

const BookingItem = ({ booking }) => {
  const { room, office } = getRoomAndOffice(booking.roomId);
  const userTz = getUserTimezone();

  if (!room || !office) return null;

  const styles = statusColors[booking.status] || statusColors.scheduled;

  return (
    <div
      className="relative rounded-xl border border-slate-800
      bg-slate-900/90 px-5 py-4
      shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]
      transition-all duration-200 ease-out
      hover:-translate-y-0.5 hover:shadow-lg"
    >
      {/* LEFT STATUS BAR */}
      <span
        className={`absolute left-0 top-4 h-8 w-1 rounded-r ${styles.bar}`}
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* LEFT CONTENT */}
        <div>
          <h3 className="text-sm font-semibold text-slate-100 leading-tight">
            {booking.title}
          </h3>

          <p className="text-xs text-slate-400 mt-0.5">
            {room.name} • {office.name}
          </p>

          <div className="mt-2 space-y-0.5 text-[11px]">
            <p className="text-slate-300">
              Room time ({office.timezone}):{" "}
              <span className="font-medium">
                {formatRoomTimeRange(
                  booking.startTime,
                  booking.endTime,
                  office.timezone
                )}
              </span>
            </p>

            <p className="text-slate-400">
              Your time ({userTz}):{" "}
              {formatUserTimeRangeFromRoom(
                booking.startTime,
                booking.endTime,
                office.timezone
              )}
            </p>
          </div>
        </div>

        {/* RIGHT BADGES */}
        <div className="flex items-center gap-2 self-start md:self-center">
          {booking.isRecurring && (
            <span
              className="text-[10px] px-2 py-0.5 rounded-full
              bg-sky-500/10 text-sky-300 border border-sky-500/40"
            >
              Weekly
            </span>
          )}

          <span
            className={`text-[10px] px-2 py-0.5 rounded-full border ${styles.pill}`}
          >
            {booking.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingItem;
