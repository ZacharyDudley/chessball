import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import field from './field';
import game from './game'
// import boardsList from './getBoards'
// import inGame from './inGame';

const reducer = combineReducers({
  field,
  game,
  // inGame,
  // boardsList
});

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));

const store = createStore(reducer, middleware);

export default store
export * from './game'
