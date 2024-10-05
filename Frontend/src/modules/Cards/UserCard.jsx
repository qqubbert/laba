import { useState, useEffect } from 'react'

import './UserCard.css';

function UserCard({ userData }) {

    useEffect(() => {
        // console.log(userData);
    }, []);

  return (
    <>
        <img className='image' src={userData.photoLink ||
          "https://sun1-54.userapi.com/impg/CsWwpMtsi5yuPAVR0RIXsnp57xBcTLBRONnLKQ/YFqj6Pbck6I.jpg?size=961x1280&quality=95&sign=369a5d28a3e8d0fcae8a32c90514e223&type=album"
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
