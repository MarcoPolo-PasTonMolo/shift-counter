import { FETCH_COOKS } from '../actions/types';

const initialState = JSON.parse(localStorage.getItem('cooks')) || [];

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_COOKS:
      return action.payload;
    default:
      return state;
  }
}