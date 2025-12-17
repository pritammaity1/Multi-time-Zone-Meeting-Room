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
    return <p className="text-sm text-red-400">{error}</p>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">All Bookings</h2>

        <button
          onClick={() => setShowForm((s) => !s)}
          className="px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-sm transition"
        >
          {showForm ? "Close" : "New Booking"}
        </button>
      </div>

      {/* CREATE BOOKING FORM */}
      {showForm && <BookingForm onSuccess={() => setShowForm(false)} />}

      {/* EMPTY STATE */}
      {bookings.length === 0 ? (
        <p className="text-sm text-slate-400">
          No bookings yet. Create one from the Room Browser.
        </p>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingList;
