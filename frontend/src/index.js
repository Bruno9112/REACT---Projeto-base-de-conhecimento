import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./config/store"
import { Provider } from "react-redux";

import './index.css';

require("axios").defaults.headers.common["Authorization"] = "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkJydW5vIE1pa2FlbCBOYWdlbCIsImVtYWlsIjoiYnJ1bm9uYWdlbDkxMzJAZ21haWwuY29tIiwiYWRtaW4iOjEsImlhdCI6MTY0MjY4MjM3NSwiZXhwIjoxNjQyNzY4Nzc1fQ.lvIqhfk67uyjekMQ1doGfoYozaqUhwTXMG9qTJX8si4"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
