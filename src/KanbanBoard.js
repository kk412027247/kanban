import React, { Component } from 'react';
// 引入ProTypes 验证组件
import PropTypes from 'prop-types';
import List from './List';





class KanbanBoard extends Component {
  render(){
    return(
      <div className="app">
        <List
          id='todo'
          title='To Do'
          cards={this.props.cards.filter((card)=>card.status === 'todo')}
          taskCallbacks={this.props.taskCallbacks}
        />
        <List
          id='in-progress'
          title='In Progress'
          cards={this.props.cards.filter((card)=>card.status === 'in-progress')}
          taskCallbacks={this.props.taskCallbacks}
        />
        <List
          id='done'
          title='Done'
          cards={this.props.cards.filter((card)=>card.status === 'done')}
          taskCallbacks={this.props.taskCallbacks}
        />
      </div>
    )
  }
}


// 验证组件
KanbanBoard.propTypes = {
  // 属性必须是一种指定类型数据的数组
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
};

export default KanbanBoard;
