import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate, useNavigate } from 'react-router-dom';

import bookmarkFilled from '../../assets/BookmarkFilledIcon.svg';
import bookmark from '../../assets/BookmarkIcon.svg';
import closeIcon from '../../assets/CloseIcon.svg';

import './SelectedArticle.css';

import Comment from './Comment.jsx';

function SelectedArticle({ articleData, onClose, articleReload }) {
    const [articleComms, setArticleComms] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');

    const LoadArticleComms = async () => {
        try {  
            const response = await fetch(`http://localhost:3000/rest-api-service/articles/${articleData.id}/comments`, {
                method: 'GET',
                credentials: 'include',
                withCredentials: true,
            });
            const commsData = await response.json();
            console.log(commsData);
            setArticleComms(commsData);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const commentSend = async () => {
        const commentTextArea = document.getElementById('newCommentTextarea');
        console.log(newCommentText);
        if (newCommentText != '') {
            const response = await fetch(`http://localhost:3000/rest-api-service/articles/${articleData.id}/comments`,{
                method: 'POST',
                credentials: 'include',
                withCredentials: true,
                body: JSON.stringify({
                    author_id: 4,
                    comm: newCommentText
                })
            });
            if (response.ok) {
                commentTextArea.value = '';
                setNewCommentText('');
                LoadArticleComms();
            } else {
                // console.log('Ошибка');
            }
        } else {
            commentTextArea.style.outline = '2px solid red';
            setTimeout(() => {
                commentTextArea.style.outline = '0px solid red';
            }, 1500);
        }
        
    } 

    useEffect(()=>{
        console.log(articleData);
        if (articleData) {
            LoadArticleComms();
        }
    }, [articleData]);

    const addToFav = async () => {
        const response = await fetch(`http://localhost:3000/rest-api-service/articles/${articleData.id}/favorites`,{
            method: 'POST',
            credentials: 'include',
            withCredentials: true
        });
        if (response.ok) {
            articleReload();
        }
    }

  return (
    <>
        {articleData && 
        <>
            <div id="selectedArticle">
                <div id="articleInfo">
                    <div id="articleIntoText">
                        <h1>{articleData.title}</h1>
                    </div>
                    <div id="selectedArticleBtns">
                        <button onClick={addToFav}><img src={articleData.is_favorite ? bookmarkFilled : bookmark} alt="" /></button>
                        <button onClick={onClose}><img src={closeIcon} alt="" /></button>
                    </div>
                </div>
                <div id="articleAndComms">
                    <iframe src={articleData.html_link} frameborder="0" id="selectedArticlePane">
                        Браузер не может загрузить страницу
                    </iframe>
                    <div id="articleComms">
                        <div id="addCommentDiv">
                            <textarea name="" id="newCommentTextarea" placeholder='Введите текст комментария' onChange={(e)=>{setNewCommentText(e.target.value)}}></textarea>
                            <button onClick={commentSend} disabled={!newCommentText}>Сохранить</button>
                        </div>
                        <div id="articleCommsDiv">
                            {Array.isArray(articleComms) && articleComms.map((comment, i)=>{
                                return (
                                    <div key={comment.id} className='Comment' id={'commentCard' + i} >
                                        <Comment commentData={articleComms[i]} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>}
    </>
  )
}

export default SelectedArticle;
