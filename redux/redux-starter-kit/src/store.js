import { createStore, applyMiddleware } from 'redux';
import modules from './modules';
import loggerMiddleware from './lib/loggerMiddleware';

const store = createStore(modules, applyMiddleware(loggerMiddleware));

export default store;