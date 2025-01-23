/*
Программа: Модуль Авторизации
Лабораторная работа №9 по профессиональному модулю МДК 02.01 Технология разработки 
программного обеспечения
Тема «Инспекция программного кода на предмет соответствия стандартам 
кодирования»
Язык программирования: JavaScript (React)
Разработал: Демидов Данила Александрович
Дата: Октябрь 2024
____________________________________________________________________________
Задача: Создать компонент для авторизации пользователя, отправляющий данные на сервер и обрабатывающий ответ.
____________________________________________________________________________
Переменные, используемые в программе:
- logWin: состояние, отвечает за отображение окна авторизации.
- showErr: состояние, отвечает за отображение сообщений об ошибке.
- errText: текст ошибки, отображаемый пользователю.
- showPass: состояние для управления отображением пароля (в текущем коде не используется).
- isLogged: логическая переменная, указывающая на успешность авторизации.
- loginData: объект, содержащий данные для входа (логин и пароль).
Процедуры:
- AuthConfirm: отправляет данные для входа на сервер, обрабатывает и выводит ответ.
____________________________________________________________________________
*/

import { useEffect, useState } from 'react';
import './Auth.css';

/*
Компонент Auth
Параметры:
- logged: функция, вызываемая при успешной авторизации.
- userId: функция для сохранения идентификатора пользователя.
- permission: функция для сохранения прав доступа пользователя.
*/

