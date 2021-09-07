import './css/Todos.css';
import React, { useState } from 'react';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Todo from './Todo.js'
// require('dotenv').config()
// console.log(process.env)


function Todos() {


    const [inputState, setinputState] = useState({title: '', description: ''});
    const [todos, settodo] = useState([]);

    const onInputChange = event => setinputState({...inputState, [event.target.name]: event.target.value});

    const addTodo = () => {
        var input = {
            "title": inputState.title,
            "description": inputState.description,
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
        setinputState({title: '', description: ''})
    };

    const getTodoData = async () => {
        var response = await fetch(`http://127.0.0.1:8000/`);
        response = await response.json()
        console.log(response.data);
        settodo(response.data.map(doc => ({ id: doc.id, title: doc.title,description: doc.description, is_completed: doc.is_completed })));
    }
    return (
        <div className="App">
            <h1>React Todo</h1>
            <button onClick={getTodoData} >RELOAD</button>
            <div className="todo-list" id="todo-list">
                {
                    document.addEventListener('DOMContentLoaded', () => {
                        getTodoData()
                        console.log("looged")
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
                {/* <input type="date" name="" id="" /> */}
                {/* <input type="datetime" name="" id="" /> */}
                <input type="datetime-local" name="" id="" />
                {/* <input type="time" name="" id="" /> */}
                <input required type="text" className="input" value={inputState.title} onChange={onInputChange} name="title" id="todoItems" />
                <textarea name="description" value={inputState.description} onChange={onInputChange}  id="description" cols="90" rows="2" placeholder="description"></textarea>
                <button onClick={addTodo} className="button"><AddCircleOutline /></button>
            </div>
        </div>
    );
}

export default Todos;