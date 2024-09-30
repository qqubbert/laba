import { useState, useEffect } from 'react'

import './UserCard.css';

function UserCard({ userData }) {

    useEffect(() => {
        // console.log(userData);
    }, []);

  return (
    <>
        <h1>{userData.last_name} {userData.first_name}</h1>
        <h4>{userData.department}</h4>
        <h4>{userData.job_title}</h4>
    </>
  )
}

export default UserCard;
