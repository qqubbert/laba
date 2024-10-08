import { useEffect, useState } from 'react'
import { NavLink, useNavigate, Navigate, json } from 'react-router-dom';

import closeIcon from '../../assets/CloseIcon.svg';
import imageIcon from '../../assets/ImageIcon.svg';
import videoIcon from '../../assets/VideoIcon.svg';
import audioIcon from '../../assets/AudioIcon.svg';
import fileIcon from '../../assets/FileIcon.svg';
import paragraphIcon from '../../assets/ParagraphIcon.svg';
import headerIcon from '../../assets/HeaderIcon.svg';
import saveIcon from '../../assets/SaveIcon.svg';
import deleteIcon from '../../assets/TrashIcon.svg';
import editIcon from '../../assets/EditIcon.svg';

import WindowBG from '../Windows/WindowBackground.jsx';
import EditArticleElWin from '../Windows/EditArticleElWin.jsx';

import './NewArticle.css';

// import EditArticleElWin from './EditArticleElWin.jsx';

function NewArticle({ hideArticleEditor }) {
  const [empty, setEmpty] = useState(true);
  const [showSaveWin, setShowSaveWin] = useState(false);
  // const [fileType, setFileType] = useState(null);
  const [elCount, setElCount] = useState(0);
  const [edCount, setEdCount] = useState(0);
  const navigate = useNavigate();
  
  useEffect(()=>{
    if (elCount <= 0) {
      setEmpty(true);
    }
  }, [elCount]);

  function editElText(editBtn) {
    setEdCount(prevCount => prevCount + 1);
    let elToEdit = (editBtn.parentElement).parentElement;
    (editBtn.parentElement).remove();
  
    if (elToEdit.tagName === 'H1' || elToEdit.tagName === 'P') {
      let editArea = document.createElement('div');
      editArea.classList.add('editArea');
      let originalText = elToEdit.innerHTML;
  
      let textarea = document.createElement('textarea');
      textarea.classList.add("editArticleEditArea");
      textarea.placeholder = elToEdit.tagName === 'H1' ? "Введите текст заголовка" : "Введите текст параграфа";
      textarea.value = originalText === 'Введите текст заголовка' ? '' : originalText === 'Введите текст параграфа' ? '' : originalText;
      textarea.style.width = '100%';
      textarea.style.height = 'auto';

      editArea.appendChild(textarea);
  
      let saveBtn = document.createElement('button');
      let img = document.createElement('img');
      img.src = saveIcon;
      saveBtn.appendChild(img);
      saveBtn.classList.add('saveBtn');
  
      elToEdit.replaceWith(editArea);
  
      saveBtn.addEventListener('click', () => {
        let updatedText = textarea.value;
  
        let newElement = document.createElement(elToEdit.tagName.toLowerCase());
        if (updatedText == "") {
          updatedText = elToEdit.tagName === 'H1' ? "Введите текст заголовка" : "Введите текст параграфа";
        }
        newElement.innerHTML = updatedText;
  
        editBtnsAdd(newElement);
        editArea.replaceWith(newElement);
        saveBtn.remove();
        setEdCount(prevCount => prevCount - 1);
      });
  
      editArea.appendChild(saveBtn);
    }
  }  

  const uploadFile = async (event, fileType) => {
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

        // Создаем элемент для вставки в статью
        const newElement = document.createElement(fileType);
        newElement.src = fileUrl.file_url;
        if (fileType === 'video' || fileType === 'audio') {
            newElement.controls = true;
        }

        // Добавляем новый элемент в редактор
        const articleEditor = document.getElementById('ArticleEditor');
        const newElementParent = document.createElement('div');
        newElementParent.classList.add('mediaParent');
        const newElementDiv = document.createElement('div');
        newElementDiv.classList.add('mediaDiv');
        newElementDiv.appendChild(newElement);
        newElementParent.appendChild(newElementDiv);
        articleEditor.appendChild(newElementParent);

        setEmpty(false);
        setElCount(elCount => elCount + 1);
        editBtnsAdd(newElementParent); 
      } catch (error) {
          console.error('Ошибка загрузки файла:', error);
      }
  };

  function editDelete() {
    let editBtns = Array.from(document.getElementsByClassName('editBtns'));
    let editBtnsDiv = Array.from(document.getElementsByClassName('editBtnsDiv'));
    editBtns.forEach((el)=>{
      el.remove();
    });
    editBtnsDiv.forEach((el)=>{
      el.remove();
    });
  }

  function editBtnsAdd(el) {
    let editBtnsDiv = document.createElement('div');
    editBtnsDiv.classList.add('editBtnsDiv');

    if (el.tagName === 'H1' || el.tagName === 'P') {
      let editBtn = document.createElement('button');
      let editIco = document.createElement('img');
      editIco.src = editIcon;
      editBtn.addEventListener('click', ()=>{
        editElText(editBtn);
      })
      editIco.classList.add('editIcons');
      editBtn.appendChild(editIco);
      editBtn.classList.add('editBtns');
      editBtnsDiv.appendChild(editBtn);
    }

    let deleteBtn = document.createElement('button');
    let deleteIco = document.createElement('img');
    deleteIco.src = deleteIcon;

    deleteIco.classList.add('editIcons');

    deleteBtn.addEventListener('click', ()=>{
      (deleteBtn.parentElement).parentElement.remove();
      setElCount(elCount => elCount - 1);
      // console.log(elCount);
    })
    
    editBtnsDiv.appendChild(deleteBtn);
    deleteBtn.appendChild(deleteIco);
    deleteBtn.classList.add('editBtns');
    el.appendChild(editBtnsDiv);
  }

  async function saveToHtmlFile(data) {
    showSaveWinFunc();
    editDelete();  // Удаляем кнопки редактирования перед сохранением

    const articleEditor = document.getElementById('ArticleEditor');
    const content = articleEditor.innerHTML; 

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Generated Article</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
          * {
                margin: 0;

                font-family: "Roboto", sans-serif;

                color: white;
          }
          body {
              max-width: 100%;
              overflow-x: hidden;
              height: fit-content;

              min-height: 500px;

              border-radius: 15px;

              padding: 20px;
              margin: 40px;

              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: flex-start;
          }

          h1 {
              width: 100%;

              margin: 8px;

              display: flex;
              align-items: center;
              justify-content: space-between;

              position: relative;

              word-break: break-all;

              mix-blend-mode: difference;
          }

          p {
              position: relative;

              width: 100%;
              min-height: 35px;

              text-indent: 50px;
              margin: 5px;

              display: flex;
              align-items: center;
              justify-content: space-between;

              word-break: break-all;
              mix-blend-mode: difference;
          }

          div img {
              border-radius: 15px;
              margin: 20px auto;

              max-width: 75%;

              max-height: 300px;
          }

          div video {
              margin: 20px auto;
              width: 75%;

              border-radius: 15px;
          }

          div audio {
              margin: 20px auto;
              border-radius: 15px;
              width: 75%;
          }

          #ArticleEditor div.mediaDiv {
              width: 90%;
              display: flex;
              flex-direction: column;
              align-items: center;
          }
        </style>
      </head>
      <body>
        ${content} 
      </body>
      </html>
    `;

    const htmlblob = new Blob([htmlContent], { type: 'text/html' });

    // const jsonData = {
    //   title: 'Article Title',
    //   author_id: 1
    // };
    // const jsonString = JSON.stringify(jsonData);

    const formData = new FormData();
    formData.append('file', htmlblob, 'article.html');
    formData.append('title', data.articleTtl); 
    formData.append('publish', data.publish); 
    formData.append('biology', data.bio); 
    formData.append('chemistry', data.chemistry); 
    formData.append('physics', data.physics); 
    formData.append('it', data.it); 
    formData.append('author_id', '5');  

    try {
      // Отправляем данные на сервер
      const response = await fetch('http://localhost:3000/rest-api-service/upload-html', {
        method: 'POST',
        body: formData,
        credentials: 'include',  // Если нужно передавать куки
      });
  
      // Получаем ссылку на сохраненный файл
      if (response.ok) {
        console.log('Файл успешно загружен');
        navigate('/articles', { replace: true });  // Используем useNavigate для перенаправления
      } else {
        console.log('Ошибка при загрузке файла');
      }
  
    } catch (error) {
      console.error('Ошибка при сохранении файла:', error);
    }
  }

  function addElement(el) {
    const articleEditor = document.getElementById('ArticleEditor');
    let newElement;

    switch (el) {
      case 'h1':
        newElement = document.createElement('h1');
        newElement.innerHTML = 'Введите текст заголовка';
        break;
      case 'p':
        newElement = document.createElement('p');
        newElement.innerHTML = 'Введите текст параграфа';
        break;
      case 'img':
      case 'video':
      case 'audio':
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = el === 'img' ? 'image/*' : el === 'video' ? 'video/*' : 'audio/*';
        fileInput.style.display = 'none';

        fileInput.addEventListener('change', (event) => uploadFile(event, el));
        document.body.appendChild(fileInput);
        fileInput.click();

        fileInput.addEventListener('click', () => {
          setTimeout(() => {
            document.body.removeChild(fileInput);
          }, 100);
        });
        return; 
      default:
        return;
    }

    if (el != 'img' || el != 'audio' || el != 'video') {
      editBtnsAdd(newElement); 

      newElement.classList.add(el + 'Media');

      articleEditor.appendChild(newElement);
      setEmpty(false);

      setElCount(elCount => elCount + 1);
      // console.log(elCount + 1);
    }

  }  

  function showSaveWinFunc () {
    console.log(edCount);
    if (showSaveWin) {
        const saveWinList = document.getElementById('EditArticleElWin');
        saveWinList.classList.add('saveWinClosing');
        const winBG = document.getElementById('winBackground');
        winBG.classList.add('winClose');
        setTimeout(() => {
            winBG.classList.remove('winClose');
            setShowSaveWin(false);
            saveWinList.classList.remove('saveWinClosing');
        }, 290);
    } else {
        if (edCount == 0) {
          setShowSaveWin(true);
        } else {
          const textareas = Array.from(document.getElementsByClassName('editArea'));
          textareas.forEach(el => {
            el.classList.add('edError');
          })
          setTimeout(() => {
            textareas.forEach(el => {
              el.classList.remove('edError');
            });
          }, 1000);
        }
    }
  }

  return (
    <>
        <div id="newArticleWin">
            {showSaveWin &&
              <>
                <WindowBG hide={()=>{showSaveWinFunc()}}/>
                <EditArticleElWin hide={()=>{setShowSaveWin(false)}} save={(data)=>{saveToHtmlFile(data)}}/>
              </>
            }
            <div id="newArticleTop">
                <div id="newArticleEditorBtns">
                  <button onClick={()=>{addElement('h1')}}><img src={headerIcon} alt="" />Title</button>
                  <button onClick={()=>{addElement('p')}}><img src={paragraphIcon} alt="" />Paragraph</button>
                  <button onClick={()=>{addElement('img')}}><img src={imageIcon} alt="" />Img</button>
                  <button onClick={()=>{addElement('video')}}><img src={videoIcon} alt="" />Video</button>
                  <button onClick={()=>{addElement('audio')}}><img src={audioIcon} alt="" />Audio</button>
                  <button disabled onClick={()=>{addElement('file')}}><img src={fileIcon} alt="" />File</button>
                </div>
                <button id="CloseArticleBtn" onClick={() => { navigate('/', { replace: true }); }}> 
                  <img src={closeIcon} alt="" /> 
                </button>
            </div>
            <div id="newArticleEditor">
                <div id="ArticleEditor">
                  {empty &&
                  <div id="emptyDiv">
                      <h2 id="emptyTitle">Тут ещё ничего нет</h2>
                  </div>}
                </div>
            </div>
            <div id="newArticleBottom">
                <button id="SaveArticleBtn" onClick={()=>{showSaveWinFunc();}}><img src={saveIcon} alt="" />Сохранить</button>
            </div>
        </div>
    </>
  )
}

export default NewArticle
