import React from "react";
import { BookingProvider } from "./Context/BookingContext";
import AppShell from "./Components/Layout/AppShell";

function App() {
  return (
    <BookingProvider>
      <AppShell />
    </BookingProvider>
  );
}

export default App;
