
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/booking_calendar.css';

const BookingCalendar = ({ disabledDates, onSelectDates }) => {
  const [selectedRange, setSelectedRange] = useState(null);

  // Ensure dates are compared in UTC to avoid time zone issues
  const normalizeDate = (date) => {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  };

  const isDateDisabled = (date) => {
    const normalizedDate = normalizeDate(date);
    return disabledDates.some(
      (disabledDate) =>
        normalizeDate(new Date(disabledDate)).getTime() === normalizedDate.getTime()
    );
  };

  const isRangeValid = (range) => {
    if (!range || range.length < 2) return false;
    const [start, end] = range.map(normalizeDate);
    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      if (isDateDisabled(date)) return false;
    }
    return true;
  };

  const handleDateChange = (range) => {
    if (isRangeValid(range)) {
      setSelectedRange(range);
      const [startDate, endDate] = range;
      onSelectDates({ startDate: normalizeDate(startDate), endDate: normalizeDate(endDate) });
    } else {
      setSelectedRange(null);  // Clear selection if invalid
    //   alert('Selected range includes unavailable dates. Please choose another range.');
    }
  };

  return (
    <div>
      <Calendar
        selectRange
        onChange={handleDateChange}
        tileDisabled={({ date }) => isDateDisabled(date)}
        value={selectedRange}
      />
    </div>
  );
};

export default BookingCalendar;
