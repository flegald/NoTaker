var React = require('react')
import { render } from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/login.css';

render((

    <div>
    	< App />
    </div>
  ),
  document.getElementById('container')
);