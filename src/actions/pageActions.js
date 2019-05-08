import { CHANGE_PAGE } from "./types";


export const changePage = newPage => dispatch => {
  dispatch({
    type: CHANGE_PAGE,
    payload: newPage
  });
};