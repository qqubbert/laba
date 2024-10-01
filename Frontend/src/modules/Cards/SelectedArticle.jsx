import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate, useNavigate } from 'react-router-dom';

import bookmarkFilled from '../../assets/BookmarkFilledIcon.svg';
import bookmark from '../../assets/BookmarkIcon.svg';
import closeIcon from '../../assets/CloseIcon.svg';

import './SelectedArticle.css';

import Comment from './Comment.jsx';

function SelectedArticle({ articleData, onClose }) {

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
                        <button><img src={bookmark} alt="" /></button>
                        <button onClick={onClose}><img src={closeIcon} alt="" /></button>
                    </div>
                </div>
                <div id="articleAndComms">
                    <iframe src={articleData.html_link} frameborder="0" id="selectedArticlePane">
                        Браузер не может загрузить страницу
                    </iframe>
                    <div id="articleComms">
                        <div className="Comment">
                            <Comment />
                        </div>
                        <div className="Comment">
                            <Comment />
                        </div>
                        <div className="Comment">
                            <Comment />
                        </div>
                        <div className="Comment">
                            <Comment />
                        </div>
                        <div className="Comment">
                            <Comment />
                        </div>
                        <div className="Comment">
                            <Comment />
                        </div>
                    </div>
                </div>
            </div>
        </>}
    </>
  )
}

export default SelectedArticle;
