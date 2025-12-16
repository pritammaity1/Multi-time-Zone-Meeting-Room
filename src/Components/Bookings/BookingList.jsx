import React from "react";
import { useBookings } from "../../Context/BookingContext";
import { rooms, offices } from "../../Data/MockData";
import {
  formatRoomTimeRange,
  formatUserTimeRangeFromRoom,
  getUserTimezone,
} from "../../Utils/DateUtils";

function getRoomAndOffice(roomId) {
  const room = rooms.find((r) => r.id === roomId);
  const office = room ? offices.find((o) => o.id === room.officeId) : undefined;

  return { room, office };
}

const statusColors = {
  scheduled: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  cancelled: "bg-slate-600/15 text-slate-300 border-slate-500/40",
  "no-show": "bg-amber-500/15 text-amber-300 border-amber-500/40",
  attended: "bg-sky-500/15 text-sky-300 border-sky-500/40",
};

const BookingList = () => {
  const { booking, loading, error } = useBookings();
  const userTz = getUserTimezone();

  if (loading) {
    return (
      <p className="text-sm text-400 animate-pluse">Loading bookings...</p>
    );
  }

  if (!booking.length) {
    return (
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">All Bookings</h2>
        <p className="text-sm text-slate-400">
          No Bookings Yet. Create one from the room browser
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">All Bookings</h2>
        <p className="text-xs text-slate-500">
          Times are shown in both room and your local timezone({userTz})
        </p>
      </div>

      <ul className="space-y-2 text-sm">
        {booking.map((b) => {
          const { room, office } = getRoomAndOffice(b.roomId);
          const roomTimeZone = office?.timezone;

          const roomRange = roomTimeZone
            ? formatRoomTimeRange(b.startTime, b.endTime, roomTimeZone)
            : `${b.startTime} -> ${b.endTime}`;

          const userRange =
            roomTimeZone &&
            formatUserTimeRangeFromRoom(
              b.startTime,
              b.endTime,
              roomTimeZone,
              userTz
            );
          const statusClass =
            statusColors[b.status] || statusColors["scheduled"];

          return (
            <li
              key={b.id}
              className="px-3 py-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col gap-1 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-medium text-slate-50">{b.title}</p>
                <p className="text-xs text-slate-400">
                  {room ? room.name : b.roomId}
                  {""}
                  {office && <span>• {office.name}</span>}
                </p>
                {roomTimeZone && (
                  <>
                    <p className="text-[11px] text-salte-300 mt-1">
                      Room Time ({roomTimeZone}) : {""}
                      <span className="font-medium"> {roomRange}</span>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {" "}
                      Your Time ({userTz}) : {userRange}
                    </p>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 mt-2 md:mt-0">
                {b.isRecurring && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/40">
                    Weekly
                  </span>
                )}
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full border ${statusClass}`}
                >
                  {b.status}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookingList;
