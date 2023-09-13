import React, { useEffect, useState } from 'react';

let urlBase = "https://playground.4geeks.com/apis/fake/todos/user/davidbetancourt"

function Home() {
	const [task, setTask] = useState({ label: "", done: false });
	const [tasksList, setTasksList] = useState([]);

	const handleAddTask = async (event) => {
		if (task && event.key == "Enter") {
			//setTasksList([...tasksList, task]);
			//setTask('');          
			try {
				let response = await fetch(urlBase, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify([...tasksList, task])
				})
				if (response.ok) {
					getTask()
				}
			} catch (error) {

			}
		}
	};

	const taskChange = (event) => {
		setTask({
			...task,
			label: event.target.value
		})
	}

	const deleteTask = async (index) => {
		const newList = tasksList.filter((value, i) => i !== index)
		try {
			let response = await fetch(urlBase, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(newList)
			})
			if (response.ok) {
				getTask()
			}
		} catch (error) {

		}
	}

	const getTask = async () => {
		try {
			let response = await fetch(urlBase)
			let data = await response.json()
			if (response.ok) {
				setTasksList(data)
			} else {
				createUser()
			}
		} catch (error) {

		}
	}
	const createUser = async () => {
		try {
			let response = await fetch(urlBase, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([])
			})
			if (response.ok) {
				getTask()
			}

		} catch (error) {

		}
	}


	useEffect(() => {
		getTask()
	}, []);

	return (
		<div className="container">
			<div className="row">
				<h1 className='title'>Todo List</h1>
				<div className='col-12 p-0'>
					<input
						type="text"
						className="form-control"
						placeholder="Nueva tarea"
						value={task.label}
						onChange={e => taskChange(e)}
						onKeyUp={e => handleAddTask(e)}
					/>
				</div>
				<ul className="list-group col-12 p-0">
					{tasksList.map((task, index) => (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between">
							<span>{task.label}</span>
							<button
								onClick={e => deleteTask(index)}
								style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
							>
								<i class="far fa-trash-alt"></i>
							</button>
						</li>
					))}
				</ul>
				{tasksList.length > 0 ? (
					<div>
						{tasksList.length} item{tasksList.length === 1 ? '' : 's'} left
					</div>
				) : (
					<div>
						No hay tareas, añadir tareas
					</div>
				)}
			</div>
		</div>
	);
}

export default Home;