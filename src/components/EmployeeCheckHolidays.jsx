import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";

function EmployeeCheckHolidays(props) {
  const [employee, setEmployee] = useState(props.employeeData || null);
  const [monthData] = useState(props.monthData || null);
  const totalHolidays = useRef(props.employeeData.total_holidays || 0);

  const handleTotalHolidays = (ev) => {
    /*
      Add new hook useEmployee for saving the total days on holidays 
      and the proper checked days in order to use window localstorage.
    */ 
    if (ev.target.checked) {
      totalHolidays.current--;
    } else if (!ev.target.checked) {
      totalHolidays.current++;
    }
    // console.log('totalHolidays.current > ',totalHolidays.current);
    if (localStorage.getItem("employee_" + employee.id) === null) {
      localStorage.setItem("employee_" + employee.id,JSON.stringify([]));
    }

    const obj = {
      target_id: ev.target.id,
      isChecked: ev.target.checked
    }

    const holydays = JSON.parse(localStorage.getItem("employee_" + employee.id));
    let targetNotExists = true;
    holydays.map((elem) => {
      if (elem.target_id == obj.target_id) {
        elem.isChecked = obj.isChecked;
        targetNotExists = false;
      }
    });

    if (targetNotExists) {
      holydays.push(obj);
    }
    localStorage.setItem("employee_" + employee.id,JSON.stringify(holydays));
  }

  if (monthData && employee) {
    return monthData.map((day) => {
      const holydays = JSON.parse(localStorage.getItem("employee_" + employee.id));
      let isChecked = false;
      if (holydays !== null) {
        holydays.map((elem) => {
          if (elem.target_id == employee.id + "_day_" + day.fecha && elem.isChecked) {
            isChecked = true;
          }
        });
      }
      return <li className={day.color} key={v4()}>
        <label>
          <input
            type="checkbox"
            name={employee.id + "_day_" + day.fecha}
            id={employee.id + "_day_" + day.fecha}
            hidden
            disabled={day.tipoId !== "" ? true : false}
            onChange={(ev) => {handleTotalHolidays(ev)}}
            defaultChecked={isChecked}
          />
          <span>x</span>
        </label>
      </li>
    });
  } else {
    <></>;
  }
}

export default EmployeeCheckHolidays;
