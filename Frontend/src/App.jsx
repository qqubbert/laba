import { useState } from 'react'
import Auth from './Auth.jsx';
import Header from './Header.jsx';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';

function App() {
  const [logged, setLogged] = useState(false);

  return (
    <>
      {!logged && 
      <Auth logged={()=>{{setLogged(true); console.log('logged')}}}/>}

      {logged &&
      <Header />}
    </>
  )
}

export default App
