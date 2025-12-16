import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  fetchBooking,
  createBooking,
  updateBooking,
  cancelBooking,
} from "../Api/BookingsApi";

function intervalsOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(flase);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchBooking()
      .then((data) => {
        if (!isMounted) return;
        setBooking(data);
        setError(null);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "Failed to load booking");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const refreshBookings = async () => {
    setLoading(true);
    try {
      const data = await fetchBooking();
      setBooking(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to refresh bookings");
    } finally {
      setLoading(false);
    }
  };

  const addBooking = async (bookingInput) => {
    setLoading(true);
    try {
      const created = await createBooking(bookingInput);
      setBooking((prev) => [...prev, created]);
      return { ok: true, booking: created };
    } catch (err) {
      return { ok: false, error: err.message || "Failed to create booking" };
    } finally {
      setLoading(false);
    }
  };

  const editBooking = async (id, updates) => {
    setLoading(true);
    try {
      const updated = await updateBooking(id, updates);
      setBooking((prev) => prev.map((b) => (b.id === id ? update : b)));
      return { ok: true, booking: updated };
    } catch (err) {
      return { ok: false, error: err.message || "Failed to update booking" };
    } finally {
      setLoading(false);
    }
  };

  const cancelBookingActtion = async (id) => {
    setLoading(true);
    try {
      const updated = await cancelBooking(id);
      setBooking((prev) => prev.map((b) => (b.id === id ? updated : id)));
      return { ok: true, booking: updated };
    } catch (err) {
      return { ok: false, error: err.message || "Failed to cancel booking" };
    } finally {
      setLoading(false);
    }
  };

  // Delete conflicts (ver basic version)
  const conflicts = useMemo(() => {
    const byRoom = {};
    booking.forEach((b) => {
      if (b.status === "cancelled") return;
      if (!byRoom[b.roomId]) byRoom[b.roomId] = [];
      byRoom[b.roomId].push(b);
    });

    const result = [];

    Object.entries(byRoom).forEach(([roomId, list]) => {
      // sort by start time
      const sorted = [...list].sort(
        (a, b) => new Date(a.startTime) - new Date(b.startTime)
      );

      for (let i = 0; i < sorted.length; i++) {
        for (let j = i + 1; j < sorted.length; j++) {
          const a = sorted[i];
          const b = sorted[j];
          const aStart = new Date(a.startTime);
          const aEnd = new Date(a.endTime);
          const bStart = new Date(b.startTime);
          const bEnd = new Date(b.endTime);

          if (intervalsOverlap(aStart, aEnd, bStart, bEnd)) {
            result.push({
              roomId,
              booking: [a, b],
            });
          }
        }
      }
    });
    return result;
  }, [booking]);

  const value = {
    booking,
    loading,
    error,
    refreshBookings,
    addBooking,
    editBooking,
    cancelBooking: cancelBookingActtion,
    conflicts,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export const useBookings = () => {
  const ctx = useContext(BookingContext);
  if (!cyx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
};
