import { useState } from 'react'

import profileIcon from '../../assets/ProfileIcon.svg';
import settingsIcon from '../../assets/SettingsIcon.svg';
import logoutIcon from '../../assets/LogoutIcon.svg';
import editIcon from '../../assets/EditIcon.svg';

import './ProfileWindow.css';

function ProfileWindow({ showProfileWin, logout }) {
//   const [showProfileWin, setShowProfileWin] = useState(false);

  return (
    <>
        {showProfileWin &&
        <ul id="profileWinList">
            <li><img src={profileIcon} alt="" />Профиль</li>
            <li><img src={settingsIcon} alt="" />Настройки</li>
            <li><img src={editIcon} alt="" />Черновики</li>
            <li onClick={()=>{logout();}}><img src={logoutIcon} alt=""/>Выйти</li>
        </ul>}
    </>
  )
}

export default ProfileWindow
