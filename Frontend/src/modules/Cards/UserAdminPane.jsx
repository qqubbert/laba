import { useState, useEffect } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom';

import ArticleCard from './ArticleCard.jsx'

import msgIcon from '../../assets/MessageIcon.svg';
import closeIcon from '../../assets/CloseIcon.svg';
import plusIcon from '../../assets/PlusIcon.svg';
import editIcon from '../../assets/EditIcon.svg';
import saveIcon from '../../assets/SaveIcon.svg';
import tasksIcon from '../../assets/TaskIcon.svg';
import academicIcon from '../../assets/AcademicIcon.svg';
import birthdayIcon from '../../assets/BirthdayIcon.svg';
import childrenIcon from '../../assets/ChildrenIcon.svg';
import clockIcon from '../../assets/ClockIcon.svg';
import familyIcon from '../../assets/FamilyIcon.svg';
import genderIcon from '../../assets/GenderIcon.svg';
import jobTitleIcon from '../../assets/JobTitleIcon.svg';
import mailIcon from '../../assets/MailIcon.svg';
import moneyIcon from '../../assets/MoneyIcon.svg';
import phoneIcon from '../../assets/PhoneIcon.svg';
import depIcon from '../../assets/DepIcon.svg';
import progressIcon from '../../assets/ProgressIcon.svg';
import articleIcon from '../../assets/ArticleIcon.svg';
import adminAnotherIcon from '../../assets/AdminAnotherIcon.svg';

import './UserAdminPane.css';

