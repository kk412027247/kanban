import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard'

class GrocerList extends Component {
  render() {
    return (
      <ul>
        <ListItem quantity='1' name='Bread'>Bread</ListItem>
        <ListItem quantity='1' name='Bread'>Bread</ListItem>
        <ListItem quantity='1' name='Bread'>Bread</ListItem>
      </ul>

    );
  }
}

class ListItem extends Component{
  render(){
    return(
      <li>
        {this.props.quantity} X {this.props.children}
      </li>
    )

  }
}



export default GrocerList;
