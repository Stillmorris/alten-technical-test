import React from "react";
import { useState } from "react";
import { v4 } from "uuid";
import months from "../constants/months.json"

function CalendarHeader(props) {
  const [year] = useState(props.yearData || undefined);
  const [month] = useState(props.monthData || undefined);
  const [monthKey] = useState(props.monthKey || undefined);

  if (month !== undefined && monthKey !== undefined) {
    return (
      <div className="HeaderMonth">
        <div className="HeaderMonth-name">
          <span>
            {months[monthKey]} / {year}
          </span>
        </div>
        <ul className="PickDays">
          {month.map((day) => (
            <li key={v4()}>{parseInt(day.fecha.toString().substring(6, 8))}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    <></>;
  }
}

export default CalendarHeader;
