import { combineReducers } from 'redux';
import counter from './counter';
import post from './post';

export default combineReducers({
    counter,
    post
});