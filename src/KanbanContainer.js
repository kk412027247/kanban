import React,{Component} from 'react';
import KanbanBoard from './KanbanBoard';
import update from 'react-addons-update';


const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'any-string-you-like'
};


class KanbanContainer extends Component{
  constructor(){
    super(...arguments);
    this.state = {
      cards: []
    }
  }

  componentDidMount(){
    fetch(API_URL+'/cards',{header: API_HEADERS})
      .then((response)=> response.json())
      .then((responseData)=>{
        this.setState({cards:responseData});
        //window.state = this.state;
      })
      .catch((error)=>{console.log(error)})
    

  };
  
  addTask=(cardId, taskName)=>{
    let prevState = this.state;
    let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);
    let newTask = {id:Date.now(), name:taskName, done:false};
    let nextState = update(this.state.cards, {
      [cardIndex]:{
        tasks:{$push:[newTask]}
      }
    });
    this.setState({cards:nextState});
    fetch(`${API_URL}/cards/${cardId}/tasks`,{
      method: 'post',
      headers:API_HEADERS,
      body: JSON.stringify(newTask)
    })
    .then((response)=>response.json())
    .then(()=>{})
    .catch((error)=>{
      alert('出错啦');
      console.log(error);
      this.setState(prevState)
    })

  };

  deleteTask=(cardId, taskId, taskIndex)=>{
    // findIndex（callback）如果callback返回到是真，则函数返回该元素的位置。
    let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);

    let nextState = update(this.state.cards,{
      [cardIndex]:{
        tasks:{$splice:[[taskIndex, 1]]}  // 和 array.prototype.splice 方法一样，在taskIndex位置 删除1个节点,双中括号
      }
    });
    this.setState ({ cards: nextState});
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`,{
      method: 'delete',
      headers:API_HEADERS
    })
  };

  toggleTask=(cardId, taskId, taskIndex)=>{
    let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);

    let newDoneValue ;
    let nextState = update(this.state.cards,{
      [cardIndex] : {
        tasks:{
          [taskIndex]:{
            done: { $apply: (done)=>{
              newDoneValue = !done;
              return newDoneValue;
            }}
          }
        }
      }
    });
    this.setState({cards:nextState});
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`,{
      method: 'put',
      headers:API_HEADERS,
      body: JSON.stringify({done:newDoneValue})
    })


  };

  render(){
    return(
      <KanbanBoard cards={this.state.cards}
                   taskCallbacks={{
                     toggle: this.toggleTask,
                     delete: this.deleteTask,
                     add: this.addTask
                   }}
      />
    )
  }
}

export default KanbanContainer;
