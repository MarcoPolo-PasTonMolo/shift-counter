import { FETCH_RESULTS } from '../actions/types';

const initialState = JSON.parse(localStorage.getItem('results')) || ['n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a'];

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_RESULTS:
      return action.payload;
    default:
      return state;
  }
}