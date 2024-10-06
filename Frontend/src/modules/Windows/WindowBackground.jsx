import { useState } from 'react'
import './WindowBackground.css';

function WindowBG({ hide }) {

  return (
    <>
        <div id="winBackground" onClick={()=>{hide()}}></div>
    </>
  )
}

export default WindowBG
