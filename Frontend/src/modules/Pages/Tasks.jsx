import { useEffect, useState } from 'react'

import './Tasks.css';

import TaskCard from '../Cards/TaskCard.jsx';

function Admin({  }) {
    const [tasks, setTasks] = useState([]);

    const LoadUserTasks = async ( userid ) => {
        try {  
            const response = await fetch(`http://localhost:3000/rest-api-service/tasks`, {
            method: 'GET',
            credentials: 'include',
            withCredentials: true,
            });
        
            const responseData = await response.json();

            setTasks(responseData);

            // console.log(responseData);
        } catch (error) {
            // console.error("Ошибка:", error);
        }
    }

    useEffect(() => {
        LoadUserTasks();
    }, []);

  return (
    <>
        <div id="tasksPane">
            <input type="text" placeholder='Поиск' />
            <div id="taskList">
                {tasks.map((task, i)=>{
                    // console.log(user);
                    return (
                        <div key={task.id} className='TaskCard' id={'taskCard' + i} >
                            <TaskCard taskData={task[i]} />
                        </div>
                    )
                })}
            </div>
        </div>
    </>
  )
}

export default Admin
