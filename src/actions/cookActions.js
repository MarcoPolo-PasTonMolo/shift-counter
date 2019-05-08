import { FETCH_COOKS } from './types';
import { INPUTING_COOK } from './types';
import { SUBMIT_COOK } from './types';
import { CANCEL_COOK } from './types';

export const fetchCooks = () => dispatch => {
  const cooks = JSON.parse(localStorage.getItem('cooks')) || [];

  dispatch({
    type: FETCH_COOKS,
    payload: cooks
  });
}

export const inputingCook = () => dispatch => {
  dispatch({
    type: INPUTING_COOK,
    state: true
  });
};

export const submitCook = () => dispatch => {
  dispatch({
    type: SUBMIT_COOK,
    state: false
  });
};

export const cancelCook = () => dispatch => {
  dispatch({
    type: CANCEL_COOK,
    state: false
  });
};