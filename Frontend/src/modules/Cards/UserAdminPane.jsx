import { useState, useEffect } from 'react'

import './UserAdminPane.css';


function UserAdminPane({ userData }) {

  function progressUpd( progressFill ) {
    console.log(progressFill);
    const progressItms = Array.from(document.getElementsByClassName('progress'));
    progressItms.forEach((el)=>{
      el.classList.remove('progressFilled');
    })
    console.log(progressItms);
    for (let i = 0; i <= progressFill - 1 ; i++ ) {
      progressItms[i].classList.add('progressFilled');
    }
  }

  useEffect(()=>{
    if (userData) {
      progressUpd(20);
    }
  }, [userData])

  return (
    <>
        {userData && 
        <>
            <div id="divInfo">
              <h1>{userData.first_name} {userData.last_name} {userData.surname}</h1>
              <h3>Дата рождения: {userData.birthday}</h3>
              <h3>Семейное положение: {userData.family_status}</h3>
              <h3>Количество детей: {userData.having_children}</h3>
              <h3>Должность: {userData.job_title}</h3>
              <h3>Учёная степень: {userData.academic_degree}</h3>
              <h3>Опыт работы: {userData.work_experience}</h3>
              <h3>Зарплата: {new Intl.NumberFormat('ru-IN', { maximumSignificantDigits: 3 }).format( userData.salary )} ₽</h3>
              <h3>Номер телефона: {userData.phone_number}</h3>
              <h3>Электронная почта: {userData.email}</h3>

              <h3>Текущая задача:</h3>
              <div id="task">
                <div id="taskInfo">
                  <h2>Текст задачи</h2>
                  <h4>Прогресс: </h4>
                  <ul id="progressbar">
                    <li id="progress001" className="progress"></li>
                    <li id="progress002" className="progress"></li>
                    <li id="progress003" className="progress"></li>
                    <li id="progress004" className="progress"></li>
                    <li id="progress005" className="progress"></li>
                    <li id="progress006" className="progress"></li>
                    <li id="progress007" className="progress"></li>
                    <li id="progress008" className="progress"></li>
                    <li id="progress009" className="progress"></li>
                    <li id="progress010" className="progress"></li>
                    <li id="progress011" className="progress"></li>
                    <li id="progress012" className="progress"></li>
                    <li id="progress013" className="progress"></li>
                    <li id="progress014" className="progress"></li>
                    <li id="progress015" className="progress"></li>
                    <li id="progress016" className="progress"></li>
                    <li id="progress017" className="progress"></li>
                    <li id="progress018" className="progress"></li>
                    <li id="progress019" className="progress"></li>
                    <li id="progress020" className="progress"></li>
                    <li id="progress021" className="progress"></li>
                    <li id="progress022" className="progress"></li>
                    <li id="progress023" className="progress"></li>
                    <li id="progress024" className="progress"></li>
                    <li id="progress025" className="progress"></li>
                    <li id="progress026" className="progress"></li>
                    <li id="progress027" className="progress"></li>
                    <li id="progress028" className="progress"></li>
                    <li id="progress029" className="progress"></li>
                    <li id="progress030" className="progress"></li>
                    <li id="progress031" className="progress"></li>
                    <li id="progress032" className="progress"></li>
                    <li id="progress033" className="progress"></li>
                    <li id="progress034" className="progress"></li>
                    <li id="progress035" className="progress"></li>
                    <li id="progress036" className="progress"></li>
                    <li id="progress037" className="progress"></li>
                    <li id="progress038" className="progress"></li>
                    <li id="progress039" className="progress"></li>
                    <li id="progress040" className="progress"></li>
                    <li id="progress041" className="progress"></li>
                    <li id="progress042" className="progress"></li>
                    <li id="progress043" className="progress"></li>
                    <li id="progress044" className="progress"></li>
                    <li id="progress045" className="progress"></li>
                    <li id="progress046" className="progress"></li>
                    <li id="progress047" className="progress"></li>
                    <li id="progress048" className="progress"></li>
                    <li id="progress049" className="progress"></li>
                    <li id="progress050" className="progress"></li>
                    <li id="progress051" className="progress"></li>
                    <li id="progress052" className="progress"></li>
                    <li id="progress053" className="progress"></li>
                    <li id="progress054" className="progress"></li>
                    <li id="progress055" className="progress"></li>
                    <li id="progress056" className="progress"></li>
                    <li id="progress057" className="progress"></li>
                    <li id="progress058" className="progress"></li>
                    <li id="progress059" className="progress"></li>
                    <li id="progress060" className="progress"></li>
                    <li id="progress061" className="progress"></li>
                    <li id="progress062" className="progress"></li>
                    <li id="progress063" className="progress"></li>
                    <li id="progress064" className="progress"></li>
                    <li id="progress065" className="progress"></li>
                    <li id="progress066" className="progress"></li>
                    <li id="progress067" className="progress"></li>
                    <li id="progress068" className="progress"></li>
                    <li id="progress069" className="progress"></li>
                    <li id="progress070" className="progress"></li>
                    <li id="progress071" className="progress"></li>
                    <li id="progress072" className="progress"></li>
                    <li id="progress073" className="progress"></li>
                    <li id="progress074" className="progress"></li>
                    <li id="progress075" className="progress"></li>
                    <li id="progress076" className="progress"></li>
                    <li id="progress077" className="progress"></li>
                    <li id="progress078" className="progress"></li>
                    <li id="progress079" className="progress"></li>
                    <li id="progress080" className="progress"></li>
                    <li id="progress081" className="progress"></li>
                    <li id="progress082" className="progress"></li>
                    <li id="progress083" className="progress"></li>
                    <li id="progress084" className="progress"></li>
                    <li id="progress085" className="progress"></li>
                    <li id="progress086" className="progress"></li>
                    <li id="progress087" className="progress"></li>
                    <li id="progress088" className="progress"></li>
                    <li id="progress089" className="progress"></li>
                    <li id="progress090" className="progress"></li>
                    <li id="progress091" className="progress"></li>
                    <li id="progress092" className="progress"></li>
                    <li id="progress093" className="progress"></li>
                    <li id="progress094" className="progress"></li>
                    <li id="progress095" className="progress"></li>
                    <li id="progress096" className="progress"></li>
                    <li id="progress097" className="progress"></li>
                    <li id="progress098" className="progress"></li>
                    <li id="progress099" className="progress"></li>
                    <li id="progress100" className="progress"></li>
                  </ul>
                </div>
              </div>
            </div>
            <div id="adminBtns">
                <button>Сообщение</button>
                <button>Уволить</button>
            </div>
        </>}
    </>
  )
}

export default UserAdminPane;
