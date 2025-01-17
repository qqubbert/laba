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
    const [newKey, setNewKey] = useState("");
    const [keys, setKeys] = useState([]);
    // const [showCopiedHint, setShowCopiedHint] = useState(false);
    const [isKeysLoaded, setIsKeysLoaded] = useState(false);
    const [isDepsLoaded, setIsDepsLoaded] = useState(false);
    const [showWindowBG, setShowWindowBG] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [isChanges, setIsChanges] = useState(false);
    const [showTaskWin, setShowTaskWin] = useState(false);
    const [showEditWin, setShowEditWin] = useState(false);
    const [showAddUserWin, setShowAddUserWin] = useState(false);
    const { userid } = useParams();
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
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

            console.log(responseData)
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
        LoadRegCodes();
        setShowAddUserWin(!showAddUserWin);
        setAddUserData({ login: '', password: '' })
    }

    const showEditWinFunc = () => {
        setShowWindowBG(!showWindowBG);
        setShowEditWin(!showEditWin);
    }
    
    // const addUserHttpFunc = async () => {
    //     try {
    //         const response = await fetch("http://localhost:3000/js-service/auth/register", {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             credentials: 'include',
    //             withCredentials: true,
    //             body: JSON.stringify({
    //                 login: addUserData.login,
    //                 password: addUserData.password,
    //                 permission: addUserData.permission || "user",
    //                 email: addUserData.email,
    //                 phone: addUserData.phone,
    //                 firstname: addUserData.firstname,
    //                 lastname: addUserData.lastname,
    //                 surname: addUserData.surname,
    //                 birthday: addUserData.birthday,
    //                 academdeg: addUserData.academdeg,
    //                 salary: addUserData.salary,
    //                 workexp: addUserData.workexp,
    //                 gender: addUserData.gender || "М",
    //                 childrencount: addUserData.childrencount,
    //                 jobttl: addUserData.jobttl,
    //                 familstat: addUserData.familstat || "Холост",
    //                 dep_id: addUserData.dep_id || 1
    //             })
    //         })
    //         if (response.ok) {
    //             LoadUsers();
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    
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

    const generateRegistrationKey = async (length = 16) => {
        LoadRegCodes();
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            key += characters[randomIndex];
        }
        setNewKey(key);
        try {
            const response = await fetch('http://localhost:3000/js-service/auth/addkey', {
                method: 'POST',
                credentials: 'include',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    key: key
                })  // если нужно отправлять куки или другие креды
            });

          } catch (error) {
            console.error('Ошибка загрузки файла:', error);
          }
        console.log(newKey);
    }   
    
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

    const LoadRegCodes = async () => {
        try {  
            const response = await fetch("http://localhost:3000/js-service/auth/keys", {
                method: 'GET',
                credentials: 'include',
                withCredentials: true,
            });
            const responseData = await response.json();
            setKeys(responseData);
            setIsKeysLoaded(true);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

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
                    <option value="Не замужем">Не замужем</option>
                    <option value="Замужем">Замужем</option>
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
                    onChange={(e) => {
                        const selectedDep = deps.find(dep => dep.dep_id === Number(e.target.value));
                        if (selectedDep) {
                            setUserPane({
                                ...userPane,
                                dep_id: selectedDep.dep_id,
                                department: selectedDep.dep_ttl,
                            });
                        }
                        console.log(e.target.value);
                        setIsChanges(true);
                    }}
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
                <h2>Коды регистрации</h2>
                <button onClick={showUserWinFunc}>X</button>
            </div>
            <div id="addUserPaneForm" action="">
            {isKeysLoaded && !(keys.length >= 1) && !newKey &&
                <h2>Нет кодов регистрации</h2>
            }
            {isKeysLoaded && keys.length >= 1 &&
            <>
            <h2>Активные коды:</h2>
            <ul id="regKeyList">
                {keys.slice(0, isExpanded ? keys.length : 3).map((key) => (
                    <li className='noUserSelect'>
                        <span> - </span>
                        <span className='regKeyLi' key={key.id} onClick={()=>{
                            navigator.clipboard.writeText(key.regKey);
                            }}>
                            {key.regKey}
                        </span>
                    </li>
                ))}
            </ul>
                {keys.length > 3 && !isExpanded && (
                    <li>
                        <button onClick={() => setIsExpanded(true)}>
                            Показать ещё {keys.length - 3}...
                        </button>
                    </li>
                )}
                {isExpanded && (
                    <li>
                        <button onClick={() => setIsExpanded(false)}>
                            Свернуть
                        </button>
                    </li>
                )}
            </>
            }
            {newKey &&
            <>
                <h2>Новый код:</h2>
                <h1>{newKey}</h1>
            </>
            }
            <button onClick={()=>{generateRegistrationKey()}}>Создать код</button>
            </div>
        </div>
        }
        <div id="adminPane">
            <div id="usersListPane">
                <div id="adminInputAndAdd">
                    {permission == 'admin' &&
                        <button onClick={showUserWinFunc}><img src={plusIcon} alt="" /></button>
                    }
                    <button onClick={exportToExcel}><img src={tableIcon} alt="" /></button>
                    <button 
                        onClick={()=>{
                            setShowFilters(!showFilters); 
                            setFilters({
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
                        }}
                    >
                    <img src={filterIcon} alt="" />
                    </button>
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
