import { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom';

import './Admin.css';

import UserCard from '../Cards/UserCard.jsx';
import UserAdminPane from '../Cards/UserAdminPane.jsx';

function Admin({ permission }) {
    const [users, setUsers] = useState([]);
    const [userPane, setUserPane] = useState();
    const { userid } = useParams();
    const navigate = useNavigate();
    const [isUsersLoaded, setIsUsersLoaded] = useState(false);

    const LoadUsers = async () => {
        try {  
            const response = await fetch("http://localhost:3000/rest-api-service/users", {
            method: 'GET',
            credentials: 'include',
            withCredentials: true,
            });
        
            const responseData = await response.json();

            setUsers(responseData);
            setIsUsersLoaded(true);

            // console.log(responseData);
        } catch (error) {
            // console.error("Ошибка:", error);
        }
    }

    const LoadUserPane = async (usrId) => {
        try {  
            if (isUsersLoaded) {
                const userExists = users.some(user => user.id === parseInt(usrId));
                if (!userExists) {
                    navigate('/employee'); 
                    return;
                    // console.log('пользователь не существует');
                }
                const response = await fetch(`http://localhost:3000/rest-api-service/users/${usrId}`, {
                method: 'GET',
                credentials: 'include',
                withCredentials: true,
                });
            
                const adminUserData = await response.json();

                setUserPane(adminUserData);
                selectPersonFunc(usrId);

                console.log(adminUserData);
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    }

    const selectPersonFunc = (i) => {
        const userCards = Array.from(document.getElementsByClassName('UserCard'));
        userCards.forEach((el)=>{
            el.classList.remove('selectedPersonAdmin');
        });
        const selectedPerson = document.getElementById('userCard'+(i - 1));
        selectedPerson.classList.add('selectedPersonAdmin');
    }

    useEffect(() => {
        LoadUsers();
    }, []);

    useEffect(() => {
        if (isUsersLoaded && userid) {
            LoadUserPane(userid);
        }
    }, [isUsersLoaded, userid]);

  return (
    <>
        <div id="adminPane">
            <div id="usersListPane">
                <input type="text" placeholder='Поиск' />
                <div id="usersList">
                    {users && users.map((user, i)=>{
                        // console.log(user);
                        const userLink = `/employee/${user.id}`;
                        return (
                            <NavLink to={userLink} key={user.id} className='UserCard' id={'userCard' + i}>
                                <UserCard userData={users[i]} />
                            </NavLink>
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
