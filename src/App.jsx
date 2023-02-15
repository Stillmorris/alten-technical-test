import "./App.css";
import userIcon from "./assets/user.png";
import calendarMock from "./mocks/calendar.json";
import employeesMock from "./mocks/employees.json";
import { v4 } from "uuid";
import { useEffect, useRef, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [holydays, setHolydays] = useState([]);
  const [parsedCalendar, setParsedCalendar] = useState([]);
  const previousData = useRef({});

  const months = {
    1: "Enero",
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Septiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre",
  };

  useEffect(() => {
    // Importing employees from json mock.
    setEmployees(employeesMock.data || []);
    setParsedCalendar(getParsedCalendar);
  }, []);

  useEffect((() => {
    // console.log(holydays);
  }),[holydays]);

  function getParsedCalendar() {
    if (Object.keys(previousData.current).length === 0) {
      // Setting parsedCalendar array from calendar json mock.
      let monthsByYear_ = calendarMock.datos.reduce((acc, cur, index) => {
        const previousElement = { ...acc };
        const year = parseInt(cur.fecha.toString().substring(0, 4));
        const month = parseInt(cur.fecha.toString().substring(4, 6));
        acc[year] = acc[year] || [];
        acc[year][month] = acc[year][month] || [];
        if (index == 1) {
          acc[year][month].push(previousElement);
        }
        acc[year][month].push(cur);
        return acc;
      });
      delete monthsByYear_.color;
      delete monthsByYear_.fecha;
      delete monthsByYear_.tipoId;
      delete monthsByYear_.tipoDs;
      previousData.current = monthsByYear_;
      return monthsByYear_;
    } else {
      return previousData.current;
    }
  }

  const handleChange = (target, employeeId) => {
    console.log(target.id, target.checked, employeeId);
    const obj = {
      employeeId: employeeId,
      target: target.id,
      checked: target.checked
    }
    // setHolydays(...holydays, obj);
  };

  return (
    <div className="App">
      <div className="Calendar">
        <div className="Employees">
          <div className="Employees-header"></div>
          <div className="Employees-title">
            <span>Empleados</span>
          </div>
          <ul className="Employees-list">
            {employees.map((employee) => (
              <li className="Employee-listItem" key={employee.id}>
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
                  0/{employee.total_holidays}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="PickDates">
          <div className="PickDates-headerContainer">
            <div className="PickDates-header">
              {Object.keys(parsedCalendar).map((year) => {
                return parsedCalendar[year].map((month, mkey) => {
                  return (
                    <div className="HeaderMonth" key={v4()}>
                      <div className="HeaderMonth-name">
                        <span>
                          {months[mkey]} / {year}
                        </span>
                      </div>
                      <ul className="PickDays">
                        {month.map((day) => (
                          <li key={v4()}>
                            {day.fecha.toString().substring(6, 8)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                });
              })}
            </div>
            <div className="PickDates-void"></div>
          </div>
          {employees.map((employee) => (
            <div className="Row" key={v4()}>
              <ul className="PickDates-checkboxes">
                {Object.keys(parsedCalendar).map((year) => {
                  return parsedCalendar[year].map((month, mkey) => {
                    return month.map((day) => (
                      <li key={v4()} className={day.color}>
                        <label>
                          <input
                            type="checkbox"
                            name={"day_" + day.fecha}
                            id={"day_" + day.fecha}
                            hidden
                            disabled={day.tipoId !== "" ? true : false}
                            onChange={(event) =>
                              handleChange(event.target, employee.id)
                            }
                          />
                          <span>x</span>
                        </label>
                      </li>
                    ));
                  });
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