function Auth({ logged, userId, permission }) {
  // Состояния компонента (переменные)
  const [logWin, setLogWin] = useState(true); // Окно авторизации
  const [showErr, setShowErr] = useState(true); // Отображение ошибок
  const [errText, setErrText] = useState(' '); // Текст ошибки
  const [showPass, setShowPass] = useState(' '); // Управление видимостью пароля (не используется)
  const [isLogged, setIsLogged] = useState(false); // Успешность авторизации
  const [canRegister, setCanRegister] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [regKey, setRegKey] = useState('');
  const [loginData, setLoginData] = useState({
    login: '',
    password: '',
  }); // Данные для авторизации
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

  /*
  Функция AuthConfirm
  Описание: Отправляет запрос на сервер с данными для авторизации, обрабатывает ответ и вызывает соответствующие функции.
  Локальные переменные:
  - loginErr: элемент DOM для отображения сообщения об ошибке.
  */
  const AuthConfirm = async () => {
    console.log(loginData);
    const loginErr = document.getElementById("LoginErrorMsg");
    if (loginData.login.length >= 1) {
      if (loginData.password.length >= 1) {
        const response = await fetch("http://localhost:3000/js-service/auth/login", {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            login: loginData.login,
            password: loginData.password,
          }),
        });
        const responseData = await response.json();
        
    
        if (response.ok) {
          // Если авторизация успешна
          logged(); // Вызываем функцию logged
          userId(responseData.userid); // Сохраняем ID пользователя
          setIsLogged(true); // Устанавливаем флаг успешной авторизации
          permission(responseData.permission); // Сохраняем права доступа
        } else {
          // Если авторизация не удалась
          loginErr.style.visibility = "visible";
          setErrText(responseData.message); // Устанавливаем сообщение об ошибке
        }
        
      } else {
        setErrText('Введите пароль');
        loginErr.style.visibility = "visible";
      }
    } else {
      loginErr.style.visibility = "visible";
      setErrText('Введите логин');
    }
  };

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
        const responseData = await response.json();
        console.log(responseData.message);
        if (response.ok) {
            console.log('Registered');
            logged(); // Вызываем функцию logged
            setIsLogged(true); // Устанавливаем флаг успешной авторизации
            userId(response.userid); // Сохраняем ID пользователя
            permission(response.permission); // Сохраняем права доступа
        } else {
          // Если авторизация не удалась
          const RegErrorMsg = document.getElementById('RegErrorMsg');
          RegErrorMsg.style.visibility = "visible";
          setShowErr(true);
          setErrText(responseData.message); // Устанавливаем сообщение об ошибке
        }
    } catch (err) {
        console.log(err);
    }
}

  const KeyConfirm = async () => {
    const regKey = document.getElementById("regKeyInput");
    const response = await fetch("http://localhost:3000/js-service/auth/keycheck", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: regKey.value
      }),
    });
    const responseData = await response.json();
    console.log(response);

    if (response.ok) {
      setRegKey(regKey.value);
      setCanRegister(true); 
    } else {  
      // Если авторизация не удалась
      // loginErr.style.visibility = "visible";
      setShowErr(true);
      RegErrorMsg.style.visibility = 'visible';
      setErrText(responseData.message); // Устанавливаем сообщение об ошибке
    }
  };

  /*
  useEffect
  Описание: Сбрасывает состояние авторизации при монтировании компонента.
  */
  useEffect(() => {
    setIsLogged(false);
  }, []);

  function validateString(str) {
    // Проверка на отсутствие символов * & { } | +
    const RegErrorMsg = document.getElementById('RegErrorMsg');
    const forbiddenChars = /[*&{}|+]/;
    if (forbiddenChars.test(str)) {
      setShowErr(true);
      RegErrorMsg.style.visibility = 'visible';
      setErrText('В пароле не должно быть символов * & { } | +');
      return false;
    }

    // Проверка на наличие хотя бы одной заглавной буквы
    const hasUpperCase = /[A-Z]/;
    if (!hasUpperCase.test(str)) {
      setShowErr(true);
      setErrText('В пароле должны быть заглавные буквы');
      RegErrorMsg.style.visibility = 'visible';
      return false;
    }

    // Проверка на наличие хотя бы одной цифры
    const hasNumber = /\d/;
    if (!hasNumber.test(str)) {
      setShowErr(true);
      RegErrorMsg.style.visibility = 'visible';
      setErrText('В пароле должны быть цифры');
      return false;
    }

    return true;
  }

  /*
  Возвращает JSX для отображения формы авторизации.
  */
  return (
    <>
      {logWin && !isRegister &&
        <form action="" id="AuthForm">
            <h1 className='noUsrSelect'>Войти в аккаунт</h1>
            <input 
              type="text" 
              id="login_input"
              placeholder='Логин' 
              onChange={(e) => { setLoginData({ ...loginData, login: e.target.value }) }} 
            />
            <input 
              type="password" 
              id="pass_input"
              placeholder='Пароль' 
              onChange={(e) => { setLoginData({ ...loginData, password: e.target.value }) }} 
            />
            <button id="AuthSubmit" type="button" onClick={AuthConfirm}>Войти</button>
            <span onClick={()=>{setIsRegister(true); setErrText(''); setShowErr(false)}} className='noUsrSelect'>Нет аккаунта</span>  
            <h4 id="LoginErrorMsg">{errText}</h4>
          </form>
}
          {logWin && isRegister && !canRegister &&
          <form action="" id="AuthForm" className='regForm'>
            <h1 className='noUsrSelect'>Введите код регистрации</h1>
            <input id="regKeyInput" type="text" placeholder='Код регистрации'/>
            <button onClick={()=>KeyConfirm()} type='button'>Подтвердить</button>
            <span onClick={()=>{setIsRegister(false); setCanRegister(false); setRegKey(''); setErrText(''); setShowErr(false)}} className='noUsrSelect'>Есть аккаунт</span>  
            <h4 id="LoginErrorMsg">{errText}</h4>
          </form>
          }
          {logWin && isRegister && canRegister &&
          <form action="" id="AuthForm" className='regForm'>
            <h1 className='noUsrSelect'>Регистрация</h1>
            <div id="RegErrorMsg">{errText}</div>
            {/* <input 
              type="text" 
              placeholder='Логин' 
              onChange={(e) => { setLoginData({ ...loginData, login: e.target.value }) }} 
            />
            <input 
              type="password" 
              placeholder='Пароль' 
              onChange={(e) => { setLoginData({ ...loginData, password: e.target.value }) }} 
            /> */}
                <input required id="userLoginInput" className='addUserInput' type="text" placeholder='Введите логин' onChange={(e)=>{setAddUserData({ ...addUserData, login: e.target.value}); console.log(addUserData)}}/>
                <input required id="userEmail" className='addUserInput' type="email" placeholder='Введите почту' onChange={(e)=>{setAddUserData({ ...addUserData, email: e.target.value}); console.log(addUserData)}}/>
                <input id="userPhone" className='addUserInput' type="text" placeholder='Введите номер телефона' onChange={(e)=>{setAddUserData({ ...addUserData, phone: e.target.value}); console.log(addUserData)}}/>
                <input required id="userPasswordInput" className='addUserInput' type="text" placeholder='Введите пароль' onChange={(e)=>{setAddUserData({ ...addUserData, password: e.target.value}); console.log(addUserData)}}/>
                <input id="userFirstName" className='addUserInput' type="text" placeholder='Введите имя' onChange={(e)=>{setAddUserData({ ...addUserData, firstname: e.target.value}); console.log(addUserData)}}/>
                <input id="userLastName" className='addUserInput' type="text" placeholder='Введите фамилию' onChange={(e)=>{setAddUserData({ ...addUserData, lastname: e.target.value}); console.log(addUserData)}}/>
                <input id="userSurName" className='addUserInput' type="text" placeholder='Введите отчество' onChange={(e)=>{setAddUserData({ ...addUserData, surname: e.target.value}); console.log(addUserData)}}/>
                <input id="userAcadem" className='addUserInput' type="text" placeholder='Введите учёную степень' onChange={(e)=>{setAddUserData({ ...addUserData, academdeg: e.target.value}); console.log(addUserData)}}/>
                <input id="userChildrenCount" className='addUserInput' type="number" placeholder='Введите количество детей' onChange={(e)=>{setAddUserData({ ...addUserData, childrencount: e.target.value}); console.log(addUserData)}}/>
                <input id="userWorkExp" className='addUserInput' type="number" placeholder='Введите опыт работы' onChange={(e)=>{setAddUserData({ ...addUserData, workexp: e.target.value}); console.log(addUserData)}}/>
                <input required id="userBirthday" className='addUserInput' type="date" placeholder='Введите дату рождения' onChange={(e)=>{setAddUserData({ ...addUserData, birthday: e.target.value}); console.log(addUserData)}}/>
                {/* <select
                    name="permission"
                    value={addUserData.permission}
                    onChange={(e) => {setAddUserData({ ...addUserData, permission: e.target.value }); console.log(addUserData)}}
                    >
                    <option value="user">Сотрудник</option>
                    <option value="admin">Администратор</option>
                </select> */}
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
                    {addUserData.gender == "М" &&
                      <>
                        <option value="Холост">Холост</option>
                        <option value="Женат">Женат</option>
                        <option value="Вдовец">Вдовец</option>
                      </>
                    }
                    {addUserData.gender == "Ж" &&
                      <>
                        <option value="Не замужем">Не замужем</option>
                        <option value="Замужем">Замужем</option>
                        <option value="Вдова">Вдова</option>
                      </>
                    }
                </select>
                <button id="regSubmit" type='button' onClick={()=>{
                    let err = false;
                    const RegErrorMsg = document.getElementById('RegErrorMsg');
                    if (addUserData.login.length <= 0) {
                        const userLoginInput = document.getElementById('userLoginInput');
                        userLoginInput.classList.add('err');
                        setShowErr(true);
                        RegErrorMsg.style.visibility = 'visible';
                        setErrText('Заполните все данные');
                        setTimeout(() => {
                            userLoginInput.classList.remove('err');
                        }, 1000);
                        err = true;
                    }
                    if (addUserData.password.length >= 4 || 
                        addUserData.password.length <= 16) {
                        if (!validateString(addUserData.password)) {
                          const userPasswordInput = document.getElementById('userPasswordInput');
                          userPasswordInput.classList.add('err');
                          setTimeout(() => {
                            userPasswordInput.classList.remove('err');
                          }, 1000);
                          err = true;
                        }
                      } else {
                        setShowErr(true);
                        RegErrorMsg.style.visibility = 'visible';
                        setErrText('Заполните все данные');
                        RegErrorMsg.style.visibility = 'visible';
                        const userPasswordInput = document.getElementById('userPasswordInput');
                        userPasswordInput.classList.add('err');
                        setTimeout(() => {
                          userPasswordInput.classList.remove('err');
                        }, 1000);
                    }
                    if (!addUserData.email || addUserData.email.length <= 0) {
                        console.log('email is not filled');
                        setShowErr(true);
                        RegErrorMsg.style.visibility = 'visible';
                        setErrText('Заполните все данные');
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
                        setShowErr(true);
                        setErrText('Заполните все данные');
                        RegErrorMsg.style.visibility = 'visible';
                        setTimeout(() => {
                            userBirthdayInput.classList.remove('err');
                        }, 1000);   
                        err = true;
                    }
                    if (!addUserData.firstname || addUserData.firstname.length <= 0) {
                        const userFirstName = document.getElementById('userFirstName');
                        userFirstName.classList.add('err');
                        setShowErr(true);
                        setErrText('Заполните все данные');
                        RegErrorMsg.style.visibility = 'visible';
                        setTimeout(() => {
                            userFirstName.classList.remove('err');
                        }, 1000);   
                        err = true;
                    }
                    if (!addUserData.surname || addUserData.surname.length <= 0) {
                        const userLastName = document.getElementById('userLastName');
                        userLastName.classList.add('err');
                        setShowErr(true);
                        RegErrorMsg.style.visibility = 'visible';
                        setErrText('Заполните все данные');
                        setTimeout(() => {
                            userLastName.classList.remove('err');
                        }, 1000);   
                        err = true;
                    }
                    if (!addUserData.surname || addUserData.surname.length <= 0) {
                        const userSurName = document.getElementById('userSurName');
                        userSurName.classList.add('err');
                        setShowErr(true);
                        RegErrorMsg.style.visibility = 'visible';
                        setErrText('Заполните все данные');
                        setTimeout(() => {
                            userSurName.classList.remove('err');
                        }, 1000);   
                        err = true;
                    }
                    if (!addUserData.academdeg || addUserData.academdeg.length <= 0) {
                        const userAcadem = document.getElementById('userAcadem');
                        userAcadem.classList.add('err');
                        setShowErr(true);
                        RegErrorMsg.style.visibility = 'visible';
                        setErrText('Заполните все данные');
                        setTimeout(() => {
                            userAcadem.classList.remove('err');
                        }, 1000);   
                        err = true;
                    }
                    if (!addUserData.workexp || addUserData.workexp.length <= 0) {
                        const userWorkExp = document.getElementById('userWorkExp');
                        userWorkExp.classList.add('err');
                        setShowErr(true);
                        RegErrorMsg.style.visibility = 'visible';
                        setErrText('Заполните все данные');
                        setTimeout(() => {
                            userWorkExp.classList.remove('err');
                        }, 1000);   
                        err = true;
                    }
                    if (!addUserData.childrencount || addUserData.childrencount.length <= 0) {
                        const userChildrenCount = document.getElementById('userChildrenCount');
                        userChildrenCount.classList.add('err');
                        setShowErr(true);
                        RegErrorMsg.style.visibility = 'visible';
                        setErrText('Заполните все данные');
                        setTimeout(() => {
                            userChildrenCount.classList.remove('err');
                        }, 1000);   
                        err = true;
                    }
                    if (!addUserData.phone || addUserData.phone.length <= 0) {
                        const userPhone = document.getElementById('userPhone');
                        userPhone.classList.add('err');
                        setShowErr(true);
                        RegErrorMsg.style.visibility = 'visible';
                        setErrText('Заполните все данные');
                        setTimeout(() => {
                            userPhone.classList.remove('err');
                        }, 1000);   
                        err = true;
                    }
                    if (!err) {
                      addUserHttpFunc();
                    }
                }}>Зарегистрироваться</button>
            <span onClick={()=>{setIsRegister(false); setCanRegister(false); setRegKey('')}} className='noUsrSelect'>Есть аккаунт</span>  
            <h4 id="LoginErrorMsg">{errText}</h4>
          </form>
          }
    </>
  );
}

export default Auth;
