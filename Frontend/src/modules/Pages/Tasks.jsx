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
                <input id="taskProgressInput" type="number" placeholder='Введите прогресс задачи' onChange={(e)=>setTaskProgress(e.target.value)}/>
                <button onClick={()=>{changeTaskProgress();}}>
                    Сохранить
                </button>
            </div>
        </div>
        }
        <div id="tasksPane">
            {/* <input type="text" placeholder='Поиск' /> */}
            <div id="taskList">
                {(!tasksLoaded || tasks.length < 1 || tasks.length == undefined) && <h2 id="noTasksHeader">Задач нет</h2>}
                {tasksLoaded && tasks.length >= 1 && 
                tasks.map((task, i)=>{
                    // console.log(user);
                    return (
                        <div className='task' id={`${i}taskInfo`} key={task.id}>
                        <div className="selfTaskBtns">
                            <button className='taskBtn'><img src={articleIcon} alt="" /> Написать статью</button>
                            <button className='taskBtn' onClick={()=>{console.log(task.id); setTaskId(task.id); showTaskWinFunc();}}><img src={progressIcon} alt="" /> Изменить прогресс</button>
                        </div>
                        <h2 title={task.task}>{task.task}</h2>
                        <h4>Прогресс: {task.progress}%</h4>
                        <ul className="progressbar">
                          <li id="progress001" className={`${i}progress`}></li>
                          <li id="progress002" className={`${i}progress`}></li>
                          <li id="progress003" className={`${i}progress`}></li>
                          <li id="progress004" className={`${i}progress`}></li>
                          <li id="progress005" className={`${i}progress`}></li>
                          <li id="progress006" className={`${i}progress`}></li>
                          <li id="progress007" className={`${i}progress`}></li>
                          <li id="progress008" className={`${i}progress`}></li>
                          <li id="progress009" className={`${i}progress`}></li>
                          <li id="progress010" className={`${i}progress`}></li>
                          <li id="progress011" className={`${i}progress`}></li>
                          <li id="progress012" className={`${i}progress`}></li>
                          <li id="progress013" className={`${i}progress`}></li>
                          <li id="progress014" className={`${i}progress`}></li>
                          <li id="progress015" className={`${i}progress`}></li>
                          <li id="progress016" className={`${i}progress`}></li>
                          <li id="progress017" className={`${i}progress`}></li>
                          <li id="progress018" className={`${i}progress`}></li>
                          <li id="progress019" className={`${i}progress`}></li>
                          <li id="progress020" className={`${i}progress`}></li>
                          <li id="progress021" className={`${i}progress`}></li>
                          <li id="progress022" className={`${i}progress`}></li>
                          <li id="progress023" className={`${i}progress`}></li>
                          <li id="progress024" className={`${i}progress`}></li>
                          <li id="progress025" className={`${i}progress`}></li>
                          <li id="progress026" className={`${i}progress`}></li>
                          <li id="progress027" className={`${i}progress`}></li>
                          <li id="progress028" className={`${i}progress`}></li>
                          <li id="progress029" className={`${i}progress`}></li>
                          <li id="progress030" className={`${i}progress`}></li>
                          <li id="progress031" className={`${i}progress`}></li>
                          <li id="progress032" className={`${i}progress`}></li>
                          <li id="progress033" className={`${i}progress`}></li>
                          <li id="progress034" className={`${i}progress`}></li>
                          <li id="progress035" className={`${i}progress`}></li>
                          <li id="progress036" className={`${i}progress`}></li>
                          <li id="progress037" className={`${i}progress`}></li>
                          <li id="progress038" className={`${i}progress`}></li>
                          <li id="progress039" className={`${i}progress`}></li>
                          <li id="progress040" className={`${i}progress`}></li>
                          <li id="progress041" className={`${i}progress`}></li>
                          <li id="progress042" className={`${i}progress`}></li>
                          <li id="progress043" className={`${i}progress`}></li>
                          <li id="progress044" className={`${i}progress`}></li>
                          <li id="progress045" className={`${i}progress`}></li>
                          <li id="progress046" className={`${i}progress`}></li>
                          <li id="progress047" className={`${i}progress`}></li>
                          <li id="progress048" className={`${i}progress`}></li>
                          <li id="progress049" className={`${i}progress`}></li>
                          <li id="progress050" className={`${i}progress`}></li>
                          <li id="progress051" className={`${i}progress`}></li>
                          <li id="progress052" className={`${i}progress`}></li>
                          <li id="progress053" className={`${i}progress`}></li>
                          <li id="progress054" className={`${i}progress`}></li>
                          <li id="progress055" className={`${i}progress`}></li>
                          <li id="progress056" className={`${i}progress`}></li>
                          <li id="progress057" className={`${i}progress`}></li>
                          <li id="progress058" className={`${i}progress`}></li>
                          <li id="progress059" className={`${i}progress`}></li>
                          <li id="progress060" className={`${i}progress`}></li>
                          <li id="progress061" className={`${i}progress`}></li>
                          <li id="progress062" className={`${i}progress`}></li>
                          <li id="progress063" className={`${i}progress`}></li>
                          <li id="progress064" className={`${i}progress`}></li>
                          <li id="progress065" className={`${i}progress`}></li>
                          <li id="progress066" className={`${i}progress`}></li>
                          <li id="progress067" className={`${i}progress`}></li>
                          <li id="progress068" className={`${i}progress`}></li>
                          <li id="progress069" className={`${i}progress`}></li>
                          <li id="progress070" className={`${i}progress`}></li>
                          <li id="progress071" className={`${i}progress`}></li>
                          <li id="progress072" className={`${i}progress`}></li>
                          <li id="progress073" className={`${i}progress`}></li>
                          <li id="progress074" className={`${i}progress`}></li>
                          <li id="progress075" className={`${i}progress`}></li>
                          <li id="progress076" className={`${i}progress`}></li>
                          <li id="progress077" className={`${i}progress`}></li>
                          <li id="progress078" className={`${i}progress`}></li>
                          <li id="progress079" className={`${i}progress`}></li>
                          <li id="progress080" className={`${i}progress`}></li>
                          <li id="progress081" className={`${i}progress`}></li>
                          <li id="progress082" className={`${i}progress`}></li>
                          <li id="progress083" className={`${i}progress`}></li>
                          <li id="progress084" className={`${i}progress`}></li>
                          <li id="progress085" className={`${i}progress`}></li>
                          <li id="progress086" className={`${i}progress`}></li>
                          <li id="progress087" className={`${i}progress`}></li>
                          <li id="progress088" className={`${i}progress`}></li>
                          <li id="progress089" className={`${i}progress`}></li>
                          <li id="progress090" className={`${i}progress`}></li>
                          <li id="progress091" className={`${i}progress`}></li>
                          <li id="progress092" className={`${i}progress`}></li>
                          <li id="progress093" className={`${i}progress`}></li>
                          <li id="progress094" className={`${i}progress`}></li>
                          <li id="progress095" className={`${i}progress`}></li>
                          <li id="progress096" className={`${i}progress`}></li>
                          <li id="progress097" className={`${i}progress`}></li>
                          <li id="progress098" className={`${i}progress`}></li>
                          <li id="progress099" className={`${i}progress`}></li>
                          <li id="progress100" className={`${i}progress`}></li>
                        </ul>
                      </div>
                    )
                })}
            </div>
        </div>
    </>
  )
}

export default Tasks
