import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

import './UserAdminPane.css';

function Comment({ commentData }) {

    useEffect(() => {
        console.log(commentData);
    }, []);

  return (
    <>
        {/* <h1>{commentData.name}</h1>
        <h4>{(articleData.creating_date)}</h4>
        <h4>{commentData.text}</h4> */}
        <NavLink to={`/employee/${commentData.author_id}`}>
          <img src={commentData.pfp || 
            "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"} alt="" />
        </NavLink>
        <div className="commentTxtInfo">
          <h2>
            <NavLink to={`/employee/${commentData.author_id}`}>
              {commentData.author}
            </NavLink>
          </h2>
          {/* <h4>2020-06-01</h4> */}
          <h4>{commentData.comm}</h4>
        </div>
    </>
  )
}

export default Comment;
