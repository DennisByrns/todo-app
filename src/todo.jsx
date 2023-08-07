import React from 'react';
import { useRef, useState} from 'react';
import TodoItem from './todoItem';
import './todo.css';

export default function ToDo() {

	const inputVal = useRef(null);
	const dragItem = useRef();
	const overItemIndex = useRef();
	const dragItemIndex = useRef();
	const dragNode = useRef();
	const [updated, setUpdated] = useState([]);
	const [dragging, setDragging] = useState(false);

	function handleClick() {
		if (inputVal.current.value !== "") {
		
			setUpdated([
				...updated, 
				{
					id: Date.now(),
					text: inputVal.current.value,
					style: false
				}
			]);

			inputVal.current.value = "";
			inputVal.current.focus();

		}
	}

	const handleEnterDown = (event) => {
		if (event.key === 'Enter') {
			handleClick();
		}
	}

	function handleCompletedClick(id) {
		setUpdated(prevUpdated =>
			prevUpdated.map(todo => {
				if (todo.id === id) {
					return { ...todo, style: !todo.style};
				}
				return todo;
			})
		);
	}


	function handleDeleteClick(id) {
		const removeTodoItem = updated.filter((todo) => {
			return todo.id !== id;
		});

		setUpdated([...removeTodoItem]);
	}

	const handleDragStart = (e, itemId, itemIndex) => {
		dragItem.current = itemId;
		dragItemIndex.current = itemIndex;
		dragNode.current = e.target;
		setTimeout(() => {
			setDragging(true);
		}, 0)
	}

	const getStyles = (params) => {
		if (params === dragItem.current) {
			return "card draggingTodoItem"
		}
		return "card todoItem"
		
	}

	const handleDragEnter = (e, itemId, itemIndex) => {
		e.preventDefault();
		overItemIndex.current = itemIndex;

		if (dragItemIndex.current !== overItemIndex.current) {
			let newUpdated = [...updated];
			newUpdated.splice(overItemIndex.current,0, newUpdated.splice(dragItemIndex.current,1,)[0]);
			setUpdated(newUpdated);
			dragItemIndex.current = overItemIndex.current;
		}
	}
	const handleDragOver = (e) => {
		e.preventDefault();
	}

	const handleDragEnd = () => {
		dragItem.current = null;
		dragNode.current = null;
		dragItemIndex.current = null;
		setDragging(false);
	}

	return (
		<>
			<div className="container-fluid" onKeyDown={handleEnterDown}>
				<div className="row topDiv"></div>
				<div className="row">
					<div className="col"></div>
					<div className="col text-center">
						<div className="card todoDiv">
							<h5 className="card-title todoTitle">Fuck Todo</h5>
							<div className="input-group mb-3" style={{padding: "5% 5% 0 5%", flexWrap: "nowrap"}}>
								<input type="text"
										autoFocus
										ref={inputVal}
										placeholder="Add a Task" />
								<button className="btn btn-outline-secondary addBtn" 
	  									type="submit" 
	  									id="button-addon2"
	  									onClick={handleClick}>Add</button>
  							</div>
  							<div className="todoItemList">
  								{updated.map((item, itemIndex) => (
									<TodoItem
										draggable="true"
										text={item.text} 
										styleState={item.style} 
										isDragging={dragging}
										draggingStyle={getStyles}
										onCompletedClick={handleCompletedClick} 
										onDeleteClick={handleDeleteClick}
										onDrag={handleDragStart}
										onDragStart={handleDragStart}
										onDragEnter={handleDragEnter}
										onDragOver={handleDragOver}
										onDragEnd={handleDragEnd}
										id={item.id}
										itemIndex={itemIndex} 
										key={item.id}
									/>
								))}
  							</div>
						</div>
					</div>
					<div className="col"></div>
				</div>
			</div>
		</>
		)
}