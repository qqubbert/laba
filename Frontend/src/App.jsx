import { useState, useEffect } from 'react'
import Auth from './Auth.jsx';
import Header from './Header.jsx';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';

function App() {
  const [logged, setLogged] = useState(undefined);
  const [firstLogin, setFirstLogin] = useState(true);

  const AuthTry = async () => {
    try {  
      const response = await fetch("http://localhost:3000/js-service/protected", {
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
    const response = await fetch("http://localhost:3000/js-service/cookieclear", {
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
      <Header logout={ async () => { await cookieClear(); setLogged(false);}}/>}
    </>
  )
}

export default App
