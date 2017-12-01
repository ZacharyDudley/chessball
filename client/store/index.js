import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import space from './space';
import field from './field'
// import boardsList from './getBoards'
// import inGame from './inGame';

const reducer = combineReducers({
  space,
  field,
  // inGame,
  // boardsList
});

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));

const store = createStore(reducer, middleware);

export default store
