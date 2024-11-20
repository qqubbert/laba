import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

import profileIcon from '../../assets/ProfileIcon.svg';
import settingsIcon from '../../assets/SettingsIcon.svg';
import themeIcon from '../../assets/ThemeIcon.svg';
import logoutIcon from '../../assets/LogoutIcon.svg';
import editIcon from '../../assets/EditIcon.svg';
import taskIcon from '../../assets/TaskIcon.svg';
import msgIcon from '../../assets/MessageIcon.svg';

import './ProfileWindow.css';
import WindowBG from './WindowBackground.jsx'
function ProfileWindow({ showProfileWin, logout, hideWindow, profile }) {
//   const [showProfileWin, setShowProfileWin] = useState(false);

  const themeSwitch = () => {
    const root = document.getElementById('root');
    if (root.classList.contains('ocean')) {
      root.classList.remove('ocean');
      root.classList.add('sunset');
      localStorage.setItem('theme', 'sunset');
    } else if (root.classList.contains('sunset')) {
      root.classList.remove('sunset');
      root.classList.add('purple');
      localStorage.setItem('theme', 'purple');
    } else if (root.classList.contains('purple')) {
      root.classList.remove('purple');
      root.classList.add('forest');
      localStorage.setItem('theme', 'forest');
    } else if (root.classList.contains('forest')) {
      root.classList.remove('forest');
      root.classList.add('evening');
      localStorage.setItem('theme', 'evening');
    } else if (root.classList.contains('evening')) {
      root.classList.add('berry');
      root.classList.remove('evening');
      localStorage.setItem('theme', 'berry');
    } else if (root.classList.contains('berry')) {
      root.classList.remove('berry');
      localStorage.setItem('theme', '');
    } else {
      root.classList.add('ocean');
      localStorage.setItem('theme', 'ocean');
    }
  }

  return (
    <>
        {showProfileWin &&
        <>
          <ul id="profileWinList">
              <li onClick={()=>profile()}><img src={profileIcon} alt="" />Профиль</li>
              <li onClick={()=>themeSwitch()}><img src={themeIcon} alt="" />Смена темы</li>
              <li><img src={editIcon} alt="" />Мои статьи</li>
              <li onClick={()=>{logout();}}>
                <NavLink to="/login">
                    <img src={logoutIcon} alt="" /> Выйти
                </NavLink>
              </li>
          </ul>
          <WindowBG hide={()=>hideWindow()}/>
        </>}
    </>
  )
}

export default ProfileWindow
