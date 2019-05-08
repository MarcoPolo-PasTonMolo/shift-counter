import { INPUTING_COOK } from '../actions/types';
import { SUBMIT_COOK } from '../actions/types';
import { CANCEL_COOK } from '../actions/types';

const initialState = false;

export default (state = initialState, action) => {
  switch(action.type) {
    case INPUTING_COOK:
      return action.state;
    case SUBMIT_COOK:
      return action.state;
    case CANCEL_COOK:
      return action.state;
    default:
      return state;
  }
}