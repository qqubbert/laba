import { useState, useEffect } from 'react'

function UserCard({ articleData }) {

    useEffect(() => {
        // console.log(userData);
    }, []);

  return (
    <>
        <h1>{articleData.title}</h1>
        <h4>Дата публикации: {(articleData.creating_date)}</h4>
        <h4>Автор: {articleData.author_name}</h4>
    </>
  )
}

export default UserCard;
