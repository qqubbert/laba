import { useState } from 'react'
import Auth from './Auth.jsx';
import Header from './Header.jsx';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';

function App() {
  const [logged, setLogged] = useState(false);

  const cookieClear = async () => {
    const response = await fetch("http://localhost:3000/js-service/cookieclear", {
      method: 'POST',
      credentials: 'include',
      withCredentials: true,
    });
  }

  return (
    <>
      {!logged && 
      <Auth logged={()=>{{setLogged(true); }}}/>}

      {logged &&
      <Header logout={ async () => { await cookieClear(); setLogged(false);}}/>}
    </>
  )
}

export default App
