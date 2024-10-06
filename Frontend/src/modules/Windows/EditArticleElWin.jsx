import { useState } from 'react';

import saveIcon from '../../assets/SaveIcon.svg';
import closeIcon from '../../assets/CloseIcon.svg';

import './EditArticleElWin.css';

function EditArticleElWin({ hide, save }) {
  const [newArticleData, setNewArticleData] = useState({
    articleTtl: '',
    publish: true,
    bio: false,
    chemistry: false,
    physics: false,
    it: false
  });

  const toggleBio = () => setNewArticleData({...newArticleData, bio: !newArticleData.bio});
  const toggleChemistry = () => setNewArticleData({...newArticleData, bio: !newArticleData.chemistry});
  const togglePhysics = () => setNewArticleData({...newArticleData, bio: !newArticleData.physics});
  const toggleIt = () => setNewArticleData({...newArticleData, bio: !newArticleData.it});
  const togglePublish = () => setNewArticleData({...newArticleData, bio: !newArticleData.publish});
  const toggleTtl = (ttl) => setNewArticleData({...newArticleData, articleTtl: ttl});
  const checkSave = () => {
    const ttlInput = document.getElementById('newArticleTtl');
    if (newArticleData.articleTtl == '') {
      ttlInput.classList.add('err');
      setTimeout(() => {
        ttlInput.classList.remove('err');
      }, 1000);
    } else {
      save(newArticleData);
    }
  }

  return (
    <div id="EditArticleElWin">
      <div id="saveWinHead">
        <h1>Публикация статьи</h1>
        <button onClick={hide}><img src={closeIcon} alt="" /> </button>
      </div>
      <div id="form">
        <input id="newArticleTtl" type="text" placeholder='Название статьи' onChange={(e)=>{toggleTtl(e.target.value)}}/>
        <div id="saveTags">
          <label id="BiologyCheck" htmlFor="" onClick={toggleBio}>
            <input type="checkbox" checked={newArticleData.bio} onChange={toggleBio}/>
            Биология
          </label>
          <label id="ChemistryCheck" htmlFor="" onClick={toggleChemistry}>
            <input type="checkbox" checked={newArticleData.chemistry} onChange={toggleChemistry}/>
            Химия
          </label>
          <label id="PhysicsCheck" htmlFor="" onClick={togglePhysics}>
            <input type="checkbox" checked={newArticleData.physics} onChange={togglePhysics}/>
            Физика
          </label>
          <label id="itCheck" htmlFor="" onClick={toggleIt}>
            <input type="checkbox" checked={newArticleData.it} onChange={toggleIt}/>
            IT
          </label>
        </div>
        <div id="EditArticleElWinBtns">
          <label id="publishCheck" htmlFor="" onClick={togglePublish}>
            <input type="checkbox" checked={newArticleData.publish} onChange={togglePublish}/>
            Опубликовать статью?
          </label>
          <button onClick={()=>checkSave()}>
            <img src={saveIcon} alt="" /> 
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditArticleElWin;
