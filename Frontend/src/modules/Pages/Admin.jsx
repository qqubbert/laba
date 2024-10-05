import { useEffect, useState } from 'react'

import './Admin.css';

import UserCard from '../Cards/UserCard.jsx';
import UserAdminPane from '../Cards/UserAdminPane.jsx';

function Admin({ permission }) {
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

    const selectPersonFunc = (e, i) => {
        const userCards = Array.from(document.getElementsByClassName('UserCard'));
        userCards.forEach((el)=>{
            el.classList.remove('selectedPersonAdmin');
        });
        const selectedPerson = document.getElementById('userCard'+i);
        selectedPerson.classList.add('selectedPersonAdmin');
    }

    useEffect(() => {
        LoadUsers();
    }, []);

  return (
    <>
        <div id="adminPane">
            <div id="usersListPane">
                <input type="text" placeholder='Поиск' />
                <div id="usersList">
                    {users.map((user, i)=>{
                        // console.log(user);
                        return (
                            <div key={user.id} className='UserCard' id={'userCard' + i} onClick={(e)=>{LoadUserPane(user.id); selectPersonFunc(e, i)}}>
                                <UserCard userData={users[i]} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div id="userAdminPane">
                <UserAdminPane userData={userPane || undefined} permission={permission}/>
            </div>
        </div>
    </>
  )
}

export default Admin
