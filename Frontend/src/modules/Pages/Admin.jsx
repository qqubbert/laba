import { useEffect, useState } from 'react'

import './Admin.css';

import UserCard from '../Cards/UserCard.jsx';

function Admin({  }) {
    const [users, setUsers] = useState([]);

    const LoadUsers = async () => {
        try {  
            const response = await fetch("http://localhost:3000/go-service/users", {
            method: 'GET',
            credentials: 'include',
            withCredentials: true,
            });
        
            const responseData = await response.json();

            setUsers(responseData);

            console.log(responseData);
        } catch (error) {
            // console.error("Ошибка:", error);
        }
    }

    useEffect(() => {
        LoadUsers();
    }, []);

  return (
    <>
        {users.map((user)=>{
            <UserCard userData={users}/>
        })}
    </>
  )
}

export default Admin
