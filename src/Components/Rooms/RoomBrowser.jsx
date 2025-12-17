import React from "react";
import { DateTime } from "luxon";
import { useBookings } from "../../Context/BookingContext.jsx";
import { rooms, offices } from "../../Data/MockData";
import { formatRoomTimeRange } from "../../Utils/DateUtils";

const RoomBrowser = () => {
  const { bookings = [], conflicts = [] } = useBookings();

  // Group rooms by office
  const roomsByOffice = offices.map((office) => ({
    office,
    rooms: rooms.filter((r) => r.officeId === office.id),
  }));

  const conflictingRoomIds = new Set(conflicts.map((c) => c.roomId));

  // Get next upcoming booking for a room
  const getNextBookingForRoom = (roomId, roomTimezone) => {
    const now = DateTime.now().setZone(roomTimezone);

    const upcoming = bookings
      .filter((b) => b.roomId === roomId && b.status !== "cancelled")
      .map((b) => ({
        booking: b,
        start: DateTime.fromISO(b.startTime, { zone: roomTimezone }),
      }))
      .filter((entry) => entry.start >= now)
      .sort((a, b) => a.start - b.start)[0];

    return upcoming?.booking || null;
  };

  return (
    <div className="space-y-10">
      {/* HERO HEADER */}
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800 px-6 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Room Browser</h2>
          <p className="text-xs text-slate-400">
            Conflicting rooms: {conflictingRoomIds.size}
          </p>
        </div>
      </div>

      {/* OFFICES */}
      {roomsByOffice.map(({ office, rooms: officeRooms }) => (
        <section key={office.id} className="space-y-5">
          {/* OFFICE HEADER */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 tracking-wide">
              {office.name}
              <span className="ml-2 text-xs text-slate-400">
                ({office.timezone})
              </span>
            </h3>
            <div className="h-px bg-gradient-to-r from-slate-700/60 to-transparent mt-2" />
          </div>

          {/* ROOMS GRID */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {officeRooms.map((room) => {
              const next = getNextBookingForRoom(room.id, office.timezone);
              const hasConflict = conflictingRoomIds.has(room.id);

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
                  className={`relative rounded-xl border px-5 py-4
                    bg-slate-900/90
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]
                    transition-all duration-200 ease-out
                    hover:-translate-y-0.5 hover:shadow-lg cursor-pointer
                    ${
                      hasConflict
                        ? "border-rose-500/60"
                        : "border-slate-800 hover:border-emerald-500/40"
                    }
                  `}
                >
                  {/* STATUS DOT */}
                  <span
                    className={`absolute top-4 right-4 h-2.5 w-2.5 rounded-full ${
                      hasConflict
                        ? "bg-rose-400"
                        : next
                        ? "bg-amber-400"
                        : "bg-emerald-400"
                    }`}
                  />

                  {/* HEADER */}
                  <div>
                    <p className="text-sm font-semibold text-slate-50">
                      {room.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      Capacity: {room.capacity} people
                    </p>
                  </div>

                  {/* BODY */}
                  <div className="mt-4 text-xs space-y-1">
                    {hasConflict ? (
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full
                        bg-rose-500/15 text-rose-300 text-[11px] font-medium"
                      >
                        Conflict
                      </span>
                    ) : next ? (
                      <>
                        <p className="text-slate-300">
                          Next:{" "}
                          <span className="font-medium">{next.title}</span>
                        </p>
                        <p className="text-slate-400">{nextRange}</p>
                      </>
                    ) : (
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full
                        bg-emerald-500/15 text-emerald-300 text-[11px] font-medium"
                      >
                        Available
                      </span>
                    )}
                  </div>

                  {/* CTA HINT */}
                  <p className="mt-4 text-[11px] text-slate-500">
                    Click to book this room
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default RoomBrowser;
