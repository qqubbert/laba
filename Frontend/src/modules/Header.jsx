import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

import plusIcon from '../assets/PlusIcon.svg';
import leafIcon from '../assets/LeafIcon.svg';
import rocketIcon from '../assets/RocketIcon.svg';
import pawIcon from '../assets/PawIcon.svg';
import terminalIcon from '../assets/TerminalIcon.svg';
import chemistryIcon from '../assets/ChemistryIcon.svg';
import adminIcon from '../assets/AdminIcon.svg';
import msgIcon from '../assets/MessageIcon.svg';
import tasksIcon from '../assets/TaskIcon.svg';
import articleIcon from '../assets/ArticleIcon.svg';
import depIcon from '../assets/DepIcon.svg';

import './Header.css';

import ProfileWindow from './Windows/ProfileWindow.jsx';

function Header({ userInfo, logout, selectedFunc, permission }) {
  const [showProfileWin, setShowProfileWin] = useState(false);
  const navigate = useNavigate();

   function showProfWin () {
    if (showProfileWin) {
        const profWinList = document.getElementById('profileWinList');
        profWinList.classList.add('profWinClosing');
        const winBG = document.getElementById('winBackground');
        winBG.classList.add('winClose');
        setTimeout(() => {
            winBG.classList.remove('winClose');
            setShowProfileWin(false);
            profWinList.classList.remove('profWinClosing');
        }, 290);
    } else {
        setShowProfileWin(true);
    }
  }

  function selectScience(e, clearOut) {
    let clear = clearOut || false
    
    function clearSelect() {
        const scienceArr = Array.from(document.getElementsByClassName('page'));
        scienceArr.forEach(sc => {
            sc.classList.remove('selected');
        });
    }
    
    let selectedFuncArg;

    if (!clear) {
        clearSelect();
        showArticleEditor(true);
        const selected = (document.getElementById(e.currentTarget.id));
        selected.classList.add('selected');
        selectedFuncArg = e.currentTarget.id;
    } else {
        clearSelect();
        selectedFuncArg = 'none';
    }

    selectedFunc(selectedFuncArg);
}

  return (
    <>
        <ProfileWindow showProfileWin={showProfileWin} logout={()=>{logout();}} profile={()=>{navigate(`/employee/${userInfo.id}`); showProfWin()}} hideWindow={()=>{showProfWin()}}/>
        <header>
            <button id="newArticleBtn" onClick={()=>{selectScience('none', true); navigate('/newarticle');}}><img src={plusIcon} alt="" />Новая статья</button>
            <ul>
                {/* <li onClick={(e)=>selectScience(e)} id="biology" className='science'><img src={leafIcon} alt="" className=''/>Биология</li>
                <li onClick={(e)=>selectScience(e)} id="chemistry" className='selected science'><img src={chemistryIcon} alt="" />Химия</li>
                <li onClick={(e)=>selectScience(e)} id="physics" className='science'><img src={rocketIcon} alt="" />Физика</li>
                <li onClick={(e)=>selectScience(e)} id="it" className='science'><img src={terminalIcon} alt="" />IT</li> */}
                <li>
                    <NavLink to="/articles" className={({ isActive }) => (isActive ? 'selected page' : 'page')}>
                        <img src={articleIcon} alt="" /> Статьи
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/messages" className={({ isActive }) => (isActive ? 'selected page' : 'page')}>
                        <img src={msgIcon} alt="" /> Сообщения
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/tasks" className={({ isActive }) => (isActive ? 'selected page' : 'page')}>
                        <img src={tasksIcon} alt="" /> Задачи
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/employee" className={({ isActive }) => (isActive ? 'selected page' : 'page')}>
                        <img src={adminIcon} alt="" /> Сотрудники
                    </NavLink>
                </li>
            </ul>
            <div id="userHeadInfo">
                <h1 title={userInfo.department}>{userInfo.department}</h1>
                <div id="usrProfile">
                    <h2 id="Name" onClick={()=>navigate(`/employee/${userInfo.id}`)}>{userInfo.last_name} {userInfo.first_name} {userInfo.surname}</h2>
                    <h2 id="JobTitle">{userInfo.job_title}</h2>
                    <div id="photoBorder">
                        <img onClick={showProfWin} id="Photo" src={userInfo.photoLink || "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"} alt="" />
                    </div>
                </div>
            </div>
        </header>
    </>
  )
}

export default Header
