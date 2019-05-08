import { FETCH_TABLE } from '../actions/types';

const initialState = JSON.parse(localStorage.getItem('table')) || [];

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_TABLE:
      return action.payload;
    default:
      return state;
  }
}