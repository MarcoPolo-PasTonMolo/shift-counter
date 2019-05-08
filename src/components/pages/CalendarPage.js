import React, { useState } from 'react';
import { connect } from 'react-redux';
import Calendar from '../Calendar';

function CalendarPage(props) {
  const { cooks } = props;

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const now = new Date();

  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  const onArrowClick = dir => {
    let newMonth = month + dir;
    let newYear = year;

    if(newMonth === 12) {
      newMonth = 0;
      newYear ++;
    } else if(newMonth === -1) {
      newMonth = 11;
      newYear --;
    }

    setMonth(newMonth);
    setYear(newYear);
  }

  return (
    <div>
      <h1>Calendar</h1>

      <div id="calendar-controls">
        <button onClick={_ => onArrowClick(-1)}>&lt;</button>
        <h4 id="calendar-month-year">{ months[month] } { year }</h4>
        <button onClick={_ => onArrowClick(1)}>&gt;</button>
      </div>
      <Calendar month={month} year={year} />

      <div className="basic-style card light-color">
        <h5 className="card-heading">COOK TIMES</h5>
        {
          [...cooks]
            .sort((cook1, cook2) => 
              (cook2.initialTimes + cook2.additionalTimes.length) - (cook1.initialTimes + cook1.additionalTimes.length))
            .map(cook => 
              <h3 key={cook.name}><div className="cook-color" style={{backgroundColor: cook.color}} />: {cook.name} => {cook.initialTimes + cook.additionalTimes.length}</h3>
            )
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  cooks: state.cooks
});

export default connect(mapStateToProps, null)(CalendarPage);