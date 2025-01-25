  import { useState, useEffect } from 'react';
  import { BrowserRouter as Router, Route, Routes, NavLink, Navigate, useNavigate } from 'react-router-dom';

  import Auth from './modules/Auth.jsx';
  import Header from './modules/Header.jsx';
  import NewArticle from './modules/Pages/NewArticle.jsx';
  import Messages from './modules/Pages/Messages.jsx';
  import Admin from './modules/Pages/Admin.jsx';
  import Articles from './modules/Pages/Articles.jsx';
  import Tasks from './modules/Pages/Tasks.jsx';
  import SelectedArticle from './modules/Cards/SelectedArticle.jsx';

  function App() {
    const [logged, setLogged] = useState(undefined);
    const [selectedPage, setSelectedPage] = useState('none');
    const [firstLogin, setFirstLogin] = useState(true);
    const [showArticleEditor, setShowArticleEditor] = useState(false);
    const [usrInf, setUsrInf] = useState({});
    const [usrId, setUsrId] = useState();
    const [showHint, setShowHint] = useState(false);
    const [permission, setPermission] = useState('user');
    const navigate = useNavigate();

    const AuthTry = async () => {
      try {
        const response = await fetch("http://localhost:3000/js-service/auth/protected", {
          method: 'POST',
          credentials: 'include',
        });
    
        const responseData = await response.json();
    
        console.log(responseData);
    
        if (response.status === 401 || !responseData.access) {
          setLogged(false);
          navigate('/login'); // Перенаправление на страницу логина
          return;
        }
    
        setLogged(true);
        // navigate('/articles');
    
        const userResponse = await fetch("http://localhost:3000/js-service/auth/cookiecheck", {
          method: 'GET',
          credentials: 'include',
        });
    
        const userData = await userResponse.json();
        setUsrId(userData.userid);
        setPermission(userData.permission);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };    

    const cookieClear = async () => {
      const response = await fetch("http://localhost:3000/js-service/auth/cookieclear", {
        method: 'GET',
        credentials: 'include',
        withCredentials: true,
      });
    }

    const loadUsrInfo = async () => {
      // console.log(usrId);
      try {  
          const response = await fetch(`http://localhost:3000/rest-api-service/self`, {
          method: 'GET',
          credentials: 'include',
          withCredentials: true,
          });
      
          const userData = await response.json();

          setUsrInf(userData);

          console.log(userData);
      } catch (error) {
          console.error("Ошибка:", error);
      }
    }

    useEffect(() => {
      if (firstLogin) {
        AuthTry();
      }
      const root = document.getElementById('root');
      root.classList.add(localStorage.getItem('theme') || 'dark');
    }, []);

    useEffect(() => {
      if (logged === undefined) {
        AuthTry();
      }
    }, [logged]);    

    useEffect(() => {
      if (logged) {
        console.log(usrId);
        loadUsrInfo(usrId);
      }
    }, [usrId]);

    return (
      // <Router>
        <>
          {/* {(logged == false) && 
          <Auth permission={(permission)=>{setPermission(permission); console.log(permission)}} userId={(userId)=>{setUsrId(userId)}} logged={()=>{{setLogged(true); }}}
          />} */}

          {(logged == true) &&
          <Header permission={permission} userInfo={usrInf} 
          showArticleEditor={(hide) => { !hide? setShowArticleEditor(!showArticleEditor) : setShowArticleEditor(false) }} 
          logout={ async () => { navigate("/login", { replace: true }); await cookieClear(); setLogged(false); setShowArticleEditor(false); setSelectedPage('none'); }} 
          selectedFunc={(selectedId)=>{setSelectedPage(selectedId)}}
          />}

          <Routes>
            <Route path="/login" element={!logged && 
            <Auth 
              permission={(permission) => { setPermission(permission); console.log(permission); }} 
              userId={(userId) => { setUsrId(userId);}} 
              logged={() => { loadUsrInfo(); setLogged(true); navigate('/articles')}} 
            />} />
            <Route path="/" element={<Navigate to="/articles" replace />} />
            <Route path="/employee" element={<Admin permission={permission} userInfo={usrInf}/>}>
              <Route path=":userid" element={<SelectedArticle />} />
            </Route>
            <Route path="/newarticle" element={<NewArticle />} />
            <Route path="/messages" element={<Messages userInfo={usrInf}/>} >
              <Route path=":chatid" element={<></>} />
            </Route>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/articles" element={<Articles />}>
              <Route path=":articleId" element={<SelectedArticle />} />
            </Route>
            <Route path="*" element={<Navigate to="/articles" replace />} />
          </Routes>

        </>
      // </Router>
    )
  }

  export default App
