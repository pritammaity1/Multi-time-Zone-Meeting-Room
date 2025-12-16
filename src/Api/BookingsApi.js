import { mockbookings } from "../Data/MockData";

let bookingDb = [...mockbookings]; // pretending as DB

function randomDelay() {
  return 100 + Math.random() * 400;
}

export function fetchBooking() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...bookingDb]);
    }, randomDelay());
  });
}

export function createBooking(newBooking) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const booking = {
        ...newBooking,
        id: crypto.randomUUID(),
        status: "scheduled",
      };
      bookingDb.push(booking);
      resolve(booking);
    }, randomDelay());
  });
}

export function updateBooking(id, updates) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = bookingDb.findIndex((b) => b.id === id);
      if (index === -1) {
        reject(new Error("Booking Not Found"));
        return;
      }
      bookingDb[index] = { ...bookingDb[index], ...updates };
      resolve(bookingDb[index]);
    }, randomDelay());
  });
}

export function cancelBooking(id) {
  return updateBooking(id, { status: "cancelled" });
}
