import { useState, useEffect } from 'react'

import './UserCard.css';

function UserCard({ userData }) {

    useEffect(() => {
        // console.log(userData);
    }, []);

  return (
    <>
        <img className='image' src={userData.profile_pic_link ||
          "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
        } alt="" />
        <div className="userCardText">
          <h1 className='name'>{userData.last_name} {userData.first_name}</h1>
          <h4 className='dep' title={userData.department}>{userData.department}</h4>
          <h4 className='jobtitle'>{userData.job_title}</h4>
        </div>
    </>
  )
}

export default UserCard;
