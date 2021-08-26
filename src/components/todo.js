import React from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


function todo(props) {
    if (props.data.is_completed) {
        return(
            <></>
        )
    }
    else {
        return (

            <div className="todo-item">
                {console.log(props.data)}

                <h4>{props.data.title}</h4>
                <button onClick={event => {
                    // var one = props.data.id;
                    var data = {
                        "id": props.data.id,
                        "is_completed": true
                    }
                    fetch('http://127.0.0.1:8000', {
                        method: 'PATCH',
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify(data)
                    }).then(
                        setTimeout(() => {
                            props.getTodoData()
                        }, 1000)

                    )
                }}>
                    <DeleteForeverIcon />
                </button>
            </div>
        )
    }
}

export default todo
