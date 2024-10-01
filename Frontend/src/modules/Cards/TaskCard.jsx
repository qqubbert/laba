import { useState, useEffect } from 'react'

function TaskCard({ taskData }) {

    useEffect(() => {
        // console.log(userData);
    }, []);

  return (
    <>
        <h1>{taskData.title}</h1>
    </>
  )
}

export default TaskCard;
