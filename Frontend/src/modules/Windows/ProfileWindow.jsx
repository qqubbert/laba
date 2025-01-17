/*
Программа: Модуль меню пользователя
Лабораторная работа №9 по профессиональному модулю МДК 02.01 Технология разработки 
программного обеспечения
Тема «Инспекция программного кода на предмет соответствия стандартам 
кодирования»
Язык программирования: JavaScript (React)
Разработал: Демидов Данила Александрович
Дата: Октябрь 2024
____________________________________________________________________________
Задача: Создать компонент для отображения меню профиля с функциями управления темой, 
просмотра профиля и выхода из учетной записи.
____________________________________________________________________________
Переменные, используемые в программе:
- showProfileWin: логическая переменная, управляющая отображением окна профиля.
- profile: функция, вызываемая для открытия страницы профиля.
- logout: функция, вызываемая при выходе из системы.
- hideWindow: функция, скрывающая окно профиля.
Процедуры:
- themeSwitch: процедура для переключения темы интерфейса приложения.
____________________________________________________________________________
*/

import { NavLink } from 'react-router-dom';

import profileIcon from '../../assets/ProfileIcon.svg';
import themeIcon from '../../assets/ThemeIcon.svg';
import logoutIcon from '../../assets/LogoutIcon.svg';

import './ProfileWindow.css';
import WindowBG from './WindowBackground.jsx';

/*
Компонент ProfileWindow
Параметры:
- showProfileWin: логическая переменная, управляющая отображением окна профиля.
- logout: функция, вызываемая для выхода из системы.
- hideWindow: функция, скрывающая окно профиля.
- profile: функция, открывающая страницу профиля.
*/
function ProfileWindow({ showProfileWin, logout, hideWindow, profile }) {
  /*
  Функция themeSwitch
  Описание: Меняет тему интерфейса приложения, переключая классы root-элемента и сохраняя выбранную тему в localStorage.
  */
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
  };

  /*
  Возвращает JSX для отображения меню профиля и фона.
  */
  return (
    <>
      {showProfileWin &&
        <>
          <ul id="profileWinList">
            <li onClick={() => profile()}>
              <img src={profileIcon} alt="Иконка профиля" />Профиль
            </li>
            <li onClick={() => themeSwitch()}>
              <img src={themeIcon} alt="Иконка смены темы" />Смена темы
            </li>
            <li onClick={() => { logout(); }}>
              <NavLink to="/login">
                <img src={logoutIcon} alt="Иконка выхода" /> Выйти
              </NavLink>
            </li>
          </ul>
          <WindowBG hide={() => hideWindow()} />
        </>
      }
    </>
  );
}

export default ProfileWindow;
