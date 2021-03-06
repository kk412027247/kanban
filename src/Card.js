import React, { Component } from 'react';
import CheckList from './Checklist';
import marked from 'marked';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './CardStyle.css'
import {DragSource, DropTarget} from 'react-dnd';
//import constants from './constants'

// const titlePropType = (props, propName, componentName) => {
//   if(props[propName]){
//     let value = props[propName];
//     if(typeof value !== 'string' || value.length > 80) {
//       return new Error(
//         `${propName} in ${componentName} is longer than 80 characters`
//       )
//     }
//   }
// };

const cardDragSpec = {
  beginDrag(props){
    return{
      id:props.id
    }
  }
};

const cardDropSpec ={
  hover(props, monitor){
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updatePosition(draggedId, props.id)
  }
};

let collectDrag = (connect, monitor)=>{
  return {
    connectDragSource: connect.dragSource()
  }
};

let collectDrop = (connect, monitor)=>{
  return{
    connectDropTarget: connect.dropTarget()
  }
};

class Card extends Component {
  constructor(){
    super(...arguments);
    this.state={
      showDetails:false
    }
  }

  toggleDetails=()=>{
    this.setState({showDetails: !this.state.showDetails})
  };



  render(){
    const {connectDragSource, connectDropTarget} = this.props;
    let cardDetails;
    if (this.state.showDetails){
       cardDetails = (
        <div className='card_details'>
          {/*设置markdown格式*/}
          <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}}/>
          <CheckList cardId={this.props.id}
                     tasks={this.props.tasks}
                     taskCallbacks={this.props.taskCallbacks}
          />
        </div>
      )
    }

    const sideColor= {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color
    };

    return connectDropTarget (
      <div className='card'>
        <div style={sideColor}/>
        <div className={this.state.showDetails ? 'card_title--is-open' :'card_title'} onClick={this.toggleDetails}>
          {this.props.title}
        </div>
        <ReactCSSTransitionGroup
          transitionName="toggle"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {cardDetails}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

Card.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget:PropTypes.func.isRequired,
};

const dragHighOrderCard = DragSource('card', cardDragSpec, collectDrag)(Card);
const dragDropHighOrderCard= DropTarget('card', cardDropSpec, collectDrop)(dragHighOrderCard);

export default dragDropHighOrderCard;
