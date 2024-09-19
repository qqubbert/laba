import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './Auth.css';

function Auth() {
  // const [regWin, setRegWin] = useState(false);
  const [logWin, setLogWin] = useState(true);

  // function changeLogReg() {
  //   setRegWin(!regWin);
  //   setLogWin(!logWin);
  // }

  return (
    <>
      {logWin &&
        <form action="" id="AuthForm">
            <h1>Войти в аккаунт</h1>
            <input type="text" placeholder='Логин'/>
            <input type="text" placeholder='Пароль'/>
            <button id="AuthSubmit" type="button">Войти</button>
            <a onClick={() => {changeLogReg()}}>Нет аккаунта</a>
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
