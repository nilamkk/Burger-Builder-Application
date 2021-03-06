import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import {createStore,compose,applyMiddleware,combineReducers} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import burgerBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'

// since we are not using any middleware so we need only basic setup not the advanced one.
// const store=createStore(burgerBuilderReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const composeEnhancers =process.env.NODE_ENV==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;

const rootReducer=combineReducers({
  burgerBuilder:burgerBuilderReducer,
  order: orderReducer,
  auth:authReducer
})

// now we need middleware so switch to ADVANCED MODE
const store=createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))


const app=(
  <BrowserRouter>
                      {/* Sabo lagibo aitu ki hoi */}
        <App />
  </BrowserRouter>
)

ReactDOM.render(
  <Provider store={store}>{app}</Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