function UserAdminPane({ closeUser, userInfo, isChanges, userData, permission, fireUserFunc, showAddTaskWin, addTaskInfo, editUserDataFunc, updUser, editUserImgFunc, editUserPermissionFunc }) {
  const [userTasks, setUserTasks] = useState([]);
  const [userArticles, setUserArticles] = useState([]);
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

  const LoadUserArticles = async () => {
    setUserArticles([]);
    const response = await fetch(`http://localhost:3000/rest-api-service/articles/author/${userData.id}`, {
      method: 'GET',
      credentials: 'include',
      withCredentials: true,
    })

    const responseData = await response.json();
    console.log(responseData);
    
    if (response.ok) {
      setUserArticles(responseData);
    } else {
      console.log('Ошибка');
    }
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
        having_children: Number(userData.having_children),
        job_title: userData.job_title,
        academic_degree: userData.academic_degree,
        dep_id: Number(userData.dep_id),
        work_experience: userData.work_experience,
        salary: Number(userData.salary),
        phone_number: userData.phone_number,
        email: userData.email,
        is_blocked: false,
        profile_pic_link: userData.profile_pic_link,
        permission: userData.permission
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
      console.log(responseData);
  
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
  
  const taskComplete = async (taskId) => {
    try {  
      const response = await fetch("http://localhost:3000/js-service/sanya/task/complete", {
          method: 'PATCH',
          credentials: 'include',
          withCredentials: true,
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              task_id: taskId
          })
      });
      if (response.ok) {
        taskLoad();
      }
    } catch (error) {
        console.error("Ошибка:", error);
    }
  }

  useEffect(() => {
    if (userData) {
      taskLoad();
      console.log(userData);
      const userPermissionSelect = document.getElementById('userPermissionSelect');
      if (userPermissionSelect) {
        userPermissionSelect.value = userData.permission;
      }
      LoadUserArticles();
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

  const userMsgTry = async () => {
    try {  
      const response = await fetch("http://localhost:3000/js-service/sanya/privatechat", {
          method: 'POST',
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userData.id,
          })
      });
      const responseData = await response.json()
      if (response.ok) {
        console.log(responseData);
        if (responseData[0].id) {
          navigate(`/messages/${responseData[0].id}`)
        } else {
          navigate(`/messages/${responseData.rsCreate.insertId}`)
        }
      }
    } catch (error) {
        console.error("Ошибка:", error);
    }
  }

  return (
    <>
        {userData && 
        <>
            <button
              id='closeUserBtn'
              onClick={()=>{
                closeUser()
              }}
            >
              <img src={closeIcon} alt="" />
              Назад
            </button>
            <div id="divInfo">
              <div id="divInfoAll">
                <div id="userInfoTxt">
                  <div className="textdiv" id="idDiv"><h3>ID: {userData.id} </h3></div>
                  <div className="textdiv"><h1>{userData.last_name} {userData.first_name} {userData.surname}</h1>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc("name")}><img src={editIcon} alt="" /></button>}
                  </div>
                  <div className="textdiv">
                    <h3>
                      <img src={birthdayIcon} alt="" />
                      Дата рождения: <span> {userData.birthday} </span>
                    </h3>
                    {/* {permission == 'admin' && <button onClick={()=>editUserDataFunc('birthday')}><img src={editIcon} alt="" /></button>} */}
                  </div>
                  <div className="textdiv">
                    <h3>
                      <img src={genderIcon} alt="" />
                      Пол: <span> {userData.gender === 'М' ? "Мужской" : "Женский"} </span>
                    </h3>
                    {/* {permission == 'admin' && <button onClick={()=>editUserDataFunc('gender')}><img src={editIcon} alt="" /></button>} */}
                  </div>
                  <hr />
                  <h5>Информация о работе:</h5>
                  {permission == 'admin' && userInfo.id != userData.id &&
                  <div className="textdiv">
                    <h3>
                      <img src={adminAnotherIcon} alt="" />
                      Права доступа: 
                      <select name="" id="userPermissionSelect" defaultValue={userData.permission} onChange={(e)=>editUserPermissionFunc(e.target.value)}>
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </h3>
                  </div>
                  }
                  <div className="textdiv">
                    <h3>
                      <img src={jobTitleIcon} alt="" />
                      Должность: <span> {userData.job_title} </span>
                    </h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc('jobTitle')}><img src={editIcon} alt="" /></button>}
                  </div>
                  <div className="textdiv">
                    <h3>
                      <img src={academicIcon} alt="" />
                      Учёная степень: <span>{userData.academic_degree}</span>
                    </h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc('academDegree')}><img src={editIcon} alt="" /></button>}
                  </div>
                  <div className="textdiv">
                    <h3 className='mobile'>
                      <img src={clockIcon} alt="" />
                      Опыт работы (лет): <span>{userData.work_experience}</span>
                    </h3>
                    <h3 className='pc'>
                      <img src={clockIcon} alt="" />
                      Опыт работы (в годах): <span>{userData.work_experience}</span>
                    </h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc('workExp')}><img src={editIcon} alt="" /></button>}
                  </div>
                  <div className="textdiv">
                    <h3>
                      <img src={moneyIcon} alt="" />
                      Зарплата: <span>{new Intl.NumberFormat('ru-IN').format( userData.salary )} ₽</span>
                    </h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc("salary")}><img src={editIcon} alt="" /></button>}
                  </div>
                  <div className="textdiv">
                    <h3>
                      <img src={depIcon} alt="" />
                      Отдел: <span>{userData.department}</span>
                    </h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc('dep')}><img src={editIcon} alt="" /></button>}
                  </div>
                  <hr />
                  <h5>Информация о семье:</h5>
                  <div className="textdiv">
                    <h3>
                      <img src={familyIcon} alt="" />
                      Семейное положение: <span> {userData.family_status} </span>
                    </h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc('familyStatus')}><img src={editIcon} alt="" /></button>}
                  </div>
                  <div className="textdiv">
                    <h3 className='mobile'>
                      <img src={childrenIcon} alt="" />
                      Кол-во детей: <span> {userData.having_children} </span>
                    </h3>
                    <h3 className='pc'>
                      <img src={childrenIcon} alt="" />
                      Количество детей: <span> {userData.having_children} </span>
                    </h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc('children')}><img src={editIcon} alt="" /></button>}
                  </div>
                  <hr />
                  <h5>Контактная информация:</h5>
                  <div className="textdiv">
                    <h3 className='mobile'>
                      <img src={phoneIcon} alt="" />
                      Номер тел. : <span>{userData.phone_number}</span>
                    </h3>
                    <h3 className='pc'>
                      <img src={phoneIcon} alt="" />
                      Номер телефона: <span>{userData.phone_number}</span>
                    </h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc('phone')}><img src={editIcon} alt="" /></button>}
                  </div>
                  <div className="textdiv">
                    <h3 className='pc'>
                      <img src={mailIcon} alt="" />
                      Электронная почта: <span>{userData.email}</span>
                    </h3>
                    <h3 className='mobile'>
                      <img src={mailIcon} alt="" />
                      email: <span>{userData.email}</span>
                    </h3>
                    {permission == 'admin' && <button onClick={()=>editUserDataFunc('email')}><img src={editIcon} alt="" /></button>}
                  </div>
                </div>
                <div id="userPhotoDiv">
                  <img className='userPic' src={userData.profile_pic_link ||
                    "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                  } alt="" />
                  {permission == 'admin' && <button onClick={()=>editUserImgFunc()}><img src={editIcon} alt="" />Изменить фото</button>}
                </div>
                
              </div>
              <hr />
              <h5>Задачи:</h5>
              {<h3 className='taskTtlDiv'>
                <img src={progressIcon} alt="" />
                {userTasks.length == 1 && userTasks.some((el) => !el.completed) && 'Текущая задача:'}
                {userTasks.length > 1 && userTasks.some((el) => !el.completed)  && 'Текущие задачи:'}
                {(userTasks.length <= 0 || !userTasks.some((el) => !el.completed)) && 'Текущих задач нет'}
              </h3>}
              <div id="taskList">
                {userTasks.length > 0 &&
                <>
                  {userTasks.map((el, i)=>{
                    if (!el.completed ) {
                      return (
                        <div className={'task ' + (el.completed ? 'completed' : '')} id={`${i}taskInfo${el.id_employee}`}>
                          <div id="titleAndBtn">
                            <h2 title={el.task + ' ' + (el.completed ? '[Выполнено]' : '')}>{el.task} </h2>
                            {permission == 'admin' && !el.completed &&
                              <button onClick={()=>{taskComplete(el.id)}} title='Завершить задачу'><img src={tasksIcon} alt="" /></button>
                            }
                          </div>
                          <h4>Прогресс: {el.progress}%</h4>
                          <ul className="progressbar">
                          {Array.from({ length: 100 }).map((_, idx) => (
                            <li
                              key={idx}
                              id={`progress${String(idx + 1).padStart(3, "0")}`}
                              className={`${i}progress`}
                            ></li>
                          ))}
                          </ul>
                        </div>
                      )
                    }
                  })}
                </>
                }
                {permission == 'admin' && <button id="addTaskBtn" onClick={()=>{showAddTaskWin()}}><img src={plusIcon} alt="" /></button>}
              </div>
                {userTasks.some((el) => el.completed) && (
                  <>
                    <h3 className="taskTtlDiv">
                      <img src={tasksIcon} alt="" />
                      Выполненные задачи:
                    </h3>
                    {userTasks
                      .filter((el) => el.completed)
                      .map((el, i) => (
                        <div
                          className="task completed"
                          id={`${i}taskInfo${el.id_employee}`}
                          key={el.id}
                        >
                          <div id="titleAndBtn">
                            <h2 title={el.task + " [Выполнено]"}>
                              <span className='noUserSelect'> - </span>{el.task}
                            </h2>
                          </div>
                        </div>
                      ))}
                  </>
                )}
                <h3 id="articlesTtlDiv">
                  <img src={articleIcon} alt="" />
                  Написанные статьи: {userArticles.length >= 1 ? userArticles.length : ''}
                </h3>
                <div id="articlesList">
                {userArticles.length < 1 &&
                <h3>Нет написанных статей</h3>
                }
                {userArticles && userArticles.length >= 1 &&
                  userArticles.map((article, i)=>{
                    const articleLink = `/articles/${article.id}`;
                    return (
                      <NavLink 
                          to={articleLink} 
                          key={article.id} 
                          id={`articleCard${article.id}`}
                          className='ArticleCard' 
                          title={article.title}
                          // onClick={(e) => { 
                          //     LoadSelectedArticle(article.id); 
                          //     setSingleColumn(true);
                          //     selectArticleFunc(article.id);
                          // }}
                      >
                          <ArticleCard articleData={article} author={false}/>
                      </NavLink>
                    )
                  })
                }
                </div>
            </div>
            <div id="adminBtns">
                <div id="adminBtnsLeft">
                  {userInfo.id != userData.id &&
                    <button onClick={()=>{userMsgTry()}}>
                      <img src={msgIcon} alt="" />
                      <span>Сообщение</span>
                    </button>
                  }
                  {permission == 'admin' && 
                  <button onClick={()=>{
                    if (confirm("Вы точно хотите уволить сотрудника?")) {
                      fireUser();
                    }
                  }}>
                    <img src={closeIcon} alt="" />
                    <span>Уволить</span>
                  </button>}
                </div>
                <div id="adminBtnsRight">
                  {permission == 'admin' && isChanges && 
                  <button onClick={()=>{ changePersonDataFunc(); console.log('button save pressed')}}>
                    <img src={saveIcon} alt="" />
                    <span>Сохранить изменения</span>
                  </button>}
                </div>
            </div>
        </>}
    </>
  )
}

export default UserAdminPane;
