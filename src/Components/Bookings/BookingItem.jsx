import React from "react";
import {
  formatRoomTimeRange,
  formatUserTimeRangeFromRoom,
  getUserTimezone,
} from "../../Utils/DateUtils";
import { rooms, offices } from "../../Data/MockData";

const statusColors = {
  scheduled: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  canceled: "bg-slate-500/15 text-slate-300 border-slate-500/40",
  "no-show": "bg-amber-500/15 text-amber-300 border-amber-500/40",
  attended: "bg-sky-500/15 text-sky-300 border-sky-500/40",
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
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 flex flex-col gap-2 md:flex-row md:justify-between">
      <div>
        <h3 className="font-semibold text-slate-100">{booking.title}</h3>
        <p className="text-xs text-slate-400">
          {room.name} • {office.name}
        </p>

        <p className="text-xs mt-1 text-slate-300">
          Room Time ({office.timezone}) : {""}
          <span className="font-medium">
            {formatRoomTimeRange(
              booking.startTime,
              booking.endTime,
              office.timezone
            )}
          </span>
        </p>

        <p className="text-xs text-slate-400">
          Your Time ({userTz}) : {""}
          {formatUserTimeRangeFromRoom(
            booking.startTime,
            booking.endTime,
            office.timezone
          )}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-2 md:mt-0">
        {booking.isRecurring && (
          <span className="text-[10px] px-2 py-0.5 rounded-full border border-sky-500/40 bg-sky-500/10 text-sky-300">
            Weekly
          </span>
        )}
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full border ${
            statusColors[booking.status] || statusColors.scheduled
          }`}
        >
          {booking.status}
        </span>
      </div>
    </div>
  );
};

export default BookingItem;
