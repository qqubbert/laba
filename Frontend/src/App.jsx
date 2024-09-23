import { useState, useEffect } from 'react'
import Auth from './Auth.jsx';
import Header from './Header.jsx';
import NewArticle from './NewArticle.jsx';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';

function App() {
  const [logged, setLogged] = useState(undefined);
  const [firstLogin, setFirstLogin] = useState(true);
  const [showArticleEditor, setShowArticleEditor] = useState(false);

  const AuthTry = async () => {
    try {  
      const response = await fetch("http://localhost:3000/auth-service/protected", {
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
    const response = await fetch("http://localhost:3000/auth-service/cookieclear", {
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
      <Header showArticleEditor={(hide) => { !hide? setShowArticleEditor(!showArticleEditor) : setShowArticleEditor(false) }} logout={ async () => { await cookieClear(); setLogged(false); setShowArticleEditor(false);}}/>}

      {showArticleEditor && 
      <NewArticle hideArticleEditor={()=>{ setShowArticleEditor(false) }}/>}
    </>
  )
}

export default App
