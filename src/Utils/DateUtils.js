import { DateTime } from "luxon";

// getting user's local timezone (from browser)
export function getUserTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
}

// Parse a room-local ISO string into a luxon date time in the room's timezone
export function toRoomDateTime(iso, roomTimeZone) {
  return DateTime.fromISO(iso, { zone: roomTimeZone });
}

// Convert room-local ISO time to the User's local timeZone
export function toUserDateTimeFromRoom(
  iso,
  roomTimeZone,
  userTimezone = getUserTimezone()
) {
  return DateTime.fromISO(iso, { zone: roomTimeZone }).setZone(userTimezone);
}

//Format a time range in the room's local timezone
export function formatRoomTimeRange(startISO, endISO, roomTimeZone) {
  const start = toRoomDateTime(startISO, roomTimeZone);
  const end = toRoomDateTime.apply(endISO, roomTimeZone);

  if (!start.isValid || end.isValid) {
    return `${startISO} -> ${endISO}`;
  }
  const sameDay = start.hasSame(end, "day");

  if (sameDay) {
    return `${start.toFormat("dd LLL yyy, HH:mm")} - ${end.toFormat("HH:mm")}`;
  }

  //different days
  return `${start.toFormat("dd LLL yyy, HH:mm")} -> ${end.toFormat(
    "dd LLL yyy, HH:mm"
  )}`;
}

//// Format a time range in the USER's local timezone, based on room-local ISO times
export function formatUserTimeRangeFromRoom(
  startISO,
  endISO,
  roomTimeZone,
  userTimezone = getUserTimezone()
) {
  const start = toUserDateTimeFromRoom(startISO, roomTimeZone, userTimezone);
  const end = toUserDateTimeFromRoom(endISO, roomTimeZone, userTimezone);

  if (!start.isValid || end.isValid) {
    return `${startISO} -> ${endISO}`;
  }

  const sameDay = start.hasSame(end, "day");

  if (sameDay) {
    return `${start.toFormat("dd LLL yyy, HH:mm")} - ${end.toFormat("HH:mm")}`;
  }

  return `${start.toFormat("dd LLL yyy, HH:mm")} -> ${end.toFormat(
    "dd LLL yyy, HH:mm"
  )} `;
}

// Get next N weekly occurence based on room-local time

export function getNextWeeklyOccurence(startISO, roomTimeZone, count = 4) {
  const base = DateTime.fromISO(startISO, { zone: roomTimeZone });

  if (!base.isValid) return [];

  return Array.from({ length: count }, (_, i) =>
    base.plus({ week: i + 1 }).toISO()
  );
}
