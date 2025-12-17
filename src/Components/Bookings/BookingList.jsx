import React, { useState } from "react";
import { useBookings } from "../../Context/BookingContext";
import { rooms, offices } from "../../Data/MockData";
import {
  formatRoomTimeRange,
  formatUserTimeRangeFromRoom,
  getUserTimezone,
} from "../../Utils/DateUtils";

import BookingForm from "./BookingForm";
import BookingItem from "./BookingItem";

const BookingList = () => {
  const { bookings = [], loading, error } = useBookings();
  const [showForm, setShowForm] = useState(false);

  if (loading) {
    return (
      <p className="text-sm text-slate-400 animate-pulse">Loading bookings…</p>
    );
  }

  if (error) {
    return <p className="text-sm text-rose-400">{error}</p>;
  }

  return (
    <div className="space-y-8">
      {/* HERO HEADER */}
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800 px-6 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">All Bookings</h2>

          <button
            onClick={() => setShowForm((s) => !s)}
            className="inline-flex items-center gap-2
              px-4 py-2 rounded-lg
              bg-emerald-500/20 hover:bg-emerald-500/30
              border border-emerald-500/40
              text-emerald-300 text-sm font-medium
              transition"
          >
            {showForm ? "Close" : "New Booking"}
          </button>
        </div>
      </div>

      {/* CREATE BOOKING FORM */}
      {showForm && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
          <BookingForm onSuccess={() => setShowForm(false)} />
        </div>
      )}

      {/* EMPTY STATE */}
      {bookings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 p-6 text-center">
          <p className="text-sm text-slate-400">
            No bookings yet. Create one from the Room Browser.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingList;
