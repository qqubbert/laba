import { useState, useEffect } from 'react'

import './UserAdminPane.css';


function UserAdminPane({ userData }) {

  return (
    <>
        {userData && 
        <>
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
        </>}
    </>
  )
}

export default UserAdminPane;
