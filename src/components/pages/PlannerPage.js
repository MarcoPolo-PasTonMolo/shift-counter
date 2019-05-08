import React, { useState } from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import { fetchTable, fetchResults } from '../../actions/plannerActions';

const getDefaultTable = cooks => cooks.map(cook => [cook, true, true, true, true, true, true, true]);

const areObjectsEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
const setPropInLS = (prop, val) => localStorage[prop] = JSON.stringify(val);

// Returns array with cooks for each day which has only one cook else returns previous value of day
const getResults = (table, def = ['n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a']) => {
  const cooksPerDay = table.reduce((pr, cur) => {
    for(let i = 1; i <= 7; i ++) {
      if(cur[i]) {
        pr[i - 1].push(cur[0]);
      }
    }

    return pr;
  }, [[], [], [], [], [], [], []]);
  
  const results = def;
  cooksPerDay.forEach((a, i) => {
    if(a.length === 1) {
      results[i] = a[0];
    } else if(results[i] !== 'n/a') {
      const isCurrentCookUnavailable = a.findIndex(a => areObjectsEqual(a, results[i])) === -1;
      if(isCurrentCookUnavailable) {
        results[i] = 'n/a';
      }
    }
  });

  return results;
}

const updateCooksInTable = (cooks, table, fetchTable) => {
  const newTable = [...table];
  
  cooks.forEach((cook, i) => {
    newTable[i][0] = cook;
  });

  setPropInLS('table', newTable);
  fetchTable();
}

const updateResultsIfCookDeletedOrEdited = (cooks, results, table, fetchResults) => {
  const newResults = results.map(a => {
    if(a === 'n/a') {
      return a;
    } else {
      const updatedCook = cooks.filter(cook => cook.name === a.name)[0];

      if(updatedCook) {
        return updatedCook;
      } else {
        return 'n/a';
      }
    }
  });

  const didResultsChange = !newResults.every((a, i) => {
    if(typeof a !== typeof results[i]) {
      return false;
    } else {
      if(typeof a === 'string') {
        return a === results[i];
      } else {
        return areObjectsEqual(a, results[i]);
      }
    }
  });

  if(didResultsChange) {
    setPropInLS('results', getResults(table, newResults));
    fetchResults();
  }
};

function PlannerPage(props) {
  const { cooks, results, fetchTable, fetchResults } = props;
  let { table } = props;
  
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [availableCooks, setAvailableCooks] = useState([]);
  
  // Update table whenever there is a change to the cooks (edit, deletion, new cook)
  if(cooks.length === table.length) {
    const areAllCooksInTable = cooks.every((cook, i) => areObjectsEqual(cook, table[i][0]));

    if(!areAllCooksInTable) {
      updateCooksInTable(cooks, table, fetchTable);
    }    
  } else {
    const newAndDeletedCooks = cooks
      .filter(cook => !table.some(a => a[0].name === cook.name))
      .map(cook => ({ cook, status: 'new'}))
      .concat(table
        .filter(a => !cooks.some(cook => a[0].name === cook.name))
        .map(row => ({ cook: row[0], status: 'deleted'})));

    let newTable = [...table];
    newAndDeletedCooks.forEach(item => {
      switch(item.status) {
        case 'new':
          newTable.push([item.cook, true, true, true, true, true, true, true]);
          break;
        case 'deleted':
          newTable = newTable.filter(row => row[0].name !== item.cook.name);
          break;
        default:
          console.log('Something went wrong');
      }
    });

    // Set table no nothing as a placeholder until localStorage updates
    table = [];
    updateCooksInTable(cooks, newTable, fetchTable);
  }
  
  updateResultsIfCookDeletedOrEdited(cooks, results, table, fetchResults);
  
  const tableHeading = ['N/A', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const invertDay = (i, j) => {
    const tableCopy = [...table];
    tableCopy[i][j] = !tableCopy[i][j];
    setPropInLS('table', tableCopy);
    setPropInLS('results', getResults(table, results));
    fetchTable();
    fetchResults();
  }

  const handleResultDayClick = dayIndex => {
    setSelectedDay(tableHeading[dayIndex + 1]);
    const currentCooks = [];
    for(let i of table) {
      if(i[dayIndex + 1]) {
        currentCooks.push(i[0]);
      }
    }
    setAvailableCooks(currentCooks);
    setModalVisibility(true);
  }

  const handleCookSelection = cook => {
    const dayIndex = tableHeading.findIndex(a => a === selectedDay);
    const resultsCopy = [...results];

    if(cook !== 'None') {
      resultsCopy[dayIndex - 1] = cooks.filter(a => a.name === cook)[0];
    } else {
      resultsCopy[dayIndex - 1] = 'n/a';
    }

    setPropInLS('results', resultsCopy);
    fetchResults();

    setModalVisibility(false);
  }

  const handleClear = () => {
    setPropInLS('table', getDefaultTable(cooks));
    setPropInLS('results', getResults(getDefaultTable(cooks)));

    fetchTable();
    fetchResults();
  }

  return (
    <div>
      <Modal
        open={modalVisibility}
        onClose={_ => setModalVisibility(false)}
        handleSubmit={cook => handleCookSelection(cook)}
        cooks={availableCooks}
      >
        Cook on {selectedDay}
      </Modal>

      <h1>Planner</h1>

      <table align="center" id="planner" className="basic-style light-color">
        <thead>
          <tr>
            {
              tableHeading.map((a, i) => <th key={i}>{a[0]}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            table.map((a, i) => 
              <tr key={i}>
                {
                  a.map((b, j) => {
                    let node;
                    if(j === 0) {
                      node = <div style={{backgroundColor: cooks[i].color}}>{b.name}</div>;
                    } else if(b) {
                      node = <button style={{backgroundColor: cooks[i].color}} onClick={_ => invertDay(i, j)}>I</button>
                    } else {
                      node = <button style={{backgroundColor: 'transparent'}} onClick={_ => invertDay(i, j)}>X</button>
                    }
                    
                    return (
                      <td key={j}>{node}</td>
                    )
                  })
                }
              </tr>
            )
          }

          <tr>
            <td></td>
            {

              results.map((a, i) => 
                <td key={i}>
                  <button
                    style={{backgroundColor: a.color || 'transparent'}}
                    onClick={_ => handleResultDayClick(i)}
                  >
                    {a.name ? a.name[0] : a}
                  </button>
                </td>
              )
            }
          </tr>
        </tbody>
      </table>

      <button className="basic-style dark-color btn" onClick={handleClear}>Clear</button>
    </div>
  )
}

const mapStateToProps = state => ({
  cooks: state.cooks,
  table: state.table,
  results: state.results
});

export default connect(mapStateToProps, { fetchResults, fetchTable })(PlannerPage);