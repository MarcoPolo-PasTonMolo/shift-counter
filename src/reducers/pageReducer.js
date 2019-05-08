import { CHANGE_PAGE } from '../actions/types';

const initialState = 'Calendar';

export default (state = initialState, action) => {
  switch(action.type) {
    case CHANGE_PAGE:
      return action.payload;
    default:
      return state;
  }
};