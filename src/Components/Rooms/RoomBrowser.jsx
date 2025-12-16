import React from "react";
import { DateTime } from "luxon";
import { useBookings } from "../../Context/BookingContext";
import { rooms, offices } from "../../Data/MockData";
import { formatRoomTimeRange } from "../../Utils/DateUtils";

const RoomBrowser = () => {
  const { bookings, conflicts } = useBookings();

  // Groups rooms by office for display
  const roomsByOffice = offices.map((office) => ({
    office,
    rooms: rooms.filter((r) => r.officeId === office.id),
  }));

  const conflictingRoomId = new Set(conflicts.map((c) => c.roomId));

  // Find Next upcoming booking for a room (in that office timezone)
  const getNextBookingForRoom = (roomId, roomTimeZone) => {
    const now = DateTime.now().setZone(roomTimeZone);

    const upcoming = bookings
      .filter((b) => b.roomId === roomId && b.status !== "cancelled")
      .map((b) => ({
        booking: b,
        start: DateTime.formatISO(b.startTime, { zone: roomTimeZone }),
      }))
      .filter((entry) => entry.start >= now)
      .sort((a, b) => a.start - b.start)[0];
    return upcoming?.booking || null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Room Browser</h2>
        <p className="text-xs text-slate-500">
          Conflicting rooms: {conflictingRoomId.size}
        </p>
      </div>

      <div className="space-y-6">
        {roomsByOffice.map(({ office, rooms }) => (
          <section key={office.id} className="space-y-3">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-medium text-slate-200">
                {office.name}
                {""}
                <span className="tetx-xs text-slate-500">
                  ({office.timezone})
                </span>
              </h3>
            </div>

            <div className=" grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {officeRooms.map((room) => {
                const next = getNextBookingForRoom(room.id, office.timezone);
                const hasConflict = conflictingRoomId.has(room.id);

                const nextRange =
                  next &&
                  formatRoomTimeRange(
                    next.startTime,
                    next.endTime,
                    office.timezone
                  );

                return (
                  <div
                    key={room.id}
                    className={`rounded-xl border px-3 py-3 bg-slate-900/70 backdrop-blur transition
                      ${
                        hasConflict
                          ? "border-rose-500/60 shadow-[0_0_0_1px_rgba(244,63,94,0.4)]"
                          : "border-slate-800 hover:border-emerald-500/40"
                      }
                    `}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-50">
                          {room.name}
                        </p>
                        <p className="text-xs text-salte-400">
                          Capacity: {room.cpacity} people
                        </p>
                      </div>

                      {hasConflict && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/40">
                          Conflict
                        </span>
                      )}
                    </div>

                    <div className="mt-2 text-xs text-slate-400">
                      {next ? (
                        <>
                          <p className="text-slate-300">
                            Next: {""}
                            <span className="font-medium">{next.title}</span>
                          </p>
                          <p>{nextRange}</p>
                        </>
                      ) : (
                        <p className="text-emerald-300">No Upcoming Bookings</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default RoomBrowser;
