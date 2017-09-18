import React from 'react';
import ReactDOM from 'react-dom';
import KanbanContainer from './KanbanContainer';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(<KanbanContainer/>, document.getElementById('root'));
registerServiceWorker();
