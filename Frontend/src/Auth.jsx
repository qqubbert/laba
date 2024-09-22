import { useEffect, useState } from 'react';
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

  const AuthConfirm = async () => {
    const loginErr = document.getElementById("LoginErrorMsg");
    const response = await fetch("http://localhost:3000/js-service/login", {
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
            <h4 id="LoginErrorMsg">{errText}</h4>
        </form>}
    </>
  )
}

export default Auth
