import './App.css';
import React, { useState } from 'react';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Todo from './components/todo.js'
// require('dotenv').config()
// console.log(process.env)



function App() {
  const [inputState, setinputState] = useState(['']);
  const [todos, settodo] = useState([]);

  const onInputChange = event => setinputState(event.target.value);

  const addTodo = () => {
    var input = {
      "title": inputState,
      "description": "some description",
      "is_completed": false
    }
    fetch('http://127.0.0.1:8000/', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(input)
    }).then(
      setTimeout(() => {
        getTodoData()
      }, 1000)
    )
    setinputState('')
  };

  const getTodoData = async () => {
    var response = await fetch(`http://127.0.0.1:8000/`);
    // console.log(response);
    response = await response.json()
    console.log(response.data);
    settodo(response.data.map(doc => ({ id: doc.id, title: doc.title, is_completed: doc.is_completed })));

  }
  return (
    <div className="App">
      <h1>React Todo</h1>
      <div className="todo-list">
        {
          document.addEventListener('DOMContentLoaded', () => {
            getTodoData()
          })
        }
        {/* {
          setTimeout(() => {
            console.log(todos)
          }, 1000)
        } */}
        {
          todos.map(todo => (
            <Todo data={todo} key={todo.id} getTodoData={getTodoData} />
          ))
        }
        {/* <div className="todo-item"><h4>{console.log(todo)}</h4><button><DeleteForeverIcon /></button></div> */}
        {/* <div className="todo-item"><h4></h4><button><DeleteForeverIcon /></button></div> */}
        {
        }
      </div>
      <div className="input-box">
        <input type="text" className="input" value={inputState} onChange={onInputChange} name="" id="todoItems" />
        <button onClick={addTodo} className="button"><AddCircleOutline /></button>
      </div>
    </div>
  );
}

export default App;
