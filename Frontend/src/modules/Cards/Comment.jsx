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

        <h2>{commentData.author}</h2>
        {/* <h4>2020-06-01</h4> */}
        <h4>{commentData.comm}</h4>
    </>
  )
}

export default Comment;
