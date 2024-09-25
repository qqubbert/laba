import { useState, useEffect } from 'react'

import './UserCard.css';


function UserCard({ userData }) {

    useEffect(() => {
        console.log(userData);
    }, []);

  return (
    <>
        <h1>{userData.first_name} {userData.last_name}</h1>
        <h4>{userData.dep_id} {userData.job_title}</h4>
    </>
  )
}

export default UserCard;
