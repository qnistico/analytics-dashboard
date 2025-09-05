// components/CalendarCard.jsx
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarCard({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date); // notify parent (App) that the date changed
  };

  return (
    <div
      className="rounded-2xl p-4 shadow height-100 column-flex "
      style={{ backgroundColor: "var(--color-card-bg)", color: "var(--color-header)" }}
    >
      <h2 className="text-lg font-semibold mb-4">Calendar</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="rounded-lg p-2 bg-transparent"
      />
    </div>
  );
}

export default CalendarCard;
