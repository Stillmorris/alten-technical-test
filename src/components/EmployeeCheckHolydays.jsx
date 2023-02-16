import React, { useState } from "react";
import { v4 } from "uuid";

function EmployeeCheckHolydays(props) {
  const [employee] = useState(props.employeeData || undefined);
  const [monthData] = useState(props.monthData || undefined);

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
          />
          <span>x</span>
        </label>
      </li>
    ));
  } else {
    <></>;
  }
}

export default EmployeeCheckHolydays;
