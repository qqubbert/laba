import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './Auth.css';

function Auth({ logged }) {
  // const [regWin, setRegWin] = useState(false);
  const [logWin, setLogWin] = useState(true);
  const [showErr, setShowErr] = useState(true);
  const [errText, setErrText] = useState(' ');
  const [showPass, setShowPass] = useState(' ');
  const [loginData, setLoginData] = useState({
    login: '',
    password: '',
  })

  // function changeLogReg() {
  //   setRegWin(!regWin);
  //   setLogWin(!logWin);
  // }

  const AuthConfirm = async () => {
    const loginErr = document.getElementById("LoginErrorMsg");
    const response = await fetch("http://localhost:3000/js-service/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: loginData.login,
        password: loginData.password,
      })
    });
    const responseData = await response.json();
    if (response.ok) {{
      loginErr.style.visibility = "visible";
      setErrText(responseData.message);
      logged();
    }} else {
      loginErr.style.visibility = "visible";
      setErrText(responseData.message);
    }
  }

  return (
    <>
      {logWin &&
        <form action="" id="AuthForm">
            <h1 className='noUsrSelect'>Войти в аккаунт</h1>
            <input type="text" placeholder='Логин' onChange={(e)=>{setLoginData({ ...loginData, login: e.target.value})}}/>
            <input type="password" placeholder='Пароль' onChange={(e)=>{setLoginData({ ...loginData, password: e.target.value})}}/>
            <button id="AuthSubmit" type="button" onClick={AuthConfirm}>Войти</button>
            {/* <a onClick={() => {changeLogReg()}}>Нет аккаунта</a> */}
            <h4 id="LoginErrorMsg">{errText}</h4>
        </form>}

        {/* {regWin &&
        <form action="" id="RegForm">
            <h1>Зарегистрироваться</h1>
            <input type="text" placeholder='Логин'/>
            <input type="text" placeholder='Почта'/>
            <input type="text" placeholder='Пароль'/>
            <input type="text" placeholder='Повтор пароля'/>
            <button id="RegSubmit" type="button">Зарегистрироваться</button>
            <a onClick={() => {changeLogReg()}}>Есть аккаунт</a>
        </form>} */}
    </>
  )
}

export default Auth
