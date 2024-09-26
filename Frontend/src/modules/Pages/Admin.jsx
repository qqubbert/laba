import { useEffect, useState } from 'react'

import './Admin.css';

import UserCard from '../Cards/UserCard.jsx';
import UserAdminPane from '../Cards/UserAdminPane.jsx';

function Admin({  }) {
    const [users, setUsers] = useState([]);
    const [userPane, setUserPane] = useState();

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

    const LoadUserPane = async (usrId) => {
        try {  
            const response = await fetch(`http://localhost:3000/rest-api-service/users/${usrId}`, {
            method: 'GET',
            credentials: 'include',
            withCredentials: true,
            });
        
            const adminUserData = await response.json();

            setUserPane(adminUserData);

            console.log(adminUserData);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    }

    useEffect(() => {
        LoadUsers();
    }, []);

  return (
    <>
        <div id="adminPane">
            <div id="usersList">
                <input type="text" placeholder='Поиск' />
                {users.map((user, i)=>{
                    // console.log(user);
                    return (
                        <div key={user.id} className='UserCard' onClick={()=>{LoadUserPane(user.id); console.log(user.id)}}>
                            <UserCard userData={users[i]} />
                        </div>
                    )
                })}
            </div>
            <div id="userAdminPane">
                <UserAdminPane userData={userPane || undefined}/>
            </div>
        </div>
    </>
  )
}

export default Admin
