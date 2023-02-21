import "./App.css";
import calendarMock from "./mocks/calendar.json";
import employeesMock from "./mocks/employees.json";
import { v4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import Employee from "./components/Employee";
import EmployeeCheckHolidays from "./components/EmployeeCheckHolidays";
import CalendarHeader from "./components/CalendarHeader";

function App() {
  const [employees, setEmployees] = useState(null);
  const [parsedCalendar, setParsedCalendar] = useState(null);
  const previousData = useRef({});

  useEffect(() => {
    // Importing employees from json mock.
    setEmployees(employeesMock.data);
    // Parsing object for picking days on calendar.
    setParsedCalendar(getParsedCalendar);
    // Setting holydays object on local storage
  }, []);

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

  return (
    <div className="App">
      <div className="Calendar">
        <div className="Employees">
          <div className="Employees-header"></div>
          <div className="Employees-title">
            <span>Empleados</span>
          </div>
          <ul className="Employees-list">
            {employees && employees.map((employee) => (
              <Employee
                employeeData={employee}
                key={employee.id}
              />
            ))}
          </ul>
        </div>
        <div className="PickDates">
          <div className="PickDates-headerContainer">
            <div className="PickDates-header">
              {parsedCalendar && Object.keys(parsedCalendar).map((year) => {
                return parsedCalendar[year].map((month, mkey) => (
                  <CalendarHeader
                    yearData={year}
                    monthData={month}
                    monthKey={mkey}
                    key={v4()}
                  />
                ));
              })}
            </div>
            <div className="PickDates-void"></div>
          </div>
          {employees && employees.map((employee) => (
            <div className="Row" key={v4()}>
              <ul className="PickDates-checkboxes">
                {parsedCalendar && Object.keys(parsedCalendar).map((year) => {
                  return parsedCalendar[year].map((month) => (
                    <EmployeeCheckHolidays
                      monthData={month}
                      employeeData={employee}
                      key={v4()}
                    />
                  ));
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
