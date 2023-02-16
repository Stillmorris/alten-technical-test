import React from "react";
import { useState } from "react";
import userIcon from "../assets/user.png";

function EmployeeList(props) {
  const [employee] = useState(props.employeeData || undefined);
  const [employee_holydays] = useState(props.employeeHolydays || 0);

  if (employee !== undefined) {
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
          {employee_holydays}/{employee.total_holidays}
        </span>
      </li>
    );
  } else {
    <></>;
  }
}

export default EmployeeList;
