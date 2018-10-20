import React from 'react'

import st from './style.module.css'
import Layout from '../components/layout'


class Sheet extends React.Component{
  constructor(){
    super()
    this.state = {
      task: [],
      doing: [],
      done: []
    }
  }
allowDrop = ev => {
  ev.preventDefault();
}
drag = ev => {
  ev.dataTransfer.setData("text", ev.target.innerHTML);
}


drop = ev => {
  if(ev.dataTransfer.getData("text") !== ev.target.innerHTML){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    this.setState({
      task: this.state.task.concat([data]),
      doing: this.state.doing.filter(t => {
        return t !== data
      }),
      done: this.state.done.filter(t => {
        return t !== data
      })
    })
  }
}
doingDrop = ev => {
  if(ev.dataTransfer.getData("text") !== ev.target.innerHTML){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    this.setState({
      doing: this.state.doing.concat([data]),
      task: this.state.task.filter(t => {
        return t !== data
      }),
      done: this.state.done.filter(t => {
        return t !== data
      })
    })
  }
}
doneDrop = ev => {
  if(ev.dataTransfer.getData("text") !== ev.target.innerHTML){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    this.setState({
      done: this.state.done.concat([data]),
      task: this.state.task.filter(t => {
        return t !== data
      }),
      doing: this.state.doing.filter(t => {
        return t !== data
      })
    })
  }
}


enter = event => {
  if (event.keyCode === 13 && event.target.value !== '') {
    this.setState({
      task: this.state.task.concat([event.target.value])
    })
    event.target.value = '';
  }
}
doingEnter = event => {
  if (event.keyCode === 13 && event.target.value !== '') {
    this.setState({
      doing: this.state.doing.concat([event.target.value])
    })
    event.target.value = '';
  }
}
doneEnter = event => {
  if (event.keyCode === 13 && event.target.value !== '') {
    this.setState({
      done: this.state.done.concat([event.target.value])
    })
    event.target.value = '';
  }
}

render(){
  return(
    <div className={st.bord}>
      <div className={st.states} onDrop={this.drop} onDragOver={this.allowDrop}>
        <h4>To Do</h4>
        <div>
          {this.state.task.map(t=>{
            return <div className={st.tasks} draggable="true" onDragStart={this.drag}>{t}</div>
          })}
        </div><br></br>
        <input onKeyDown={this.enter} placeholder={'Enter a title for this card...'}></input>
      </div>
      
      <div className={st.states} onDrop={this.doingDrop} onDragOver={this.allowDrop}>
        <h4>Doing</h4>
        <div>
          {this.state.doing.map(t=>{
            return <div className={st.tasks} draggable="true" onDragStart={this.drag}>{t}</div>
          })}
        </div><br></br>
        <input onKeyDown={this.doingEnter} placeholder={'Enter a title for this card...'}></input>
      </div>

      <div className={st.states} onDrop={this.doneDrop} onDragOver={this.allowDrop}>
        <h4>Done</h4>
        <div>
          {this.state.done.map(t=>{
            return <div className={st.tasks} draggable="true" onDragStart={this.drag}>{t}</div>
          })}
        </div><br></br>
        <input onKeyDown={this.doneEnter} placeholder={'Enter a title for this card...'}></input>
      </div>
    </div>
  )
}}

const IndexPage = () => (
  <Layout>
    <Sheet />
  </Layout>
)

export default IndexPage
