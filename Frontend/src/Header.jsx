import { useState } from 'react'

import plusIcon from './assets/PlusIcon.svg';
import leafIcon from './assets/LeafIcon.svg';
import rocketIcon from './assets/RocketIcon.svg';
import pawIcon from './assets/PawIcon.svg';
import terminalIcon from './assets/TerminalIcon.svg';
import chemistryIcon from './assets/ChemistryIcon.svg';
import adminIcon from './assets/AdminIcon.svg';

import './Header.css';

import ProfileWindow from './ProfileWindow.jsx';

function Header({ userInfo, logout, showArticleEditor }) {
  const [showProfileWin, setShowProfileWin] = useState(false);

   function showProfWin () {
    if (showProfileWin) {
        const profWinList = document.getElementById('profileWinList');
        profWinList.classList.add('profWinClosing');
        setTimeout(() => {
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
        const scienceArr = Array.from(document.getElementsByClassName('science'));
        scienceArr.forEach(sc => {
            sc.classList.remove('selected');
        });
    }

    if (!clear) {
        clearSelect();
        showArticleEditor(true);
        const selected = (document.getElementById(e.currentTarget.id));
        selected.classList.add('selected');
    } else {
        clearSelect();
    }
  }

  return (
    <>
        <ProfileWindow showProfileWin={showProfileWin} logout={()=>{logout();}}/>
        <header>
            <button id="newArticleBtn" onClick={()=>{showArticleEditor(); selectScience('', true)}}><img src={plusIcon} alt="" />Новая статья</button>
            <ul>
                <li onClick={(e)=>selectScience(e)} id="biology" className='science'><img src={leafIcon} alt="" className=''/>Биология</li>
                <li onClick={(e)=>selectScience(e)} id="chemistry" className='selected science'><img src={chemistryIcon} alt="" />Химия</li>
                <li onClick={(e)=>selectScience(e)} id="physics" className='science'><img src={rocketIcon} alt="" />Физика</li>
                <li onClick={(e)=>selectScience(e)} id="it" className='science'><img src={terminalIcon} alt="" />IT</li>
                <li  onClick={(e)=>selectScience(e)} id="admin" className='science'><img src={adminIcon} alt="" />Администрирование</li>
            </ul>
            <div id="userHeadInfo">
                <h1>Отдел физики и астрономии</h1>
                <div id="usrProfile">
                    <h2 id="Name">Санёк Наумов</h2>
                    <h2 id="JobTitle">Уборщик</h2>
                    <div id="photoBorder">
                        <img onClick={showProfWin} id="Photo" src="https://sun1-54.userapi.com/impg/CsWwpMtsi5yuPAVR0RIXsnp57xBcTLBRONnLKQ/YFqj6Pbck6I.jpg?size=961x1280&quality=95&sign=369a5d28a3e8d0fcae8a32c90514e223&type=album" alt="" />
                    </div>
                </div>
            </div>
        </header>
    </>
  )
}

export default Header
