import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import store from './Redux/store'
import reportWebVitals from './reportWebVitals';
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

// axios default in local
// axios.defaults.baseURL= "http://localhost:3001"

// axios default in deploy
axios.defaults.baseURL= "https://todogames-production.up.railway.app"

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
