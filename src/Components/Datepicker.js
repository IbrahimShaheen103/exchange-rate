import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import {
  formatDate,
  getCurrentMonth,
  getCurrentYear,
  getThisWeek,
} from "../utils/dateCalculator";
import Table from "./Table";

const DatePicker = () => {
  const [startDate, setStartDate] = useState("start");
  const [endDate, setEndDate] = useState("end");
  const [initDate, setInitDate] = useState(new Date());
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (initDate.length > 0) {
      setStartDate(formatDate(initDate[0]));
      setEndDate(formatDate(initDate[1]));
      setShow(false);
      fetch(
        `https://api.exchangerate.host/timeseries?start_date=${startDate}&end_date=${endDate}&symbols=EGP,CAD`
      )
        .then((response) => response.json())
        .then((json) => setData(json.rates));
    }
  }, [endDate, initDate, startDate]);

  return (
    <Div>
      <div className="pickerContainer" onClick={() => setShow(true)}>
        <span>{startDate}</span>
        <div className="hr" />
        <span>{endDate}</span>
      </div>
      {show && (
        <>
          <div className="btnContainer">
            <button onClick={() => setInitDate(getThisWeek())}>
              This Week
            </button>
            <button onClick={() => setInitDate(getCurrentMonth())}>
              This Month
            </button>
            <button onClick={() => setInitDate(getCurrentYear())}>
              This Year
            </button>
          </div>
          <Calendar
            onChange={setInitDate}
            selectRange={true}
            className="calender"
          />
        </>
      )}
      {!show && data && <Table data={data} />}
    </Div>
  );
};
export default DatePicker;
const Div = styled.div`
  .pickerContainer {
    cursor: pointer;
    width: 50%;
    height: 20px;
    margin: 10px auto;
    border: 0.1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-algin: center;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 2px 5px #888888;
    .hr {
      border-left: 3px solid #888;
      height: 42px;
      position: absolute;
      left: 50%;
    }
    span {
      margin: 0px auto;
    }
  }
  .calender {
    margin: 0px auto;
  }
  .btnContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    button {
      padding: 10px 15px;
      color: #fff;
      background-image: radial-gradient(
          93% 87% at 87% 89%,
          rgba(0, 0, 0, 0.23) 0%,
          transparent 86.18%
        ),
        radial-gradient(
          66% 87% at 26% 20%,
          rgba(255, 255, 255, 0.41) 0%,
          rgba(255, 255, 255, 0) 69.79%,
          rgba(255, 255, 255, 0) 100%
        );
      background-color: #4c43cd;
    }
  }
`;
