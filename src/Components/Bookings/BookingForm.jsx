import React, { useState } from "react";
import { DateTime } from "luxon";
import { useBookings } from "../../Context/BookingContext";
import { rooms, offices } from "../../Data/MockData";

const BookingForm = ({ onSuccess }) => {
  const { addBooking } = useBookings();

  const [title, setTitle] = useState("");
  const [roomId, setRoomId] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(30);
  const [attendees, setAttendees] = useState(1);
  const [isRecurring, setIsRecurring] = useState(false);
  const [error, setError] = useState(null);

  const selectedRoom = rooms.find((r) => r.id === roomId);
  const office = selectedRoom
    ? offices.find((o) => o.id === selectedRoom.officeId)
    : null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title || !roomId || !date || !startTime) {
      setError("All fields are required");
      return;
    }

    const start = DateTime.fromISO(`${date}T${startTime}`, {
      zone: office.timezone,
    });

    const end = start.plus({ minutes: duration });

    const bookingInput = {
      title,
      roomId,
      startTime: start.toISO(),
      endTime: end.toISO(),
      attendees,
      isRecurring,
      frequency: isRecurring ? "weekly" : null,
    };

    const result = await addBooking(bookingInput);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    onSuccess?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-slate-900/80 border-slate-800 rounded-xl p-4"
    >
      <h2 className="text-lg font-semibold ">New Booking</h2>
      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 px-3 py-1 rounded">
          {error}
        </p>
      )}

      <input
        className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm"
        placeholder="Meeting Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      >
        <option value="">Select Room</option>
        {rooms.map((room) => (
          <option value={room.id} key={room.id}>
            {room.name} ({room.capacity})
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <input
          type="date"
          className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>

      <div className="flex gap-2 ">
        <input
          type="number"
          min={1}
          className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm"
          placeholder="Attendees"
          value={attendees}
          onChange={(e) => setAttendees(+e.target.value)}
        />
        <select
          className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm"
          value={duration}
          onChange={(e) => setDuration(+e.target.value)}
        >
          <option value={30}>30 min</option>
          <option value={60}>1 hour</option>
          <option value={90}>1.5 hours</option>
          <option value={120}>2 hours</option>
        </select>
      </div>

      {selectedRoom && attendees > selectedRoom.capacity && (
        <p className="text-sm text-amber-300">
          {" "}
          ⚠ Attendees exceed room capacity
        </p>
      )}

      <label className="flex items-center gap-2 tex-sm">
        <input
          type="checkbox"
          checked={isRecurring}
          onChange={(e) => setIsRecurring(e.target.value)}
        />
        Weekly Recurring Meeting
      </label>

      <button
        type="submit"
        className="w-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded py-2 text-sm hover:bg-emerald-500/30"
      >
        Create Booking
      </button>
    </form>
  );
};

export default BookingForm;
