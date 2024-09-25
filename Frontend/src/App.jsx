import { useState, useEffect } from 'react';

import Auth from './modules/Auth.jsx';
import Header from './modules/Header.jsx';
import NewArticle from './modules/Pages/NewArticle.jsx';
import Admin from './modules/Pages/Admin.jsx';

function App() {
  const [logged, setLogged] = useState(undefined);
  const [selectedPage, setSelectedPage] = useState('none');
  const [firstLogin, setFirstLogin] = useState(true);
  const [showArticleEditor, setShowArticleEditor] = useState(false);

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
    } catch (error) {
      // console.error("Ошибка:", error);
    }
  }

  const cookieClear = async () => {
    const response = await fetch("http://localhost:3000/js-service/auth/cookieclear", {
      method: 'POST',
      credentials: 'include',
      withCredentials: true,
    });
  }

  useEffect(() => {
    if (firstLogin) {
      AuthTry();
    }
  }, []);

  return (
    <>
      {(logged == false) && 
      <Auth logged={()=>{{setLogged(true); }}}/>}

      {(logged == true) &&
      <Header showArticleEditor={(hide) => { !hide? setShowArticleEditor(!showArticleEditor) : setShowArticleEditor(false) }} logout={ async () => { await cookieClear(); setLogged(false); setShowArticleEditor(false);}} selectedFunc={(selectedId)=>{setSelectedPage(selectedId); console.log(selectedId)}}/>}

        {selectedPage == 'admin' &&
        <Admin />}

      {showArticleEditor && 
      <NewArticle hideArticleEditor={()=>{ setShowArticleEditor(false) }}/>}
    </>
  )
}

export default App
