import { useEffect, useState } from 'react'

import './Messages.css';

import UserCard from '../Cards/UserCard.jsx';
import UserAdminPane from '../Cards/UserAdminPane.jsx';

function Messages({ }) {
    const [chats, setChats] = useState([]);
    // const [userPane, setUserPane] = useState();

    const LoadChats = async () => {
        try {  
            const response = await fetch("http://localhost:3000/js-service/sanya/chats", {
            method: 'GET',
            credentials: 'include',
            withCredentials: true,
            });
        
            const responseData = await response.json();

            setChats(responseData);

            console.log(responseData);
        } catch (error) {
            // console.error("Ошибка:", error);
        }
    }

    // const LoadUserPane = async (usrId) => {
    //     try {  
    //         const response = await fetch(`http://localhost:3000/rest-api-service/users/${usrId}`, {
    //         method: 'GET',
    //         credentials: 'include',
    //         withCredentials: true,
    //         });
        
    //         const adminUserData = await response.json();

    //         setUserPane(adminUserData);

    //         console.log(adminUserData);
    //     } catch (error) {
    //         console.error("Ошибка:", error);
    //     }
    // }

    // const selectPersonFunc = (e, i) => {
    //     const userCards = Array.from(document.getElementsByClassName('UserCard'));
    //     userCards.forEach((el)=>{
    //         el.classList.remove('selectedPersonAdmin');
    //     });
    //     const selectedPerson = document.getElementById('userCard'+i);
    //     selectedPerson.classList.add('selectedPersonAdmin');
    // }

    useEffect(() => {
        LoadChats();
    }, []);

  return (
    <>
        <div id="messages">
            <div id="chatListPane">
                <input type="text" placeholder='Поиск' />
                <div id="chatList">
                    {chats.map((chat, i)=>{
                        // console.log(user);
                        return (
                            <div key={chat.id} className='chatCard' id={'chatCard' + i} >
                                <h1>{chat.title}</h1>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div id="chatPane">
                <div id="chatInfo">
                    <h1>Title</h1>
                    {true && 
                    <div id="chatInfoBtns">
                        <button>Options</button>
                    </div>}
                </div>
                {true && 
                <>
                <div id="messagesList">
                    <div className="message">message001</div>
                    <div className="message">message002</div>
                    <div className="message">message003</div>
                    <div className="message">message004</div>
                    <div className="message">message005</div>
                    <div className="message">message006</div>
                    <div className="message">message007</div>
                    <div className="message">message008</div>
                    <div className="message">message009</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    {/* <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div>
                    <div className="message">message010</div> */}
                </div>
                <div id="sendingPane">
                    {/* <div id="inputdiv"> */}
                        <input type="text" placeholder='Введите сообщение'/>
                    {/* </div> */}
                    <div id="sendingBtns">
                        <button>Файл</button>
                        <button>Отправить</button>
                    </div>
                </div>
                </>}
            </div>
        </div>
    </>
  )
}

export default Messages
