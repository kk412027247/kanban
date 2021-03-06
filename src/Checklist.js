import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checklist extends Component {
  checkInputKeyPress=(evt)=>{
    if(evt.key === 'Enter'){
      this.props.taskCallbacks.add(this.props.cardId, evt.target.value);
      evt.target.value='';
    }
  };

  render(){
    let tasks = this.props.tasks.map((task, taskIndex) => (
      <li className='checklist_task' key={task.id+'_'}>
        <input
          type="checkbox"
          defaultChecked={task.done}
          onChange={
            this.props.taskCallbacks.toggle.bind(null, this.props.cardId,task.id, taskIndex)
          }

        />
        {task.name}
        {'    '}
        <button className='checklist_task-remove' onClick={
          this.props.taskCallbacks.delete.bind(null, this.props.cardId,task.id, taskIndex)
        }>x</button>
      </li>
      )
    );

    return(
      <div className="checklist">
        <ul>{tasks}</ul>
        <input
          type="text"
          className='checklist--add-task'
          placeholder='Type then hit Enter to add a task'
          onKeyPress={this.checkInputKeyPress}
        />
      </div>
    )
  }
}

Checklist.propTyoes = {
  cardId: PropTypes.number,
  tasks: PropTypes.array,
  taskCallbacks: PropTypes.object,
};

export default Checklist;
