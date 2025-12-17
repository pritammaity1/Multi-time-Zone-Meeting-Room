import React from "react";
import { useBookings } from "../../Context/BookingContext";
import { rooms } from "../../Data/MockData";

const ConflictView = () => {
  const { conflicts } = useBookings();

  const getRoomName = (roomId) => {
    rooms.find((r) => r.id === roomId)?.name || roomId;
  };

  if (!conflicts.length) {
    return (
      <div>
        <h2 className="text-lg font-semibold mb-2">Conflicts</h2>
        <p className="text-sm text-emerald-400">
          No Conflicts detected. You are all clear
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {conflicts.map((c, index) => (
        <div
          key={index}
          className="rounded-xl border border-rose-500/40 bg-rose-950/20 px-3 py-2"
        >
          <p className="text-sm font-medium text-rose-300 mb-1">
            {getRoomName(c.roomId)}
          </p>
          <ul className="text-xs text-slate-100 spae-y-1">
            {c.bookings.map((b) => (
              <li key={b.id}>
                <span className="font-semibold">{b.title}</span>
                {""}({b.startTime} → {b.endTime})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ConflictView;
