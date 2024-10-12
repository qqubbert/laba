import { useEffect, useState } from 'react'

import './Messages.css';

// import UserCard from '../Cards/UserCard.jsx';
// import UserAdminPane from '../Cards/UserAdminPane.jsx';

import fileIcon from '../../assets/FileIcon.svg';
import sendIcon from '../../assets/SendIcon.svg';
import settingsIcon from '../../assets/SettingsIcon.svg';

function Messages({ }) {
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [chatLoaded, setChatLoaded] = useState(false);
    const [selectedChat, setSelectedChat] = useState(0);
    const [sendingMsg, setSendingMsg] = useState('');
    const [user, setUser] = useState(0);

    const msgSend = async () => {
        try {  
            const textInput = document.getElementById('sendingMsgInput');
            textInput.value = '';
            console.log('sendingMsg:' + sendingMsg);
            console.log('selectedChat:' + selectedChat);
            setSendingMsg(prev => '')
            const response = await fetch("http://localhost:3000/js-service/sanya/msgsend", {
                method: 'POST',
                credentials: 'include',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: selectedChat,
                    msg: sendingMsg,
                })
            });
            if (response.ok) {
                LoadChatMessages(selectedChat);
            }
        } catch (error) {
            // console.error("Ошибка:", error);
        }
    }

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

    const LoadChatMessages = async (chatid) => {
        try {  
            const response = await fetch(`http://localhost:3000/js-service/sanya/chatmsgs/${chatid}`, {
                method: 'GET',
                credentials: 'include',
                withCredentials: true,
            });
        
            const responseData = (await response.json());
            const messagesData = responseData.rs;
            console.log(messagesData);
            setUser(responseData.user_id);
            console.log(responseData.user_id);
            setChatLoaded(true);
            setMessages(messagesData);

            console.log(messagesData);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    }

    const selectChatFunc = (i) => {
        const chatCards = Array.from(document.getElementsByClassName('chatCard'));
        chatCards.forEach((el)=>{
            el.classList.remove('selectedChat');
        });
        const selectedChat = document.getElementById('chatCard' + i);
        selectedChat.classList.add('selectedChat');
    }

    useEffect(() => {
        LoadChats();
    }, []);

  return (
    <>
        <div id="messages">
            <div id="chatListPane">
                <input type="text" placeholder='Поиск' />
                <div id="chatList">
                    {chats && 
                    chats.map((chat, i)=>{
                        // console.log(user);
                        return (
                            <div key={chat.chat_id} className='chatCard' id={'chatCard' + i} onClick={()=>{LoadChatMessages(chat.chat_id); selectChatFunc(i); setSelectedChat(chat.chat_id)}}>
                                <h1>{chat.title}</h1>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div id="chatPane">
                <div id="chatInfo">
                    <h1>{'Выберите чат'}</h1>
                    {chatLoaded && 
                    <div id="chatInfoBtns">
                        <button><img src={settingsIcon} alt="" /> </button>
                    </div>}
                </div>
                {chatLoaded && 
                <>
                    <div id="messagesList">
                        {messages.map((message, i)=>{
                            return (
                                <div 
                                    key={message.id} 
                                    className={`message ${user == message.sender_id ? 'self' : ''}`}>
                                    {/* {console.log('message:' + message)}
                                    {console.log('user:' + user)}
                                    {console.log('-------')} */}
                                    {message.msg}
                                </div>
                            )
                        })}
                    </div>
                    <div id="sendingPane">
                        {/* <div id="inputdiv"> */}
                        <textarea id="sendingMsgInput" type="text" placeholder='Введите сообщение' onChange={(e)=>{setSendingMsg(prev => e.target.value)}}/>
                        {/* </div> */}
                        <div id="sendingBtns">
                            <button disabled><img src={fileIcon} alt="" /> </button>
                            <button onClick={()=>{msgSend();}} disabled={!sendingMsg}><img src={sendIcon} alt="" /> </button>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    </>
  )
}

export default Messages
