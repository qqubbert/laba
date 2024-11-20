import { useEffect, useState } from 'react'

import './Messages.css';

// import UserCard from '../Cards/UserCard.jsx';
// import UserAdminPane from '../Cards/UserAdminPane.jsx';
import WindowBG from '../Windows/WindowBackground.jsx';

import fileIcon from '../../assets/FileIcon.svg';
import sendIcon from '../../assets/SendIcon.svg';
import settingsIcon from '../../assets/SettingsIcon.svg';
import plusIcon from '../../assets/PlusIcon.svg';
import searchIcon from '../../assets/SearchIcon.svg';

function Messages({ }) {
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [chatLoaded, setChatLoaded] = useState(false);
    const [showWindowBG, setShowWindowBG] = useState(false);
    const [showWindowBGSecond, setShowWindowBGSecond] = useState(false);
    const [showChatWin, setShowChatWin] = useState(false);
    const [showChatSettingsWin, setShowChatSettingsWin] = useState(false);
    const [messageFilesLoaded, setMessageFilesLoaded] = useState(false);
    const [selectedChat, setSelectedChat] = useState(0);
    const [sendingMsg, setSendingMsg] = useState('');
    const [user, setUser] = useState(0);
    const [chatUsersList, setChatUsersList] = useState([]);
    const [sendingMsgFiles, setSendingMsgFiles] = useState([]);
    const [chatUsersLoaded, setChatUsersLoaded] = useState(false);
    const [chatUsersAddErr, setChatUsersArrErr] = useState(false);
    const [addChatData, setAddChatData] = useState({
        added: false,
        chatTitle: ''
    });
    const noImage = 'https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'

    const msgSend = async () => {
        try {  
            const textInput = document.getElementById('sendingMsgInput');
            textInput.value = '';
            console.log('sendingMsg:' + sendingMsg);
            console.log('selectedChat:' + selectedChat);
            console.log('sendingMsgFiles:' + sendingMsgFiles);
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
                    file_link: sendingMsgFiles,
                })
            });
            if (response.ok) {
                LoadChatMessages(selectedChat);
                setSendingMsgFiles([]);
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
            setMessageFilesLoaded(true);
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
        setSelectedChat(i - 1);
    }

    useEffect(() => {
        LoadChats();
    }, []);

    const showBG = () => {
        setShowWindowBG(false);
        setShowChatWin(false);
        setShowChatSettingsWin(false);
        setChatUsersLoaded(false);
        setAddChatData({ added: false, chatTitle: '' });
    }

    const showChatWinFunc = () => {
        setShowWindowBG(!showWindowBG);
        setShowChatWin(!showChatWin);
        setAddChatData({ added: false, chatTitle: '' });
    }

    const showChatSettingsWinFunc = () => {
        setShowWindowBG(!showWindowBG);
        loadChatUsers();
        setShowChatSettingsWin(!showChatSettingsWin);
    }

    const chatAdd = async () => {
        try {  
            const response = await fetch("http://localhost:3000/js-service/sanya/chatcreate", {
                method: 'POST',
                credentials: 'include',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: addChatData.chatTitle
                })
            });
            if (response.ok) {
                LoadChats();
                console.log('Чат создан')
            }
        } catch (error) {
            // console.error("Ошибка:", error);
        }
    }

    const loadChatUsers = async () => {
        try {  
            const response = await fetch(`http://localhost:3000/js-service/sanya/chatusers/${selectedChat}`, {
                method: 'GET',
                credentials: 'include',
                withCredentials: true,
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                setChatUsersList(responseData);
                setChatUsersLoaded(true);
            }
        } catch (error) {
            // console.error("Ошибка:", error);
        }
    }

    const addChatUser = async () => {
        const addUserInput = document.getElementById('addUserInput');
        if (addUserInput.value.length >= 1) {
            try {  
                const response = await fetch("http://localhost:3000/js-service/sanya/chatadduser", {
                    method: 'POST',
                    credentials: 'include',
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: addUserInput.value,
                        chat_id: selectedChat
                    })
                });
                if (response.ok) {
                    loadChatUsers();
                    console.log('Участник добавлен создан');
                    addUserInput.value = '';
                    const AddUserSuccessMsg = document.getElementById('AddUserSuccessMsg');
                    // AddUserSuccessMsg.style.visibility = "visible";
                    // AddUserSuccessMsg.style.color = "white";
                } else {
                    const AddUserErrMsg = document.getElementById('AddUserErrMsg');
                    AddUserErrMsg.style.visibility = "visible";
                    setTimeout(() => {
                        AddUserErrMsg.style.visibility = "hidden";
                    }, 2000);
                }
            } catch (error) {
                console.error("Ошибка:", error);
            }
        } else {
            addUserInput.parentElement.classList.add('err');
            setTimeout(() => {
                addUserInput.parentElement.classList.remove('err');
            }, 1000);
        }
    }

    const addFileToServerAndArr = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await fetch('http://localhost:3000/rest-api-service/upload', {
                method: 'POST',
                body: formData,
                credentials: 'include',  // если нужно отправлять куки или другие креды
            });
    
            const fileUrl = await response.json();  // сервер возвращает ссылку на загруженный файл
            setSendingMsgFiles([ ...sendingMsgFiles, fileUrl.file_url ]);
            console.log(sendingMsgFiles);
          } catch (error) {
              console.error('Ошибка загрузки файла:', error);
          }
      };

    const uploadFile = () => {
        if (sendingMsgFiles.length < 5) {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';

            fileInput.addEventListener('change', (event) => addFileToServerAndArr(event));
            document.body.appendChild(fileInput);
            fileInput.click();

            fileInput.addEventListener('click', () => {
            setTimeout(() => {
                fileInput.remove();
            }, 100);
            });
        } else {
            const FileError = document.getElementById('FileError');
            FileError.style.visibility = "visible";
            setTimeout(() => {
                FileError.style.visibility = "hidden"
            }, 2000);
        }
    }

  return (
    <>
        {showWindowBG && <WindowBG hide={showBG}/>}
        {showWindowBGSecond && <WindowBG hide={showBGSecond}/>}
        {showChatWin &&
        <div id="addChatPane">
            <div id="chatTtlAndClose">
                <h2>Добавление чата</h2>
                <button onClick={showBG}>X</button>
            </div>
            <div id="addChatPaneForm" action="">
                <h3 id="AddChatErr" className='AddErr'>Введите заголовок</h3>
                <input id="chatTitleInput" type="text" placeholder='Введите название чата' onChange={(e)=>setAddChatData({ ...addChatData, chatTitle: e.target.value})}/>
                <button onClick={()=>{
                    if (addChatData.chatTitle.length > 0) {
                        showChatWinFunc();
                        setAddChatData({ ...addChatData, added: true});
                        chatAdd();
                    } else {
                        const AddChatErr = document.getElementById('AddChatErr');
                        AddChatErr.style.visibility = "visible"
                        const chatTitleInput = document.getElementById('chatTitleInput');
                        chatTitleInput.classList.add('err');
                        setTimeout(() => {
                            AddChatErr.style.visibility = "hidden"
                            chatTitleInput.classList.remove('err');
                        }, 1000);
                    }
                }}>
                    Добавить чат
                </button>
            </div>
        </div>
        }
        {showChatSettingsWin &&
        <div id="ChatSettingsPane">
            <div id="chatSettingsTtlAndClose">
                <h2>Настройки чата</h2>
                <button onClick={showBG}>X</button>
            </div>
            <div id="Settings">
                <h2>Участники</h2>
                <div id="UserList">
                    {chatUsersLoaded && chatUsersList.length >= 1 &&
                        chatUsersList.map((user, i)=>{
                            return (
                                <div className="chatUser">
                                    <img src={user.ProfilePicLink || noImage} alt="" />
                                    <h3>{user.FirstName} {user.LastName}</h3>
                                </div>
                            )
                        })
                    }
                    <h3 id="AddUserErrMsg" className='AddErr'>Пользователь уже в чате</h3>
                    {/* <h3 id="AddUserSuccessMsg" className='AddErr'>Пользователь добавлен!</h3> */}
                    <div id="addChatUserPane">
                        <input id="addUserInput" type="text" placeholder='Введите id сотрудника'/>
                        <button onClick={addChatUser}><img src={plusIcon} alt="" /></button>
                    </div>
                </div>
            </div>
        </div>
        }
        <div id="messages">
            <div id="chatListPane">
                <div id="inputDiv">
                    <button onClick={showChatWinFunc}><img src={plusIcon} alt="" /></button>
                    <input type="text" placeholder='Поиск' />
                    <button><img src={searchIcon} alt="" /></button>
                </div>
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
                    <h1>{selectedChat !== 0 && chats.find(chat => chat.chat_id === selectedChat)?.title || 'Выберите чат'}</h1>
                    {chatLoaded && 
                    <div id="chatInfoBtns">
                        <button onClick={showChatSettingsWinFunc}><img src={settingsIcon} alt="" /> </button>
                    </div>}
                </div>
                {chatLoaded && 
                <>
                    <div id="messagesList">
                        {messages.map((message, i)=>{
                            const msgFiles = message.files ? (message.files).split(',') : [];
                            return (
                                <div 
                                    key={message.id} 
                                    className={`message ${user == message.sender_id ? 'self' : ''}`}
                                >
                                    {user != message.sender_id &&
                                    <>
                                        <img src={message.ProfilePicLink || noImage} alt="" />
                                        <h4 className="messageAuthor">{message.FirstName} {message.LastName}</h4>
                                    </>
                                    }
                                    {/* {console.log('message:' + message)}
                                    {console.log('user:' + user)}
                                    {console.log('-------')} */}
                                    <span>{message.msg}</span>
                                    <h6>{message.msg_date}</h6>
                                    {message.files && typeof message.files === 'string' && messageFilesLoaded && (
                                    <div className="msgFiles">
                                        {msgFiles.map((fileUrl, i) => (
                                            <img src={fileUrl} alt="" key={i} />
                                        ))}
                                    </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <div id="sendingPane">
                        {/* <div id="inputdiv"> */}
                        {sendingMsgFiles.length >= 1 &&
                        <div id="sendingFiles">
                            <h3>Файлы сообщения: <span id="FileError">Нельзя добавлять больше 5 фотографий</span></h3>
                            <div id="images">
                            {sendingMsgFiles.map((fileUrl, i)=> {
                                return (
                                    <img src={fileUrl} alt="" />
                                )
                            })}
                            </div>
                        </div>
                        }
                        <textarea id="sendingMsgInput" type="text" placeholder='Введите сообщение' onChange={(e)=>{setSendingMsg(prev => e.target.value)}}/>
                        {/* </div> */}
                        <div id="sendingBtns">
                            <button onClick={uploadFile}><img src={fileIcon} alt="" /> </button>
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
