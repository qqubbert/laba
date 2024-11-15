import { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom';

import './Admin.css';

import UserCard from '../Cards/UserCard.jsx';
import UserAdminPane from '../Cards/UserAdminPane.jsx';
import WindowBG from '../Windows/WindowBackground.jsx';

import plusIcon from '../../assets/PlusIcon.svg';
import searchIcon from '../../assets/SearchIcon.svg';

function Admin({ permission }) {
    const [users, setUsers] = useState([]);
    const [userPane, setUserPane] = useState();
    const [usrCard, setUsrCard] = useState(false);
    const [showWindowBG, setShowWindowBG] = useState(false);
    const [showTaskWin, setShowTaskWin] = useState(false);
    const [showAddUserWin, setShowAddUserWin] = useState(false);
    const { userid } = useParams();
    const navigate = useNavigate();
    const [isUsersLoaded, setIsUsersLoaded] = useState(false);
    const [addTaskData, setAddTaskData] = useState({
        added: false,
        taskTitle: ''
    });
    const [addUserData, setAddUserData] = useState({
        login: '',
        password: '',
        permission: 'user',
    });

    const LoadUsers = async () => {
        try {  
            const response = await fetch("http://localhost:3000/rest-api-service/users", {
            method: 'GET',
            credentials: 'include',
            withCredentials: true,
            });
        
            const responseData = await response.json();

            setUsers(responseData);
            setIsUsersLoaded(true);

            // console.log(responseData);
        } catch (error) {
            // console.error("Ошибка:", error);
        }
    }

    const LoadUserPane = async (usrId) => {
        if (usrId != -1) {
            try {  
                setUsrCard(true);
                if (isUsersLoaded) {
                    const userExists = users.some(user => user.id === parseInt(usrId));
                    if (!userExists) {
                        navigate('/employee'); 
                        return;
                        // console.log('пользователь не существует');
                    }
                    const response = await fetch(`http://localhost:3000/rest-api-service/users/${usrId}`, {
                    method: 'GET',
                    credentials: 'include',
                    withCredentials: true,
                    });
                
                    const adminUserData = await response.json();
    
                    setUserPane(adminUserData);
                    selectPersonFunc(usrId);
    
                    console.log(adminUserData);
                }
            } catch (error) {
                console.error("Ошибка:", error);
            }
        } else {
            setUsrCard(false);
        }
    }

    const selectPersonFunc = (i) => {
        const userCards = Array.from(document.getElementsByClassName('UserCard'));
        userCards.forEach((el)=>{
            el.classList.remove('selectedPersonAdmin');
        });
        const selectedPerson = document.getElementById('userCard'+ i);
        selectedPerson.classList.add('selectedPersonAdmin');
    }

    useEffect(() => {
        LoadUsers();
    }, []);

    useEffect(() => {
        if (isUsersLoaded && userid) {
            LoadUserPane(userid);
        }
    }, [isUsersLoaded, userid]);
    
    const showBG = () => {
        setShowWindowBG(!showWindowBG);
        setShowTaskWin(false);
        setShowAddUserWin(false);
        setAddTaskData({ ...addTaskData, added: false })
        setAddUserData({ login: '', password: '' })
    }

    const showTaskWinFunc = () => {
        setShowWindowBG(!showWindowBG);
        setShowTaskWin(!showTaskWin);
        setAddTaskData({ ...addTaskData, added: false })
    }

    const showUserWinFunc = () => {
        setShowWindowBG(!showWindowBG);
        setShowAddUserWin(!showAddUserWin);
        setAddUserData({ login: '', password: '' })
    }

    
    const addUserHttpFunc = async () => {
        try {
            const response = await fetch("http://localhost:3000/js-service/auth/register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                withCredentials: true,
                body: JSON.stringify({
                    login: addUserData.login,
                    password: addUserData.password
                })
            })
            if (response.ok) {
                LoadUsers();
            }
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <>
        {showWindowBG && <WindowBG hide={showBG}/>}
        {showTaskWin &&
        <div id="addTaskPane">
            <div id="taskTtlAndClose">
                <h2>Добавление задачи</h2>
                <button onClick={showTaskWinFunc}>X</button>
            </div>
            <div id="addTaskPaneForm" action="">
                <input id="taskTitleInput" type="text" placeholder='Введите название задачи' onChange={(e)=>setAddTaskData({ ...addTaskData, taskTitle: e.target.value})}/>
                <button onClick={()=>{
                    if (addTaskData.taskTitle.length > 0) {
                        showTaskWinFunc();
                        setAddTaskData({ ...addTaskData, added: true});
                    } else {
                        const taskTitleInput = document.getElementById('taskTitleInput');
                        taskTitleInput.classList.add('err');
                        setTimeout(() => {
                            taskTitleInput.classList.remove('err');
                        }, 1000);
                    }
                }}>
                    Добавить задачу
                </button>
            </div>
        </div>
        }
        {showAddUserWin &&
        <div id="addUserPane">
            <div id="userTtlAndClose">
                <h2>Добавление сотрудника</h2>
                <button onClick={showUserWinFunc}>X</button>
            </div>
            <div id="addUserPaneForm" action="">
                <input id="userLoginInput" type="text" placeholder='Введите логин для пользователя' onChange={(e)=>{setAddUserData({ ...addUserData, login: e.target.value}); console.log(addUserData)}}/>
                <input id="userPasswordInput" type="text" placeholder='Введите пароль для нового пользователя' onChange={(e)=>{setAddUserData({ ...addUserData, password: e.target.value}); console.log(addUserData)}}/>
                <select name="permission" id="" onChange={(e)=>{setAddUserData({ ...addUserData, permission: e.target.value}); console.log(addUserData)}}>
                    <option value="user">Сотрудник</option>
                    <option value="admin">Администратор</option>
                </select>
                <button onClick={()=>{
                    if (addUserData.login.length > 0 && addUserData.password.length > 0) {
                        addUserHttpFunc();
                        showUserWinFunc();
                    } else if (addUserData.login.length <= 0 && addUserData.password.length <= 0) {
                        const userLoginInput = document.getElementById('userLoginInput');
                        userLoginInput.classList.add('err');
                        const userPasswordInput = document.getElementById('userPasswordInput');
                        userPasswordInput.classList.add('err');
                        setTimeout(() => {
                            userLoginInput.classList.remove('err');
                            userPasswordInput.classList.remove('err');
                        }, 1000);
                    } else if (addUserData.password.length <= 0 && addUserData.login.length > 0) {
                        const userPasswordInput = document.getElementById('userPasswordInput');
                        userPasswordInput.classList.add('err');
                        setTimeout(() => {
                            userPasswordInput.classList.remove('err');
                        }, 1000);
                    } else if (addUserData.login.length <= 0 && addUserData.password.length > 0) {
                        const userLoginInput = document.getElementById('userLoginInput');
                        userLoginInput.classList.add('err');
                        setTimeout(() => {
                            userLoginInput.classList.remove('err');
                        }, 1000);   
                    }
                }}>
                    Добавить сотрудника
                </button>
            </div>
        </div>
        }
        <div id="adminPane">
            <div id="usersListPane">
                <div id="adminInputAndAdd">
                    <button onClick={showUserWinFunc}><img src={plusIcon} alt="" /></button>
                    <input type="text" placeholder='Поиск' />
                    <button><img src={searchIcon} alt="" /></button>
                </div>
                <div id="usersList">
                    {users && users.map((user, i)=>{
                        // console.log(user);
                        const userLink = `/employee/${user.id}`;
                        return (
                            <NavLink to={userLink} key={user.id} className='UserCard' id={'userCard' + user.id}>
                                <UserCard userData={users[i]} />
                            </NavLink>
                        )
                    })}
                </div>
            </div>
            <div id="userAdminPane">
                {usrCard && <UserAdminPane showAddTaskWin={showTaskWinFunc} addTaskInfo={addTaskData} userData={userPane || undefined} permission={permission} fireUserFunc={()=>{setUsrCard(false); navigate('/employee'); LoadUsers(); LoadUserPane(-1);}}/>}
            </div>
        </div>
    </>
  )
}

export default Admin
