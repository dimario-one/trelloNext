import { combineReducers } from 'redux';
import cardReducer from './cardReducer';

const rootReducer = combineReducers({
  data: cardReducer, 

});

export default rootReducer;
