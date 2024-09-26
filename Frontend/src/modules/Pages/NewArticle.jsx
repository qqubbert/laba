import { useEffect, useState } from 'react'

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

import './NewArticle.css';

// import EditArticleElWin from './EditArticleElWin.jsx';

function NewArticle({ hideArticleEditor }) {
  const [empty, setEmpty] = useState(true);
  // const [fileType, setFileType] = useState(null);
  const [elCount, setElCount] = useState(0);

  useEffect(()=>{
    if (elCount <= 0) {
      setEmpty(true);
    }
  }, [elCount]);

  function editElText(editBtn) {
    let elToEdit = (editBtn.parentElement).parentElement;
    (editBtn.parentElement).remove();
  
    if (elToEdit.tagName === 'H1' || elToEdit.tagName === 'P') {
      let editArea = document.createElement('div');
      editArea.classList.add('editArea');
      let originalText = elToEdit.innerHTML;
  
      let textarea = document.createElement('textarea');
      // textarea.value = originalText;
      textarea.placeholder = "Введите текст заголовка";
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
          updatedText = originalText;
        }
        newElement.innerHTML = updatedText;
  
        editBtnsAdd(newElement);
        editArea.replaceWith(newElement);
        saveBtn.remove();
      });
  
      editArea.appendChild(saveBtn);
    }
  }  

  function handleFileChange(event, fileType) {
    const file = event.target.files[0];
    let newElementParent;
    let newElementDiv;
    // let newMediaDescription;
    newElementParent = document.createElement('div');
    newElementDiv = document.createElement('div');
    // newMediaDescription = document.createElement('span');
    newElementParent.classList.add('mediaParent');
    newElementDiv.classList.add('mediaDiv');
    // newMediaDescription.classList.add('mediaDescription');
    if (file) {
      const newElement = document.createElement(fileType);
      newElement.src = URL.createObjectURL(file);
      if (fileType === 'video' || fileType === 'audio') {
        newElement.controls = true;
      }
      // newMediaDescription.innerHTML = "Введите описание";
      setEmpty(false);
      editBtnsAdd(newElementParent);
      // newElementParent.addEventListener('mouseenter', () => editText(newElementParent));
      // newElementParent.addEventListener('mouseout', () => editHide(newElementParent));
      newElementParent.classList.add(fileType + 'Parent');
      document.getElementById('ArticleEditor').appendChild(newElementParent);
      newElementDiv.appendChild(newElement);
      // newElementDiv.appendChild(newMediaDescription);
      newElementParent.appendChild(newElementDiv);
      setElCount(elCount => elCount + 1);
      // console.log(elCount + 1);
    }
  }

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

    let editBtn = document.createElement('button');
    let editIco = document.createElement('img');

    let deleteBtn = document.createElement('button');
    let deleteIco = document.createElement('img');

    editIco.src = editIcon;
    deleteIco.src = deleteIcon;

    editIco.classList.add('editIcons');
    deleteIco.classList.add('editIcons');

    deleteBtn.addEventListener('click', ()=>{
      (deleteBtn.parentElement).parentElement.remove();
      setElCount(elCount => elCount - 1);
      // console.log(elCount);
    })

    editBtn.addEventListener('click', ()=>{
      editElText(editBtn);
    })

    editBtnsDiv.id = 'editBtnsDiv';

    editBtn.appendChild(editIco);
    deleteBtn.appendChild(deleteIco);

    editBtnsDiv.appendChild(editBtn);
    editBtnsDiv.appendChild(deleteBtn);

    editBtn.classList.add('editBtns');
    deleteBtn.classList.add('editBtns');

    el.appendChild(editBtnsDiv);
  }

  function saveToHtmlFile() {
    editDelete();

    const articleEditor = document.getElementById('ArticleEditor');
    const content = articleEditor.innerHTML; 

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Generated Article</title>
      </head>
      <body>
        ${content} 
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'article.html'; 
    link.click();
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

        fileInput.addEventListener('change', (event) => handleFileChange(event, el));
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

  return (
    <>
        <div id="newArticleWin">
            <div id="newArticleTop">
                <div id="newArticleEditorBtns">
                    <button onClick={()=>{addElement('h1')}}><img src={headerIcon} alt="" />Title</button>
                    <button onClick={()=>{addElement('p')}}><img src={paragraphIcon} alt="" />Paragraph</button>
                    <button onClick={()=>{addElement('img')}}><img src={imageIcon} alt="" />Img</button>
                    <button onClick={()=>{addElement('video')}}><img src={videoIcon} alt="" />Video</button>
                    <button onClick={()=>{addElement('audio')}}><img src={audioIcon} alt="" />Audio</button>
                    <button disabled onClick={()=>{addElement('file')}}><img src={fileIcon} alt="" />File</button>
                </div>
                <button id="CloseArticleBtn" onClick={()=>{hideArticleEditor()}}> <img src={closeIcon} alt="" /> </button>
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
                <button id="SaveArticleBtn" onClick={()=>{saveToHtmlFile(); hideArticleEditor()}}><img src={saveIcon} alt="" />Сохранить</button>
            </div>
        </div>
    </>
  )
}

export default NewArticle
