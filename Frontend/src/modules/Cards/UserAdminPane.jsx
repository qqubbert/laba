import { useState, useEffect } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom';

import msgIcon from '../../assets/MessageIcon.svg';
import closeIcon from '../../assets/CloseIcon.svg';
import plusIcon from '../../assets/PlusIcon.svg';
import editIcon from '../../assets/EditIcon.svg';
import saveIcon from '../../assets/SaveIcon.svg';

import './UserAdminPane.css';

function UserAdminPane({ isChanges, userData, permission, fireUserFunc, showAddTaskWin, addTaskInfo, editUserDataFunc, updUser, editUserImgFunc }) {
  const [userTasks, setUserTasks] = useState([]);
  const navigate = useNavigate();

  function progressUpd(userTasks) {
    userTasks.forEach((task, index) => {
      const progress = task.progress;
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
  
  const fireUser = async () => {
    const response = await fetch(`http://localhost:3000/rest-api-service/users/${userData.id}/fired`, {
      method: 'PATCH',
      credentials: 'include',
      withCredentials: true,
    })
    
    if (response.ok) {
      fireUserFunc();
    } else {
      console.log('Ошибка');
    }
  }

  const changePersonDataFunc = async () => {
    const response = await fetch(`http://localhost:3000/rest-api-service/users/${userData.id}`,{
      method: 'PATCH',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify({
        first_name: userData.first_name,
        last_name: userData.last_name,
        surname: userData.surname,
        family_status: userData.family_status,
        having_children: userData.having_children,
        job_title: userData.job_title,
        academic_degree: userData.academic_degree,
        dep_id: userData.dep_id,
        work_experience: userData.work_experience,
        salary: userData.salary,
        phone_number: userData.phone_number,
        email: userData.email,
        is_blocked: false,
        profile_pic_link: userData.profile_pic_link
      })
    });
    if (response.ok) {
      updUser();
    } else {
        console.log('Ошибка при добавлении задачи');
    }
  }

  const taskLoad = async () => {
    try {
      const response = await fetch(`http://localhost:3000/rest-api-service/users/${userData.id}/tasks`, {
        method: 'GET',
        credentials: 'include',
        withCredentials: true,
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при загрузке задач');
      }
  
      const responseData = await response.json();
  
      if (Array.isArray(responseData)) {
        setUserTasks(responseData);
      } else {
        setUserTasks([]);
      }
    } catch (error) {
      setUserTasks([]); 
    }
  };

  const taskAdd = async () => {
    const response = await fetch(`http://localhost:3000/rest-api-service/users/${userData.id}/tasks`,{
      method: 'POST',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify({
          task: addTaskInfo.taskTitle
      })
    });
    if (response.ok) {
      taskLoad();
    } else {
        console.log('Ошибка при добавлении задачи');
    }
  }
  

  useEffect(() => {
    if (userData) {
      taskLoad();
    }
  }, [userData]);  

  useEffect(() => {
    if (userTasks.length > 0) {
      progressUpd(userTasks);
    }
  }, [userTasks]);

  useEffect(()=>{
    if (addTaskInfo.added) {
      taskAdd();
    }
  }, [addTaskInfo])

  return (
    <>
        {userData && 
        <>
            <div id="divInfo">
              <div id="divInfoAll">
                <div id="userInfoTxt">
                  <div className="textdiv"><h3>ID: {userData.id} </h3></div>
                  <div className="textdiv"><h1>{userData.last_name} {userData.first_name} {userData.surname}</h1>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc("name")}><img src={editIcon} alt="" /></button>}
                  </div>
                  <div className="textdiv"><h3>Дата рождения: {userData.birthday}</h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc('birthday')}><img src={editIcon} alt="" /></button>}
                  </div>
                  <div className="textdiv"><h3>Семейное положение: {userData.family_status}</h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc('familyStatus')}><img src={editIcon} alt="" /></button>}
                  </div>
                  <div className="textdiv"><h3>Пол: {userData.gender}</h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc('gender')}><img src={editIcon} alt="" /></button>}
                  </div>
                  <div className="textdiv"><h3>Количество детей: {userData.having_children}</h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc('children')}><img src={editIcon} alt="" /></button>}
                  </div>
                  <div className="textdiv"><h3>Должность: {userData.job_title}</h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc('jobTitle')}><img src={editIcon} alt="" /></button>}
                  </div>
                  <div className="textdiv"><h3>Учёная степень: {userData.academic_degree}</h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc('academDegree')}><img src={editIcon} alt="" /></button>}
                  </div>
                  <div className="textdiv"><h3>Опыт работы: {userData.work_experience}</h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc('workExp')}><img src={editIcon} alt="" /></button>}
                  </div>
                  <div className="textdiv"><h3>Зарплата: {new Intl.NumberFormat('ru-IN', { maximumSignificantDigits: 3 }).format( userData.salary )} ₽</h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc("salary")}><img src={editIcon} alt="" /></button>}
                  </div>
                  <div className="textdiv"><h3>Номер телефона: {userData.phone_number}</h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc('phone')}><img src={editIcon} alt="" /></button>}
                  </div>
                  <div className="textdiv"><h3>Электронная почта: {userData.email}</h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc('email')}><img src={editIcon} alt="" /></button>}
                  </div>
                  <div className="textdiv"><h3>Отдел: {userData.department}</h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc('dep')}><img src={editIcon} alt="" /></button>}
                  </div>
                </div>
                <div id="userPhotoDiv">
                  <img className='userPic' src={userData.profile_pic_link ||
                    "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                  } alt="" />
                  {permission == 'admin' && <button onClick={()=>editUserImgFunc()}><img src={editIcon} alt="" />Изменить фото</button>}
                </div>
              </div>
              <h3>{userTasks.length == 1 && 'Текущая задача:'} {userTasks.length > 1 && 'Текущие задачи:'}{userTasks.length <= 0 && 'Текущих задач нет'}</h3>
              <div id="taskList">
                {userTasks.length > 0 &&
                <>
                  {userTasks.map((el, i)=>{
                    return (
                      <div className='task' id={`${i}taskInfo${el.id_employee}`}>
                        <h2 title={el.task}>{el.task}</h2>
                        <h4>Прогресс: {el.progress}%</h4>
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
                </>
                }
                {permission == 'admin' && <button id="addTaskBtn" onClick={()=>{showAddTaskWin()}}><img src={plusIcon} alt="" /></button>}
              </div>
            </div>
            <div id="adminBtns">
                <div id="adminBtnsLeft">
                  <button><img src={msgIcon} alt="" />Сообщение</button>
                  {permission == 'admin' && <button onClick={()=>{
                    if (confirm("Вы точно хотите уволить сотрудника?")) {
                      fireUser();
                    }
                  }}><img src={closeIcon} alt="" />Уволить</button>}
                </div>
                <div id="adminBtnsRight">
                  {permission == 'admin' && isChanges && <button onClick={()=>{ changePersonDataFunc(); console.log('button save pressed')}}><img src={saveIcon} alt="" />Сохранить изменения</button>}
                </div>
            </div>
        </>}
    </>
  )
}

export default UserAdminPane;
