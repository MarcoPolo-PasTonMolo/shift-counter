import { combineReducers } from "redux";
import pageReducer from './pageReducer';
import cookReducer from "./cookReducer";
import resultsReducer from "./resultsReducer";
import tableReducer from "./tableReducer";
import cookInputReducer from "./cookInputReducer";

export default combineReducers({
  page: pageReducer,
  cooks: cookReducer,
  cookInput: cookInputReducer,
  results: resultsReducer,
  table: tableReducer
});