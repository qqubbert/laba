import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

import profileIcon from '../../assets/ProfileIcon.svg';
import settingsIcon from '../../assets/SettingsIcon.svg';
import logoutIcon from '../../assets/LogoutIcon.svg';
import editIcon from '../../assets/EditIcon.svg';
import taskIcon from '../../assets/TaskIcon.svg';
import msgIcon from '../../assets/MessageIcon.svg';

import './ProfileWindow.css';
import WindowBG from './WindowBackground.jsx'
function ProfileWindow({ showProfileWin, logout, hideWindow, profile }) {
//   const [showProfileWin, setShowProfileWin] = useState(false);

  return (
    <>
        {showProfileWin &&
        <>
          <ul id="profileWinList">
              <li onClick={()=>profile()}><img src={profileIcon} alt="" />Профиль</li>
              <li><img src={settingsIcon} alt="" />Настройки</li>
              <li><img src={editIcon} alt="" />Мои статьи</li>
              <li onClick={()=>{logout();}}>
                <NavLink to="/">
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
