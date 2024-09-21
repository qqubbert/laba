import { useState } from 'react'
import Auth from './Auth.jsx';
// import reactLogo from './assets/react.svg';
import plusIcon from './assets/PlusIcon.svg';
import './Header.css';

function Header({ userInfo }) {
  const [logged, setLogged] = useState(false);

  return (
    <>
        <header>
            <button><img src={plusIcon} alt="" />Новая статья</button>
            <ul>
                <li>Биология</li>
                <li>Химия</li>
                <li>Физика</li>
                <li>IT</li>
                <li>Администрирование</li>
            </ul>
            <div id="userHeadInfo">
                <h1>Отдел физики и астрономии</h1>
                <div id="usrProfile">
                    <h2 id="Name">Санёк Наумов</h2>
                    <h2 id="JobTitle">Уборщик</h2>
                    <img id="Photo" src="https://sun1-54.userapi.com/impg/CsWwpMtsi5yuPAVR0RIXsnp57xBcTLBRONnLKQ/YFqj6Pbck6I.jpg?size=961x1280&quality=95&sign=369a5d28a3e8d0fcae8a32c90514e223&type=album" alt="" />
                </div>
            </div>
        </header>
    </>
  )
}

export default Header
