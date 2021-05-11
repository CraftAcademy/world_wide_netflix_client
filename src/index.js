import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import { StripeProvider } from 'react-stripe-elements';

axios.defaults.baseURL = 'https://worldwidenetflix.herokuapp.com/api';

ReactDOM.render(
	<StripeProvider apiKey='pk_test_51IovvJL7WvJmM60Hf2OVas98LZcERwohgrfHfsqEpnjGYIenQB6aNPFBPFmxIYf2enlQYKtWdLae7Jgjv1FwLwsE00r9IeAFuD'>
		<App />
	</StripeProvider>,

	document.getElementById('root')
);

reportWebVitals();
