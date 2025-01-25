import { useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

import './Messages.css';

// import UserCard from '../Cards/UserCard.jsx';
// import UserAdminPane from '../Cards/UserAdminPane.jsx';
import WindowBG from '../Windows/WindowBackground.jsx';

import fileIcon from '../../assets/FileIcon.svg';
import sendIcon from '../../assets/SendIcon.svg';
import settingsIcon from '../../assets/SettingsIcon.svg';
import plusIcon from '../../assets/PlusIcon.svg';
import searchIcon from '../../assets/SearchIcon.svg';
import trashIcon from '../../assets/TrashIcon.svg';
import saveIcon from '../../assets/SaveIcon.svg';
import closeIcon from '../../assets/CloseIcon.svg';

function Messages({ userInfo }) {
    const [chats, setChats] = useState([]);
    const [chatsLoaded, setChatsLoaded] = useState(false);
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [chatLoaded, setChatLoaded] = useState(false);
    const [showWindowBG, setShowWindowBG] = useState(false);
    const [showWindowBGSecond, setShowWindowBGSecond] = useState(false);
    const [showChatWin, setShowChatWin] = useState(false);
    const [showChatSettingsWin, setShowChatSettingsWin] = useState(false);
    const [messageFilesLoaded, setMessageFilesLoaded] = useState(false);
    const [selectedChatData, setSelectedChatData] = useState(false);
    const [selectedChat, setSelectedChat] = useState(0);
    const [selectedChatI, setSelectedChatI] = useState(0);
    const [sendingMsg, setSendingMsg] = useState('');
    const messagesRef = useRef(null);
    const [user, setUser] = useState(0);
    const { chatid } = useParams();
    const [chatUsersList, setChatUsersList] = useState([]);
    const [sendingMsgFiles, setSendingMsgFiles] = useState([]);
    const [users, setUsers] = useState([]);
    const [chatUsersLoaded, setChatUsersLoaded] = useState(false);
    const [isUsersLoaded, setIsUsersLoaded] = useState(false);
    const [chatUsersAddErr, setChatUsersArrErr] = useState(false);
    const [filteredChats, setFilteredChats] = useState([]);
    const [isFilters, setIsFilters] = useState(false);
    const [chatTitle, setChatTitle] = useState('Выберите чат');
    const [searchTitle, setSearchTitle] = useState("");
    const [addChatData, setAddChatData] = useState({
        added: false,
        chatTitle: ''
    });
    const noImage = 'https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg';
    
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

    const LoadChats = async () => {
        // console.log(userInfo);
        try {  
            const response = await fetch("http://localhost:3000/js-service/sanya/chats", {
                method: 'GET',
                credentials: 'include',
                withCredentials: true,
            });
        
            const responseData = await response.json();

            if (response.ok) {
                setChats(responseData);
                setChatsLoaded(true);

                console.log(responseData);
            }
        } catch (error) {
            // console.error("Ошибка:", error);
        }
    }

    const LoadChatMessages = async (chatid, title) => {
        try {  
            // setSelectedChat(chatid);
            // Сохраняем в состоянии
            if (!chatLoaded) {
                setChatTitle(title);
                setSelectedChatData(chats.find(chat => chat.chat_id === selectedChat));
                setSelectedChat(chatid);
            }
            // const chat = chats.find(chat => chat.chat_id === chatid); // Используем напрямую переданный chatid
            // setSelectedChatData(chat);
            // if (chat?.title) {
            //     setChatTitle(chat.title);
            // } else {
            //     setChatTitle(chat?.participants);
            // }
            console.log(chats.find(chat => chat.chat_id === selectedChat))
            const response = await fetch(`http://localhost:3000/js-service/sanya/chatmsgs/${chatid}`, {
                method: 'GET',
                credentials: 'include',
                withCredentials: true,
            });
        
            if (response.ok) {
                const responseData = (await response.json());
                const messagesData = responseData.rs;
                console.log(messagesData);
                setUser(responseData.user_id);
                console.log(responseData.user_id);
                setChatLoaded(true);
                setMessages(messagesData);
                setMessageFilesLoaded(true);
                console.log(messagesData);
            } else {
                navigate('/messages');
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    }

    useEffect(()=>{
        if (selectedChatData) {
            console.log(selectedChatData);
            if (selectedChatData.title) {
                setChatTitle(selectedChatData.title);
            } else {
                setChatTitle(selectedChatData.participants);
            }
        }
    }, [selectedChatData, chatLoaded, selectedChat])

    // const selectChatFunc = (i) => {
    //     const chatCards = Array.from(document.getElementsByClassName('chatCard'));
    //     chatCards.forEach((el)=>{
    //         el.classList.remove('selectedChat');
    //     });
    //     console.log('selecting chat: ' + 'chatCard' + i)
    //     const selectedChat = document.getElementById('chatCard' + i);
    //     selectedChat.classList.add('selectedChat');
    //     // setSelectedChat(i - 1);
    // }

    useEffect(() => {
        LoadChats();
        console.log(userInfo);
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

    useEffect(() => {
        const messagesContainer = messagesRef.current;
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }, [messages]);

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
        const addUserInput = document.getElementById('addChatUserSelect');
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

    const delChatUser = async (userId) => {
        if (confirm('Вы точно хотите удалить пользователя из чата?')) {
            try {  
                const response = await fetch("http://localhost:3000/js-service/sanya/chatdeluser", {
                    method: 'DELETE',
                    credentials: 'include',
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        chat_id: selectedChat
                    })
                });
                if (response.ok) {
                    loadChatUsers();
                    console.log('Участник удалён');
                    addUserInput.value = '';
                } else {
                    console.log('Ошибка')
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

    const delChat = async () => {
        if (confirm('Вы точно хотите удалить чат?')) {
            try {  
                const response = await fetch("http://localhost:3000/js-service/sanya/chatdelete", {
                    method: 'DELETE',
                    credentials: 'include',
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: selectedChat
                    })
                });
                if (response.ok) {
                    LoadChats();
                    setMessages([])
                    setChatLoaded(false);
                    setSelectedChat(0);
                    showChatSettingsWinFunc();
                    console.log('Чат удалён');
                    addUserInput.value = '';
                } else {
                    console.log('Ошибка')
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

    const changeChatTitle = async () => {
        try {
            const newTitle = document.getElementById('changeTtlInput').value;
            const response = await fetch('http://localhost:3000/js-service/sanya/chatupdate', {
                method: 'PATCH',
                credentials: 'include',
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                body: JSON.stringify({
                    title: newTitle,
                    chat_id: selectedChat,
                }),
                credentials: 'include',  // если нужно отправлять куки или другие креды
            });
    
            const responseData = await response.json(); 
            console.log(responseData);
            LoadChats();
          } catch (error) {
              console.error('Ошибка смены названия:', error);
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

    useEffect(() => {
        const filtered = chats.filter(chat => {
            let title;
            if (chat.title) {
                title = chat.title
            } else {
                title = chat.participants
            }
            return (
                (searchTitle ? 
                    (title.toLocaleLowerCase()).includes(searchTitle.toLocaleLowerCase()) 
                : true)
            );
        });
        setFilteredChats(filtered);
        setIsFilters(true);
        console.log(filteredChats);
    }, [searchTitle, chats]); 

    // const convertTextToLinks = (text) => {
    //     const urlRegex = /(https?:\/\/[^\s]+)/g;
    //     return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
    // };

    const processTextToLinks = (text) => {
        // Регулярное выражение для поиска URL
        const urlRegex = /(\b(?:http?:\/\/)?(?:https?:\/\/)?(?:www\.)?[\w-]+\.[\w./?=#&%-]+)/gi; // доделать для локалхоста и др.
    
        return text.replace(urlRegex, (url) => {
            // Проверяем, есть ли протокол; если нет, добавляем "https://"
            const href = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
            // Очищаем URL от потенциально вредоносных данных
            const safeHref = DOMPurify.sanitize(href);
            return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">${safeHref}</a>`;
        });
    }

    useEffect(() => {
        if (chatid) {
            LoadChatMessages(chatid);
        }
    }, [chatid]);    

    useEffect(() => {
        if (chatid && chatsLoaded) {
            const selectedChat = chats.find(chat => chat.chat_id === parseInt(chatid, 10));
            if (selectedChat) {
                setSelectedChatData(selectedChat);
                setChatTitle(selectedChat.title || selectedChat.participants || 'Чат без названия');
            }
        }
    }, [chatid, chatsLoaded, chats]); // Добавьте зависимости для корректного срабатывания
    

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
                {selectedChatData && userInfo.id == selectedChatData.author_id &&
                <>
                    <div id="updTtlDiv">
                        <input type="text" name="" id="changeTtlInput" defaultValue={selectedChatData.title}/>
                        <button onClick={()=>{changeChatTitle()}}>
                            <img src={saveIcon} alt="" />
                        </button>
                    </div>
                    <button id="chatDel" onClick={()=>{delChat()}}>
                        <img src={trashIcon} alt="" />
                        <span>Удалить чат</span>
                    </button>
                </>
                }
                {/* <h2>{userInfo.id}</h2> */}
                {/* <h2>{selectedChatData.author_id}</h2> */}
                <h2>Участники: {chatUsersList.length}</h2>
                <div id="UserList">
                    {chatUsersLoaded && chatUsersList.length >= 1 &&
                        chatUsersList.map((user, i)=>{
                            return (
                                <div className="chatUser">
                                    <div className="chatUserInfo">
                                        <NavLink to={`/employee/${user.user_id}`}>
                                            <img src={user.ProfilePicLink || noImage} alt="" />
                                        </NavLink>
                                        <NavLink to={`/employee/${user.user_id}`}>
                                            <h3>{user.FirstName} {user.LastName}</h3>
                                        </NavLink>
                                    </div>
                                    {user.user_id != userInfo.id && userInfo.id == selectedChatData.author_id &&
                                    <button onClick={()=>{delChatUser(user.user_id)}}>
                                        <img src={closeIcon} alt="" />
                                    </button>
                                    }
                                </div>
                            )
                        })
                    }
                    <h3 id="AddUserErrMsg" className='AddErr'>Пользователь уже в чате</h3>
                    {/* <h3 id="AddUserSuccessMsg" className='AddErr'>Пользователь добавлен!</h3> */}
                    <div id="addChatUserPane">
                        {/* <input id="addUserInput" type="text" placeholder='Введите id сотрудника'/> */}
                        <select name="" id="addChatUserSelect" onChange={(e)=>setAddChatData(e.target.value)}>
                            {isUsersLoaded && users &&
                            users.map((user, i)=> {
                                return (
                                    <option value={user.id}>{user.last_name} {user.first_name}</option>
                                )
                            })}
                        </select>
                        <button onClick={addChatUser}><img src={plusIcon} alt="" /></button>
                    </div>
                </div>
            </div>
        </div>
        }
        <div id="messages">
            <div id="chatListPane" className={!selectedChat ? "visible" : 'hidden' }>
                <div id="inputDiv">
                    <button onClick={showChatWinFunc}><img src={plusIcon} alt="" /></button>
                    <input type="text" placeholder='Поиск' onChange={(e)=>setSearchTitle(prev => e.target.value)}/>
                    <button><img src={searchIcon} alt="" /></button>
                </div>
                <div id="chatList">
                    {/* {chats && !isFilters &&
                    chats.map((chat, i)=>{
                        // console.log(user);
                        return (
                            <div key={chat.chat_id} 
                            className='chatCard' 
                            id={'chatCard' + i} 
                            onClick={()=>{
                                LoadChatMessages(chat.chat_id); 
                                selectChatFunc(i); 
                                console.log('выбран чат с i ' + i);
                                setSelectedChat(chat.chat_id);
                                setSelectedChatI(i - 1)}}>
                                <h1 title={chat.title || chat.participants}>
                                    {chat.title || chat.participants} sdgsd
                                </h1>
                            </div>
                        )
                    })} */}
                    {filteredChats && isFilters &&
                    filteredChats.map((chat, i)=>{
                        // console.log(user);
                        return (
                            <NavLink
                                to={`/messages/${chat.chat_id}`}
                                title={chat.title || chat.participants}
                                key={chat.chat_id}
                                className={({ isActive }) => 
                                    `chatCard ${isActive ? 'selectedChat' : ''}`}
                                id={`chatCard-${chat.chat_id}`}
                                onClick={() => {
                                    LoadChatMessages(chat.chat_id, chat.title);
                                }}
                            >
                                <h1>{chat.title || chat.participants}</h1>
                            </NavLink>
                        )
                    })}
                </div>
            </div>
            <div id="chatPane" className={selectedChat ? "visible" : 'hidden' }>
                <div id="chatInfo">
                    <button id="closeChatIcon"
                    onClick={()=>{
                        setSelectedChat(null); 
                        setMessages([]); 
                        setChatLoaded(false); 
                        setChatTitle('Выберите чат');
                        setSelectedChatData(null);
                    }}>
                        <img src={closeIcon} alt="" />
                    </button>
                    <h1>
                    {chatTitle}
                    </h1>
                    {chatLoaded && 
                    <div id="chatInfoBtns">
                        {selectedChatData && !selectedChatData.private && <button onClick={()=>{LoadUsers(); showChatSettingsWinFunc(); }}><img src={settingsIcon} alt="" /> </button>}
                    </div>
                    }
                </div>
                {chatLoaded && 
                <>
                    <div id="messagesList" ref={messagesRef}>
                        {messages.map((message, i)=>{
                            const msgFiles = message.files ? (message.files).split(',') : [];
                            return (
                                <div 
                                    key={message.id} 
                                    className={`message ${user == message.sender_id ? 'self' : ''}`}
                                >
                                    {user != message.sender_id &&
                                    <>
                                        <NavLink to={`/employee/${message.sender_id}`} className="messageAuthorPic">
                                            <img src={message.ProfilePicLink || noImage} alt="" />
                                        </NavLink>
                                        
                                        <h4>
                                            <NavLink to={`/employee/${message.sender_id}`} className="messageAuthor">
                                                {message.FirstName} {message.LastName}
                                            </NavLink>
                                        </h4>
                                    </>
                                    }
                                    {/* {console.log('message:' + message)}
                                    {console.log('user:' + user)}
                                    {console.log('-------')} */}
                                    {/* <span>{message.msg}</span> */}
                                    <span dangerouslySetInnerHTML={{ __html: processTextToLinks(message.msg) }} />
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
                            <button onClick={()=>{msgSend();}} disabled={!sendingMsg && !(sendingMsgFiles.length >= 1)}><img src={sendIcon} alt="" /> </button>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    </>
  )
}

export default Messages
