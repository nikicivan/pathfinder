import { combineReducers } from 'redux';
import filterReducer from './filter/filter.reducer';
import gridReducer from './grid/grid.reducer';

const rootReducer = combineReducers({
	grid: gridReducer,
	filter: filterReducer,
});

export default rootReducer;
