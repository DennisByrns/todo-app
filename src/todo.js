import React from 'react';
import { useRef, useState} from 'react';
import TodoItem from './todoItem';
import './todo.css';

export default function ToDo() {

	const inputVal = useRef(null);
	const [updated, setUpdated] = useState([]);
	const [styleState, setStyleState] = useState([]);

	function handleClick() {
		if (inputVal.current.value === "") {

		} else {
		
		setUpdated([
			...updated, 
			{
				id: updated.length,
				text: inputVal.current.value,
				style: false
			}
		]);

		inputVal.current.value = "";

		}
	}

	function handleEditClick(id) {
		if(updated[id].id === id && updated[id].style === false) {
			let newUpdated = updated;
			newUpdated[id].style = true;
			setUpdated([...newUpdated]);
		} else {
			let newUpdated = updated;
			newUpdated[id].style = false;
			setUpdated([...newUpdated]);
		}
	}


	function handleDeleteClick(id) {
		const removeTodoItem = updated.filter((todo) => {
			return todo.id !== id;
		});

		setUpdated([...removeTodoItem]);
	}

	return (
		<>
			<div className="container-fluid">
				<div className="row topDiv"></div>
				<div className="row">
					<div className="col"></div>
					<div className="col text-center">
						<div className="card todoDiv">
							<h5 className="card-title todoTitle">Fuck Todo</h5>
							<div className="input-group mb-3" style={{padding: "5% 5% 0 5%", flexWrap: "nowrap"}}>
								<input type="text"
										ref={inputVal} 
										placeholder="Add a Task" />
								<button className="btn btn-outline-secondary addBtn" 
	  									type="button" 
	  									id="button-addon2"
	  									onClick={handleClick}>Add</button>
  							</div>
  							<div className="todoItemList">
  								{updated.map((item) => (<TodoItem text={item.text} styleState={item.style} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} id={item.id} key={item.id}/>))}
  							</div>
						</div>
					</div>
					<div className="col"></div>
				</div>
			</div>
		</>
		)
}