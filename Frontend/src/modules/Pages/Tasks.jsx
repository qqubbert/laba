import { useEffect, useState } from 'react'

import './Tasks.css';

import articleIcon from '../../assets/ArticleIcon.svg';
import progressIcon from '../../assets/ProgressIcon.svg';

import WindowBG from '../Windows/WindowBackground.jsx';

function Tasks({  }) {
    const [tasks, setTasks] = useState([]);
    const [tasksLoaded, setTasksLoaded] = useState(false);
    const [showWindowBG, setShowWindowBG] = useState(false);
    const [showTaskWin, setShowTaskWin] = useState(false);
    const [taskProgress, setTaskProgress] = useState();
    const [taskId, setTaskId] = useState(-1);

    const progressUpd = () => {
        const tasksArr = Array.from(document.getElementsByClassName('task')); 
        tasksArr.forEach((task, index) => {
          const progress = tasks[index].progress;
          console.log(progress);
          const progressItems = Array.from(document.getElementsByClassName(`${index}progress`));
      
          progressItems.forEach((el) => {
            el.classList.remove('progressFilled');
          });
      
          for (let i = 0; i < progress; i++) {
            if (progressItems[i]) {
              progressItems[i].classList.add('progressFilled');
            }
          }
        });
    }

    const LoadUserTasks = async ( ) => {
        try {  
            const response = await fetch(`http://localhost:3000/rest-api-service/tasks/selftasks`, {
            method: 'GET',
            credentials: 'include',
            withCredentials: true,
            });
        
            const responseData = await response.json() || [];
            
            setTasks(responseData);
            setTasksLoaded(true);
            console.log("responseData.length: " + responseData.length)
            console.log(responseData)

            console.log(responseData);
        } catch (error) {
            // console.error("Ошибка:", error);
        }
    }

    useEffect(() => {
        LoadUserTasks();
    }, []);

    useEffect(() => {
        if (tasksLoaded) {
          progressUpd();
        }
      }, [tasks, tasksLoaded]);

    const showTaskWinFunc = () => {
      setShowWindowBG(!showWindowBG);
      setShowTaskWin(!showTaskWin);
    }

    const changeTaskProgress = async () => {
      if (taskProgress <= 100 && taskProgress > 0) {
        try {  
          const response = await fetch("http://localhost:3000/js-service/sanya/taskupdate", {
              method: 'PATCH',
              credentials: 'include',
              withCredentials: true,
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  Progress: taskProgress,
                  task_id: taskId
              })
          });
          if (response.ok) {
              LoadUserTasks();
              showTaskWinFunc();
          }
        } catch (error) {
            console.error("Ошибка:", error);
        }
      } else {
        const changeProgressErr = document.getElementById('changeProgressErr');
        const taskProgressInput = document.getElementById('taskProgressInput');
        changeProgressErr.style.visibility = "visible";
        taskProgressInput.classList.add('err');
        setTimeout(() => {
          changeProgressErr.style.visibility = "hidden";
          taskProgressInput.classList.remove('err');
        }, 1500);
      }
    }

  return (
    <>
        {showWindowBG && <WindowBG hide={showTaskWinFunc}/>}
        {showTaskWin &&
        <div id="editTaskPane">
            <div id="taskEditTtlAndClose">
                <h2>Изменение прогресса</h2>
                <button onClick={showTaskWinFunc}>X</button>
            </div>
            <div id="editTaskPaneForm" action="">
                <h3 id="changeProgressErr" className='AddErr'>Введите допустимое значение</h3>
                <input defaultValue={taskProgress} id="taskProgressInput" type="number" placeholder='Введите прогресс задачи' onChange={(e)=>setTaskProgress(e.target.value)}/>
                <button onClick={()=>{changeTaskProgress();}}>
                    Сохранить
                </button>
            </div>
        </div>
        }
        <div id="tasksPane">
            {/* <input type="text" placeholder='Поиск' /> */}
            <div id="taskList">
                {(!tasksLoaded || tasks.length < 1 || tasks.length == undefined) && <h3 id="noTasksHeader">Невыполненных задач нет</h3>}
                {(tasksLoaded && tasks.length >= 1 && tasks.some((el) => !el.completed)) && <h3 id="noTasksHeader">Невыполненные задачи:</h3>}
                {tasksLoaded && tasks.length >= 1 && 
                tasks.map((task, i)=>{
                    // console.log(user);
                    if (!task.completed ) {
                      return (
                        <div className={'task'} id={`${i}taskInfo`} key={task.id}>
                        <div className="selfTaskBtns">
                            {/* <button className='taskBtn'><img src={articleIcon} alt="" /> Написать статью</button> */}
                            <button disabled={task.completed} className='taskBtn' onClick={()=>{console.log(task.id); setTaskId(task.id); showTaskWinFunc(); setTaskProgress(task.progress)}}><img src={progressIcon} alt="" /> Изменить прогресс</button>
                        </div>
                        <h2 title={task.task + ' ' + (task.completed ? '[Выполнено]' : '')}>{task.task} {(task.completed ? '[Выполнено]' : '')}</h2>
                        <h4>Прогресс: {task.progress}%</h4>
                        <ul className="progressbar">
                            {Array.from({ length: 100 }).map((_, idx) => (
                                <li
                                    key={idx}
                                    className={idx < task.progress ? 'progressFilled' : ''}
                                ></li>
                            ))}
                          </ul>
                      </div>
                    )
                    }
                })}
                {(tasksLoaded && tasks.length >= 1 && tasks.some((el) => el.completed)) && <h3 id="noTasksHeader">Выполненные задачи:</h3>}
                {tasksLoaded && tasks.length >= 1 && 
                tasks.map((task, i)=>{
                    // console.log(user);
                    if (task.completed ) {
                      return (
                        <div className="completed" id={`${i}taskInfo`} key={task.id}>
                        <h2 title={task.task}> <span className='noUserSelect'> - </span>{task.task}</h2>
                      </div>
                    )
                    }
                })}
            </div>
        </div>
    </>
  )
}

export default Tasks
