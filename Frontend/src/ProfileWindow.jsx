import { useState } from 'react'

import profileIcon from './assets/ProfileIcon.svg';
import settingsIcon from './assets/SettingsIcon.svg';
import logoutIcon from './assets/LogoutIcon.svg';

import './ProfileWindow.css';

function ProfileWindow({ showProfileWin, logout }) {
//   const [showProfileWin, setShowProfileWin] = useState(false);

  return (
    <>
        {showProfileWin &&
        <ul id="profileWinList">
            <li><img src={profileIcon} alt="" />Профиль</li>
            <li><img src={settingsIcon} alt="" />Настройки</li>
            <li onClick={()=>{logout();}}><img src={logoutIcon} alt=""/>Выйти</li>
        </ul>}
    </>
  )
}

export default ProfileWindow
