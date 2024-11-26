import { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import * as XLSX from "xlsx";

import './Admin.css';

import UserCard from '../Cards/UserCard.jsx';
import UserAdminPane from '../Cards/UserAdminPane.jsx';
import WindowBG from '../Windows/WindowBackground.jsx';

import plusIcon from '../../assets/PlusIcon.svg';
import searchIcon from '../../assets/SearchIcon.svg';
import filterIcon from '../../assets/FiltersIcon.svg';
import tableIcon from '../../assets/TableIcon.svg';

function Admin({ permission }) {
    const [users, setUsers] = useState([]);
    const [deps, setDeps] = useState([]);
    const [userPane, setUserPane] = useState();
    const [usrCard, setUsrCard] = useState(false);
    const [isDepsLoaded, setIsDepsLoaded] = useState(false);
    const [showWindowBG, setShowWindowBG] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [isChanges, setIsChanges] = useState(false);
    const [showTaskWin, setShowTaskWin] = useState(false);
    const [showEditWin, setShowEditWin] = useState(false);
    const [showAddUserWin, setShowAddUserWin] = useState(false);
    const { userid } = useParams();
    const navigate = useNavigate();
    const [isUsersLoaded, setIsUsersLoaded] = useState(false);
    const [isFilters, setIsFilters] = useState(false);
    const [editingDataType, setEditingDataType] = useState("");
    const [newDepTtl, setNewDepTtl] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filters, setFilters] = useState({
        name: "",
        department: "",
        gender: "",
        familyStatus: "",
        children: null,
        experience: null,
        salary: null,
        degree: "",
        jobTitle: "",
    });
    const [addTaskData, setAddTaskData] = useState({
        added: false,
        taskTitle: ''
    });
    const [addUserData, setAddUserData] = useState({
        login: '',
        password: '',
        permission: 'user',
        email: '',
        phone: '',
        firstname: '',
        lastname: '',
        surname: '',
        jobttl: '',
        birthday: '',
        academdeg: '',
        salary: '',
        workexp: '',
        gender: 'М',
        childrencount: '',
        familstat: '',
        dep_id: '',
    });

    const exportToExcel = () => {
        // Преобразование данных в формат, подходящий для Excel
        let usersArray = [];
        if (isFilters) {
            usersArray = filteredUsers
        } else {
            usersArray = users;
        }
        const worksheetData = usersArray.map(user => ({
            "Имя": user.first_name,
            "Фамилия": user.last_name,
            "Отдел": user.department,
            "Должность": user.job_title,
            "Пол": user.gender === "М" ? "Мужской" : "Женский",
            "Дата рождения": user.birthday,
            "Семейное положение": user.family_status,
            "Количество детей": user.having_children,
            "Учёная степень": user.academic_degree,
            "Опыт работы (лет)": user.work_experience,
            "Зарплата (руб.)": user.salary,
            "Телефон": user.phone_number,
            "Email": user.email,
        }));

        // Создаем новую книгу (workbook) и добавляем в нее лист (worksheet)
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Сотрудники");

        // Генерация файла и сохранение его пользователю
        XLSX.writeFile(workbook, "filtered_users.xlsx");
    };

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
        setIsChanges(false);
        const userCards = Array.from(document.getElementsByClassName('UserCard'));
        userCards.forEach((el)=>{
            el.classList.remove('selectedPersonAdmin');
        });
        const selectedPerson = document.getElementById('userCard'+ i);
        selectedPerson.classList.add('selectedPersonAdmin');
    }

    const getDeps = async () => {
        try {  
            const response = await fetch("http://localhost:3000/rest-api-service/departments", {
            method: 'GET',
            credentials: 'include',
            withCredentials: true,
            });
        
            const responseData = await response.json();

            setDeps(responseData);
            setIsDepsLoaded(true);

            // console.log(responseData);
        } catch (error) {
            // console.error("Ошибка:", error);
        }
    }

    useEffect(() => {
        LoadUsers();
        getDeps();
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
        setShowEditWin(false);
        setAddTaskData({ ...addTaskData, added: false })
        setAddUserData({ login: '', password: '' })
    }

    const showTaskWinFunc = () => {
        setShowWindowBG(!showWindowBG);
        setShowTaskWin(!showTaskWin);
        setAddTaskData({ taskTitle: '', added: false })
    }

    const showUserWinFunc = () => {
        setShowWindowBG(!showWindowBG);
        setShowAddUserWin(!showAddUserWin);
        setAddUserData({ login: '', password: '' })
    }

    const showEditWinFunc = () => {
        setShowWindowBG(!showWindowBG);
        setShowEditWin(!showEditWin);
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
                    password: addUserData.password,
                    permission: addUserData.permission || "user",
                    email: addUserData.email,
                    phone: addUserData.phone,
                    firstname: addUserData.firstname,
                    lastname: addUserData.lastname,
                    surname: addUserData.surname,
                    birthday: addUserData.birthday,
                    academdeg: addUserData.academdeg,
                    salary: addUserData.salary,
                    workexp: addUserData.workexp,
                    gender: addUserData.gender || "М",
                    childrencount: addUserData.childrencount,
                    jobttl: addUserData.jobttl,
                    familstat: addUserData.familstat || "Холост",
                    dep_id: addUserData.dep_id || 1
                })
            })
            if (response.ok) {
                LoadUsers();
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    const addDepFunc = async () => {
        try {
            console.log('Отправляется название отдела: ' + newDepTtl)
            const response = await fetch("http://localhost:3000/rest-api-service/departments", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                withCredentials: true,
                body: JSON.stringify({
                    dep_ttl: newDepTtl
                })
            })
            if (response.ok) {
                getDeps();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const imgFileUpload = () => {
        const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';

            fileInput.addEventListener('change', (event) => editUserImgFunc(event));
            document.body.appendChild(fileInput);
            fileInput.click();

            fileInput.addEventListener('click', () => {
            setTimeout(() => {
                fileInput.remove();
            }, 100);
            });
    }

    const editUserImgFunc = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await fetch('http://localhost:3000/rest-api-service/upload', {
                method: 'POST',
                body: formData,
                credentials: 'include',  // если нужно отправлять куки или другие креды
            });
    
            const fileUrl = await response.json();  // сервер возвращает ссылку на загруженный файл
            setUserPane({ ...userPane, profile_pic_link: fileUrl.file_url});
            setIsChanges(true);

          } catch (error) {
              console.error('Ошибка загрузки файла:', error);
          }
          
    }

    const handleFilterChange = (key, value) => {
        console.log(key, ': ', value);
        setFilters(prev => ({
            ...prev,
            [key]: value,
        }));
    };
    
    useEffect(() => {
        const filtered = users.filter(user => {
            const searchParts = filters.name ? filters.name.trim().split(' ').filter(Boolean) : [];
            const matchesName = searchParts.every(part => 
                (user.first_name.toLocaleLowerCase()).includes(part.toLocaleLowerCase()) || (user.last_name.toLocaleLowerCase()).includes(part.toLocaleLowerCase())
            );
    
            return (
                (filters.name ? matchesName : true) &&
                (filters.department ? user.department === filters.department : true) &&
                (filters.gender ? user.gender === filters.gender : true) &&
                (filters.familyStatus ? user.family_status === filters.familyStatus : true) &&
                (filters.children != null ? user.having_children === Number(filters.children) : true) &&
                (filters.experience !== null ? user.work_experience >= Number(filters.experience) : true) &&
                (filters.salary !== null ? user.salary >= Number(filters.salary) : true) &&
                (filters.degree ? user.academic_degree.includes(filters.degree) : true) &&
                (filters.jobTitle ? user.job_title.includes(filters.jobTitle) : true)
            );
        });
        setFilteredUsers(filtered);
        setIsFilters(true);
        console.log(filteredUsers);
    }, [filters, users]); 

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
                <h3 id="AddTaskErr" className='AddErr'>Введите текст задачи</h3>
                <input id="taskTitleInput" type="text" placeholder='Введите название задачи' onChange={(e)=>setAddTaskData({ ...addTaskData, taskTitle: e.target.value})}/>
                <button onClick={()=>{
                    if (addTaskData.taskTitle.length > 0) {
                        showTaskWinFunc();
                        setAddTaskData({ ...addTaskData, added: true});
                    } else {
                        const taskTitleInput = document.getElementById('taskTitleInput');
                        const AddTaskErr = document.getElementById('AddTaskErr');
                        AddTaskErr.style.visibility = "visible";
                        taskTitleInput.classList.add('err');
                        setTimeout(() => {
                            AddTaskErr.style.visibility = "hidden";
                            taskTitleInput.classList.remove('err');
                        }, 1500);
                    }
                }}>
                    Добавить задачу
                </button>
            </div>
        </div>
        }
        {showEditWin &&
        <>
        <div id="editUserDataPane">
            <div id="editUserDataTtlAndClose">
                <h2>Изменение данных</h2>
                <button onClick={showEditWinFunc}>X</button>
            </div>
            <div id="editUserDataPaneForm" action="">
                {/* <h3 id="AddTaskErr" className='AddErr'>Введите изменённые данные</h3> */}
                {editingDataType == 'name' &&
                <>
                    <input defaultValue={userPane.last_name} id="userLastName" className='addUserInput' type="text" placeholder='Введите фамилию для нового пользователя' onChange={(e)=>{setUserPane({ ...userPane, last_name: e.target.value}); console.log(addUserData); setIsChanges(true)}}/>
                    <input defaultValue={userPane.first_name} id="userFirstName" className='addUserInput' type="text" placeholder='Введите имя для нового пользователя' onChange={(e)=>{setUserPane({ ...userPane, first_name: e.target.value}); console.log(addUserData); setIsChanges(true)}}/>
                    <input defaultValue={userPane.surname} id="userSurName" className='addUserInput' type="text" placeholder='Введите отчество для нового пользователя' onChange={(e)=>{setUserPane({ ...userPane, surname: e.target.value}); console.log(addUserData); setIsChanges(true)}}/>
                </>
                }
                {editingDataType == "phone" &&
                    <input defaultValue={userPane.phone_number} id="userPhone" className='addUserInput' type="text" placeholder='Введите номер телефона для пользователя' onChange={(e)=>{setUserPane({ ...userPane, phone_number: e.target.value}); console.log(addUserData); setIsChanges(true)}}/>
                }
                {editingDataType == "email" &&
                    <input defaultValue={userPane.email} id="userEmail" className='addUserInput' type="text" placeholder='Введите почту для пользователя' onChange={(e)=>{setUserPane({ ...userPane, email: e.target.value}); console.log(addUserData); setIsChanges(true)}}/>
                }
                {editingDataType == "academDegree" &&
                    <input defaultValue={userPane.academic_degree} id="userAcadem" className='addUserInput' type="text" placeholder='Введите учёную степень для пользователя' onChange={(e)=>{setUserPane({ ...userPane, academic_degree: e.target.value}); console.log(addUserData); setIsChanges(true)}}/>
                }
                {editingDataType == "jobTitle" &&
                    <input defaultValue={userPane.job_title} id="userJobTitle" className='addUserInput' type="text" placeholder='Введите должность для нового пользователя' onChange={(e)=>{setUserPane({ ...userPane, job_title: e.target.value}); console.log(addUserData); setIsChanges(true)}}/>
                }
                {editingDataType == "children" &&
                    <input defaultValue={userPane.having_children} id="userChildrenCount" className='addUserInput' type="number" placeholder='Введите количество детей для нового пользователя' onChange={(e)=>{setUserPane({ ...userPane, having_children: e.target.value}); console.log(addUserData); setIsChanges(true)}}/>
                }
                {editingDataType == "salary" &&
                    <input defaultValue={userPane.salary} id="userSalary" className='addUserInput' type="number" placeholder='Введите зарплату для нового пользователя' onChange={(e)=>{setUserPane({ ...userPane, salary: e.target.value}); console.log(addUserData); setIsChanges(true)}}/>
                }
                {editingDataType == "workExp" &&
                    <input defaultValue={userPane.work_experience} id="userWorkExp" className='addUserInput' type="number" placeholder='Введите опыт работы для нового пользователя' onChange={(e)=>{setUserPane({ ...userPane, work_experience: e.target.value}); console.log(addUserData); setIsChanges(true)}}/>
                }
                {editingDataType == "birthday" &&
                    <input defaultValue={userPane.birthday} id="userBirthday" className='addUserInput' type="date" placeholder='Введите дату рождения для нового пользователя' onChange={(e)=>{setUserPane({ ...userPane, birthday: e.target.value}); console.log(addUserData); setIsChanges(true)}}/>
                }
                {editingDataType == "gender" &&
                <select
                name="gender"
                value={userPane.gender}
                onChange={(e) => {setUserPane({ ...userPane, gender: e.target.value }); console.log(addUserData); setIsChanges(true)}}
                >
                    <option value="М">Мужской</option>
                    <option value="Ж">Женский</option>
                </select>
                }
                {editingDataType == "familyStatus" &&
                <select
                    name="familstat"
                    value={userPane.family_status}
                    onChange={(e) => {setUserPane({ ...userPane, family_status: e.target.value }); console.log(addUserData); setIsChanges(true)}}
                >
                    <option value="Холост">Холост</option>
                    <option value="Женат">Женат</option>
                    <option value="Вдова(ец)">Вдова(ец)</option>
                    <option value="Разведён">Разведён</option>
                </select>
                }
                {editingDataType == "dep" &&
                <>
                <select
                    name="dep"
                    value={userPane.dep_id}
                    onChange={(e) => {setUserPane({ ...userPane, familstat: e.target.value }); console.log(addUserData); setIsChanges(true)}}
                >
                    {deps.map((dep, i)=>{
                        return (
                            <option value={dep.dep_id} key={dep.dep_id}>{dep.dep_ttl}</option>
                        )
                    })}
                </select>
                <div id="addDep">
                    <input 
                        id="" 
                        type="text" 
                        name="" 
                        placeholder='Введите название отдела' 
                        onChange={(e)=>{
                        setNewDepTtl(e.target.value);
                        console.log(newDepTtl)}}
                    />
                    <button onClick={addDepFunc}>+</button>
                </div>
                </>
                }
            </div>
        </div>
        </>
        }
        {showAddUserWin &&
        <div id="addUserPane">
            <div id="userTtlAndClose">
                <h2>Добавление сотрудника</h2>
                <button onClick={showUserWinFunc}>X</button>
            </div>
            <div id="addUserPaneForm" action="">
                <h3 id='AddUserErr' className='AddErr'>Заполните все данные</h3>
                <input required id="userLoginInput" className='addUserInput' type="text" placeholder='Введите логин для пользователя' onChange={(e)=>{setAddUserData({ ...addUserData, login: e.target.value}); console.log(addUserData)}}/>
                <input required id="userEmail" className='addUserInput' type="text" placeholder='Введите почту для пользователя' onChange={(e)=>{setAddUserData({ ...addUserData, email: e.target.value}); console.log(addUserData)}}/>
                <input id="userPhone" className='addUserInput' type="text" placeholder='Введите номер телефона для пользователя' onChange={(e)=>{setAddUserData({ ...addUserData, phone: e.target.value}); console.log(addUserData)}}/>
                <input required id="userPasswordInput" className='addUserInput' type="text" placeholder='Введите пароль для нового пользователя' onChange={(e)=>{setAddUserData({ ...addUserData, password: e.target.value}); console.log(addUserData)}}/>
                <input id="userFirstName" className='addUserInput' type="text" placeholder='Введите имя для нового пользователя' onChange={(e)=>{setAddUserData({ ...addUserData, firstname: e.target.value}); console.log(addUserData)}}/>
                <input id="userLastName" className='addUserInput' type="text" placeholder='Введите фамилию для нового пользователя' onChange={(e)=>{setAddUserData({ ...addUserData, lastname: e.target.value}); console.log(addUserData)}}/>
                <input id="userSurName" className='addUserInput' type="text" placeholder='Введите отчество для нового пользователя' onChange={(e)=>{setAddUserData({ ...addUserData, surname: e.target.value}); console.log(addUserData)}}/>
                <input id="userAcadem" className='addUserInput' type="text" placeholder='Введите учёную степень для пользователя' onChange={(e)=>{setAddUserData({ ...addUserData, academdeg: e.target.value}); console.log(addUserData)}}/>
                <input id="userJobTitle" className='addUserInput' type="text" placeholder='Введите должность для нового пользователя' onChange={(e)=>{setAddUserData({ ...addUserData, jobttl: e.target.value}); console.log(addUserData)}}/>
                <input id="userChildrenCount" className='addUserInput' type="number" placeholder='Введите количество детей для нового пользователя' onChange={(e)=>{setAddUserData({ ...addUserData, childrencount: e.target.value}); console.log(addUserData)}}/>
                <input id="userSalary" className='addUserInput' type="number" placeholder='Введите зарплату для нового пользователя' onChange={(e)=>{setAddUserData({ ...addUserData, salary: e.target.value}); console.log(addUserData)}}/>
                <input id="userWorkExp" className='addUserInput' type="number" placeholder='Введите опыт работы для нового пользователя' onChange={(e)=>{setAddUserData({ ...addUserData, workexp: e.target.value}); console.log(addUserData)}}/>
                <input required id="userBirthday" className='addUserInput' type="date" placeholder='Введите дату рождения для нового пользователя' onChange={(e)=>{setAddUserData({ ...addUserData, birthday: e.target.value}); console.log(addUserData)}}/>
                <select
                    name="permission"
                    value={addUserData.permission}
                    onChange={(e) => {setAddUserData({ ...addUserData, permission: e.target.value }); console.log(addUserData)}}
                    >
                    <option value="user">Сотрудник</option>
                    <option value="admin">Администратор</option>
                </select>
                <select
                    name="gender"
                    value={addUserData.gender}
                    onChange={(e) => {setAddUserData({ ...addUserData, gender: e.target.value }); console.log(addUserData)}}
                >
                    <option value="М">Мужской</option>
                    <option value="Ж">Женский</option>
                </select>
                <select
                    name="familstat"
                    value={addUserData.familstat}
                    onChange={(e) => {setAddUserData({ ...addUserData, familstat: e.target.value }); console.log(addUserData)}}
                >
                    <option value="Холост">Холост</option>
                    <option value="Не замужем">Не замужем</option>
                    <option value="Женат">Женат</option>
                    <option value="Замужем">Замужем</option>
                    <option value="Вдовец">Вдовец</option>
                    <option value="Вдова">Вдова</option>
                </select>
                <select
                    name="dep"
                    value={addUserData.dep_id}
                    onChange={(e) => {setAddUserData({ ...addUserData, dep_id: e.target.value }); console.log(addUserData)}}
                >
                    {deps.map((dep, i)=>{
                        return (
                            <option value={dep.dep_id} key={dep.dep_id}>{dep.dep_ttl}</option>
                        )
                    })}
                </select>
                <div id="addDep">
                    <input 
                        id="" 
                        type="text" 
                        name="" 
                        placeholder='Введите название отдела' 
                        onChange={(e)=>{
                        setNewDepTtl(e.target.value);
                        console.log(newDepTtl)}}
                    />
                    <button onClick={addDepFunc}>+</button>
                </div>
                <button onClick={()=>{
                    let err = false;
                    if (addUserData.login.length <= 0) {
                        const userLoginInput = document.getElementById('userLoginInput');
                        userLoginInput.classList.add('err');
                        setTimeout(() => {
                            userLoginInput.classList.remove('err');
                        }, 1000);
                        err = true;
                    }
                    if (addUserData.password.length <= 0) {
                        const userPasswordInput = document.getElementById('userPasswordInput');
                        userPasswordInput.classList.add('err');
                        setTimeout(() => {
                            userPasswordInput.classList.remove('err');
                        }, 1000);
                        err = true;
                    } 
                    if (!addUserData.email || addUserData.email.length <= 0) {
                        console.log('email is not filled')
                        const userEmailInput = document.getElementById('userEmail');
                        userEmailInput.classList.add('err');
                        setTimeout(() => {
                            userEmailInput.classList.remove('err');
                        }, 1000);   
                        err = true;
                    }
                    if (!addUserData.birthday || addUserData.birthday.length <= 0) {
                        const userBirthdayInput = document.getElementById('userBirthday');
                        userBirthdayInput.classList.add('err');
                        setTimeout(() => {
                            userBirthdayInput.classList.remove('err');
                        }, 1000);   
                        err = true;
                    }
                    if (!addUserData.firstname || addUserData.firstname.length <= 0) {
                        const userFirstName = document.getElementById('userFirstName');
                        userFirstName.classList.add('err');
                        setTimeout(() => {
                            userFirstName.classList.remove('err');
                        }, 1000);   
                        err = true;
                    }
                    if (!addUserData.surname || addUserData.surname.length <= 0) {
                        const userLastName = document.getElementById('userLastName');
                        userLastName.classList.add('err');
                        setTimeout(() => {
                            userLastName.classList.remove('err');
                        }, 1000);   
                        err = true;
                    }
                    if (!addUserData.surname || addUserData.surname.length <= 0) {
                        const userSurName = document.getElementById('userSurName');
                        userSurName.classList.add('err');
                        setTimeout(() => {
                            userSurName.classList.remove('err');
                        }, 1000);   
                        err = true;
                    }
                    if (!addUserData.academdeg || addUserData.academdeg.length <= 0) {
                        const userAcadem = document.getElementById('userAcadem');
                        userAcadem.classList.add('err');
                        setTimeout(() => {
                            userAcadem.classList.remove('err');
                        }, 1000);   
                        err = true;
                    }
                    if (!addUserData.jobttl || addUserData.jobttl.length <= 0) {
                        const userJobTitle = document.getElementById('userJobTitle');
                        userJobTitle.classList.add('err');
                        setTimeout(() => {
                            userJobTitle.classList.remove('err');
                        }, 1000);   
                        err = true;
                    }
                    if (!addUserData.salary || addUserData.salary.length <= 0) {
                        const userSalary = document.getElementById('userSalary');
                        userSalary.classList.add('err');
                        setTimeout(() => {
                            userSalary.classList.remove('err');
                        }, 1000);   
                        err = true;
                    }
                    if (!addUserData.workexp || addUserData.workexp.length <= 0) {
                        const userWorkExp = document.getElementById('userWorkExp');
                        userWorkExp.classList.add('err');
                        setTimeout(() => {
                            userWorkExp.classList.remove('err');
                        }, 1000);   
                        err = true;
                    }
                    if (!addUserData.childrencount || addUserData.childrencount.length <= 0) {
                        const userChildrenCount = document.getElementById('userChildrenCount');
                        userChildrenCount.classList.add('err');
                        setTimeout(() => {
                            userChildrenCount.classList.remove('err');
                        }, 1000);   
                        err = true;
                    }
                    if (!addUserData.phone || addUserData.phone.length <= 0) {
                        const userPhone = document.getElementById('userPhone');
                        userPhone.classList.add('err');
                        setTimeout(() => {
                            userPhone.classList.remove('err');
                        }, 1000);   
                        err = true;
                    }
                    if (!err) {
                        addUserHttpFunc();
                        showUserWinFunc();
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
                    <button onClick={exportToExcel}><img src={tableIcon} alt="" /></button>
                    <button onClick={()=>setShowFilters(!showFilters)}><img src={filterIcon} alt="" /></button>
                    <input type="text" placeholder='Поиск' onChange={(e) => handleFilterChange('name', e.target.value)}/>
                    <button><img src={searchIcon} alt="" /></button>
                </div>
                {showFilters && 
                <div id="filters">
                    <select name="" id="depFilter" onChange={(e) => handleFilterChange('department', e.target.value)}>
                        <option value="">Все</option>
                        {deps.map((dep, i)=>{
                            return (
                                <option value={dep.dep_ttl} key={dep.dep_id}>{dep.dep_ttl}</option>
                            )
                        })}
                    </select>
                    <select name="" id="genderFilter" onChange={(e) => handleFilterChange('gender', e.target.value)}>
                        <option value="">Все</option>
                        <option value="М">Мужской</option>
                        <option value="Ж">Женский</option>
                    </select>
                    <select name="" id="familyStatusFilter" onChange={(e) => handleFilterChange('familyStatus', e.target.value)}>
                        <option value="">Все</option>   
                        <option value="Холост">Холост</option>
                        <option value="Не замужем">Не замужем</option>
                        <option value="Женат">Женат</option>
                        <option value="Замужем">Замужем</option>
                        <option value="Вдовец">Вдовец</option>
                        <option value="Вдова">Вдова</option>
                    </select>
                    <div id="childrenDiv">
                    <input 
                        type="text" 
                        placeholder="Количество детей" 
                        onChange={(e) => handleFilterChange('children', e.target.value === "" ? null : e.target.value)} 
                    />
                        {/* <select name="" id="">
                            <option value=">">&gt;</option>
                            <option value="<">&lt;</option>
                            <option value="=">=</option>
                            <option value="<=">&lt;=</option>
                            <option value=">=">&gt;=</option>
                        </select> */}
                    </div>
                    <div id="workExpDiv">
                        <input type="text" placeholder='Опыт работы' onChange={(e) => handleFilterChange('experience', e.target.value === "" ? null : e.target.value)}/>
                        {/* <select name="" id="">
                            <option value=">">&gt;</option>
                            <option value="<">&lt;</option>
                            <option value="=">=</option>
                            <option value="<=">&lt;=</option>
                            <option value=">=">&gt;=</option>
                        </select> */}
                    </div>
                    <div id="salaryDiv">
                        <input type="text" placeholder='Зарплата' onChange={(e) => handleFilterChange('salary', e.target.value === "" ? null : e.target.value)}/>
                        {/* <select name="" id="">
                            <option value=">">&gt;</option>
                            <option value="<">&lt;</option>
                            <option value="=">=</option>
                            <option value="<=">&lt;=</option>
                            <option value=">=">&gt;=</option>
                        </select> */}
                    </div>
                    {/* <div id="birthcdayDiv">
                        <input type="date" placeholder=''/>
                        <select name="" id="">
                            <option value=">">&gt;</option>
                            <option value="<">&lt;</option>
                            <option value="=">=</option>
                            <option value="<=">&lt;=</option>
                            <option value=">=">&gt;=</option>
                        </select>
                    </div> */}
                    <input type="text" placeholder='Учёная степень' onChange={(e) => handleFilterChange('degree', e.target.value)}/>
                    <input type="text" placeholder='Должность' onChange={(e) => handleFilterChange('jobTitle', e.target.value)}/>
                </div>}
                <div id="usersList">
                    {users && !isFilters && users.map((user, i)=>{
                        // console.log(user);
                        const userLink = `/employee/${user.id}`;
                        return (
                            <NavLink to={userLink} key={user.id} className='UserCard' id={'userCard' + user.id}>
                                <UserCard userData={users[i]} />
                            </NavLink>
                        )
                    })}
                    {isFilters && filteredUsers.map((user, i)=>{
                        // console.log(user);
                        const userLink = `/employee/${user.id}`;
                        return (
                            <NavLink to={userLink} key={user.id} className='UserCard' id={'userCard' + user.id}>
                                <UserCard userData={filteredUsers[i]} />
                            </NavLink>
                        )
                    })}
                </div>
            </div>
            <div id="userAdminPane">
                {usrCard && 
                <UserAdminPane 
                editUserDataFunc={(type)=>{
                    setEditingDataType(type);
                    showEditWinFunc();
                }} 
                editUserImgFunc={imgFileUpload}
                updUser={()=>{LoadUserPane(userid); LoadUsers()}}
                isChanges={isChanges}
                showAddTaskWin={showTaskWinFunc} 
                addTaskInfo={addTaskData} 
                userData={userPane || undefined} 
                permission={permission} 
                fireUserFunc={()=>{setUsrCard(false); navigate('/employee'); LoadUsers(); LoadUserPane(-1);}}
                />}
            </div>
        </div>
    </>
  )
}

export default Admin
