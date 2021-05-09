import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from 'axios';
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import './index.css'

axios.defaults.baseURL = 'https://worldwidenetflix.herokuapp.com/api';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

reportWebVitals();
