import { FETCH_TABLE } from './types';
import { FETCH_RESULTS } from './types';

export const fetchResults = () => dispatch => {
  const results = JSON.parse(localStorage.getItem('results')) || [];

  dispatch({
    type: FETCH_RESULTS,
    payload: results
  });
}

export const fetchTable = () => dispatch => {
  const table = JSON.parse(localStorage.getItem('table')) || [];

  dispatch({
    type: FETCH_TABLE,
    payload: table
  });
}