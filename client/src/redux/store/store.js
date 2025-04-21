import { legacy_createStore } from "redux";
import { applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    
});

export default legacy_createStore(rootReducer, applyMiddleware(thunk));
