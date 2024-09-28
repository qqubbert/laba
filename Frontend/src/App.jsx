import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom';

import Auth from './modules/Auth.jsx';
import Header from './modules/Header.jsx';
import NewArticle from './modules/Pages/NewArticle.jsx';
import Admin from './modules/Pages/Admin.jsx';

function App() {
  const [logged, setLogged] = useState(undefined);
  const [selectedPage, setSelectedPage] = useState('none');
  const [firstLogin, setFirstLogin] = useState(true);
  const [showArticleEditor, setShowArticleEditor] = useState(false);
  const [usrInf, setUsrInf] = useState({});
  const [usrId, setUsrId] = useState();
  const [permission, setPermission] = useState('user');

  const AuthTry = async () => {
    try {  
      const response = await fetch("http://localhost:3000/js-service/auth/protected", {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
      });
  
      const responseData = await response.json();
  
      if (responseData.access) {
        setLogged(true);
      } else {
        setLogged(false);
      }

      try {
        const response = await fetch("http://localhost:3000/js-service/auth/cookiecheck", {
          method: 'GET',
          credentials: 'include',
          withCredentials: true,
        });
  
        const responseData = await response.json();
        setUsrId(responseData.userid);
        setPermission(responseData.permission);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }

  const cookieClear = async () => {
    const response = await fetch("http://localhost:3000/js-service/auth/cookieclear", {
      method: 'GET',
      credentials: 'include',
      withCredentials: true,
    });
  }

  const loadUsrInfo = async (usrId) => {
    console.log(usrId);
    try {  
        const response = await fetch(`http://localhost:3000/rest-api-service/users/${usrId}`, {
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
  }, []);

  useEffect(() => {
    console.log(usrId);
    loadUsrInfo(usrId);
  }, [usrId]);

  return (
    <Router>
      <>
        {(logged == false) && 
        <Auth permission={(permission)=>{setPermission(permission); console.log(permission)}} userId={(userId)=>{setUsrId(userId)}} logged={()=>{{setLogged(true); }}}/>}

        {(logged == true) &&
        <Header permission={permission} userInfo={usrInf} showArticleEditor={(hide) => { !hide? setShowArticleEditor(!showArticleEditor) : setShowArticleEditor(false) }} logout={ async () => { await cookieClear(); setLogged(false); setShowArticleEditor(false); setSelectedPage('none');}} selectedFunc={(selectedId)=>{setSelectedPage(selectedId)}}/>}

        <Routes>
            <Route path="/admin" element={permission == "admin" ? <Admin /> : <Navigate to="/" replace />  } />
            <Route path="/newarticle" element={<NewArticle/>} />
        </Routes>
        {/* {selectedPage == 'article' &&
          <Articles />
        } */}

        {/* {selectedPage == 'messages' &&
          <Messages />
        } */}

        {/* {selectedPage == 'department' &&
          <Department />
        } */}
      </>
    </Router>
  )
}

export default App
