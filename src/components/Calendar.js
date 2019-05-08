import React, { useState } from 'react'
import { connect } from 'react-redux';
import Modal from './Modal';
import { fetchCooks } from '../actions/cookActions';

function Calendar(props) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const daysOfTheWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const { month, year, cooks, fetchCooks } = props;

  const firstDayOfTheMonth = new Date(year, month, 1);
  const lastDayOfTheMonth = new Date(year, month + 1, 0);
  const numDayOfMonth = lastDayOfTheMonth.getDate();

  const dateTable = [[]];
  for(let i = 1; i < firstDayOfTheMonth.getDay(); i ++) {
    dateTable[0].push('');
  }

  let i = 1;
  let iteration = 0;
  while(i < numDayOfMonth) {
    if(iteration > 0) {
      dateTable.push([]);
    }

    for(let j = dateTable[iteration].length; j < 7 && i <= numDayOfMonth; j ++) {
      dateTable[iteration].push(i ++);
    }
    iteration ++;
  }

  const numOfWeeks = dateTable.length;
  for(let j = dateTable[numOfWeeks - 1].length; j < 7; j ++) {
    dateTable[numOfWeeks - 1].push('');
  }

  const onDateClick = date => {
    setSelectedDate([date, month + 1, year].join('/'));
    setModalVisibility(true);
  }

  const submitHandler = (selectedCook) => {
    const cooksCopy = [...cooks];

    for(let i = 0; i < cooksCopy.length; i ++) {
      //Delete the date from other Cooks
      if(cooksCopy[i].additionalTimes.includes(selectedDate)) {
        cooksCopy[i].additionalTimes = cooksCopy[i].additionalTimes.filter(a => a !== selectedDate);
      }

      if(cooksCopy[i].name === selectedCook) {
        cooksCopy[i].additionalTimes.push(selectedDate);
      }

    }
    
    localStorage.cooks = JSON.stringify(cooksCopy);
    fetchCooks();
    setModalVisibility(false);
  };

  return (
    <div id="calendar-container">
      <Modal
        handleSubmit={selectedCook => submitHandler(selectedCook)}
        open={modalVisibility}
        onClose={_ => setModalVisibility(false)}
        cooks={cooks}
      >
        The cook on {selectedDate}
      </Modal>

      <table align="center" id="calendar" className="basic-style dark-color">
        <thead>
          <tr>
            { daysOfTheWeek.map((a, i) => <th key={i}>{a}</th>) }
          </tr>
        </thead>
        <tbody>
          {
            dateTable.map((week, i) => (
              <tr key={i}>
                { week.map((date, j) => {
                  const now = new Date();
                  const dateIsToday = date === now.getDate() && month === now.getMonth() && year === now.getFullYear();

                  const fullDate = [date, month + 1, year].join('/');
                  const bgColor = cooks.reduce((pr, cur) => {
                    if(cur.additionalTimes.includes(fullDate)) {
                      return cur.color;
                    } else {
                      return pr
                    }
                  }, '#444444');

                  const style = {
                    borderWidth: dateIsToday ? '5px' : '0px',
                    backgroundColor: bgColor
                  };

                  return (
                    <td key={j}>
                      <button style={style} onClick={_ => onDateClick(date)} disabled={date === ''}>{date}</button>
                    </td>
                  );
                }) }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => ({
  cooks: state.cooks
});

export default connect(mapStateToProps, { fetchCooks })(Calendar);