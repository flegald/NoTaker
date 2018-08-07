var React = require('react')
import { render } from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStickyNote, faClock, faCheck } from '@fortawesome/free-solid-svg-icons'
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';
import '../css/login.css';

// Load font awesome icons
library.add(faStickyNote, faClock, faCheck);

render((

    <div>
    	< App />
    </div>
  ),
  document.getElementById('container')
);