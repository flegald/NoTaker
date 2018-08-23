var React = require('react')
import { render } from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStickyNote, faClock, faCheck, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import '../css/main.css';
import '../css/login.css';
import '../css/nav.css';
import '../css/note.css';
import '../css/topbar.css';
import '../css/notemodal.css';
import '../css/noteoptions.css';

// Load font awesome icons
library.add(faStickyNote, faClock, faCheck, faPlus, faEdit);

render((

    <div>
    	< App />
    </div>
  ),
  document.getElementById('container')
);
