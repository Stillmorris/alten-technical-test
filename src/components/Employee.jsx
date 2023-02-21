import React, { useEffect } from "react";
import { useState } from "react";
import userIcon from "../assets/user.png";

function EmployeeList(props) {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (props.employeeData !== undefined) {
      setEmployee(props.employeeData);
    }
  }, []);

  if (employee) {
    const holydays = JSON.parse(localStorage.getItem("employee_" + employee.id));
    let checkedHolydays = employee.total_holidays;
    if (holydays !== null) {
      holydays.map((elem) => {
        if (elem.isChecked) {
          checkedHolydays--;
        }
      });
    }
    return (
      <li className="Employee-listItem">
        <img
          className="Employee-icon"
          src={userIcon}
          alt="Calendar Employee Icon"
          width={32}
          height={32}
        />
        <span className="Employee-name">
          {employee.first_name} {employee.last_name}
        </span>
        <span className="Employee-totalHolydays">
          {checkedHolydays}/{employee.total_holidays}
        </span>
      </li>
    );
  } else {
    <></>;
  }
}

export default EmployeeList;
