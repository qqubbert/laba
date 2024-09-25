import { useEffect, useState } from 'react'

import './Admin.css';

import UserCard from '../Cards/UserCard.jsx';

function Admin({  }) {
    const [users, setUsers] = useState([]);

    const LoadUsers = async () => {
        try {  
            const response = await fetch("http://localhost:3000/rest-api-service/users", {
            method: 'GET',
            credentials: 'include',
            withCredentials: true,
            });
        
            const responseData = await response.json();

            setUsers(responseData);

            // console.log(responseData);
        } catch (error) {
            // console.error("Ошибка:", error);
        }
    }

    useEffect(() => {
        LoadUsers();
    }, []);

  return (
    <>
        <div id="adminPane">
            <div id="usersList">
                {users.map((user, i)=>{
                    // console.log(user);
                    return (
                        <div key={user.first_name} className='UserCard'>
                            <UserCard userData={users[i]} />
                        </div>
                    )
                })}
            </div>
        </div>
    </>
  )
}

export default Admin
