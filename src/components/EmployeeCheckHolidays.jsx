import React, { useRef, useState } from "react";
import { v4 } from "uuid";

function EmployeeCheckHolidays(props) {
  const [employee] = useState(props.employeeData || undefined);
  const [monthData] = useState(props.monthData || undefined);
  const totalHolidays = useRef(props.employeeData.total_holidays || 0);

  const handleTotalHolidays = (ev) => {
    console.log(employee);
    /*
      Add new hook useEmployee for saving the total days on holidays 
      and the proper checked days in order to use window localstorage.
    */ 
    
    if (ev.target.checked) {
      totalHolidays.current--;
    } else {
      totalHolidays.current++;
    }
    console.log('totalHolidays.current > ',totalHolidays.current);
  }
  if (monthData !== undefined && employee !== undefined) {
    return monthData.map((day) => (
      <li className={day.color} key={v4()}>
        <label>
          <input
            type="checkbox"
            name={"day_" + day.fecha}
            id={"day_" + day.fecha}
            hidden
            disabled={day.tipoId !== "" ? true : false}
            onChange={(ev) => {handleTotalHolidays(ev)}}
          />
          <span>x</span>
        </label>
      </li>
    ));
  } else {
    <></>;
  }
}

export default EmployeeCheckHolidays;
