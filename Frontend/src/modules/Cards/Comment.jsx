import { useState, useEffect } from 'react'

import './UserAdminPane.css';

function Comment({ commentData }) {

    useEffect(() => {
        // console.log(userData);
    }, []);

  return (
    <>
        {/* <h1>{commentData.name}</h1>
        <h4>{(articleData.creating_date)}</h4>
        <h4>{commentData.text}</h4> */}

        <h2>Фамилия Имя Отчество</h2>
        <h4>2020-06-01</h4>
        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, nisi saepe ea repudiandae id voluptas! Necessitatibus quasi culpa qui saepe dolor at dicta assumenda quas laudantium quis! Sunt, nemo perspiciatis!</h4>
    </>
  )
}

export default Comment;
