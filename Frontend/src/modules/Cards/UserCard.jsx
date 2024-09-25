import { useState } from 'react'

import './UserCard.css';


function UserCard({ userData }) {

  return (
    <>
        <div key={ userData.ID }>
            <h1>{userData.FirstName} {userData.LastName}</h1>
            <h4>{userData.DepTtl} {userData.JobTitle}</h4>
        </div>
    </>
  )
}

export default UserCard
