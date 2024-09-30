import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate, useParams, useNavigate } from 'react-router-dom';

import './Articles.css';

import ArticleCard from '../Cards/ArticleCard.jsx';
import SelectedArticle from '../Cards/SelectedArticle.jsx';

function Articles({  }) {
    const [articles, setArticles] = useState([]);
    const [singleColumn, setSingleColumn] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const { articleId } = useParams();
    const navigate = useNavigate();

    const LoadArticles = async () => {
        try {  
            const response = await fetch("http://localhost:3000/rest-api-service/articles", {
            method: 'GET',
            credentials: 'include',
            withCredentials: true,
            });
        
            const responseData = await response.json();

            setArticles(responseData);

            // console.log(responseData);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    }

    const LoadSelectedArticle = async (articleId) => {
        try {  
            const response = await fetch(`http://localhost:3000/rest-api-service/articles/${articleId}`, {
            method: 'GET',
            credentials: 'include',
            withCredentials: true,
            });
        
            const articleData = await response.json();

            setSelectedArticle(articleData);

            console.log(articleData);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    }

    const selectArticleFunc = (e, i) => {
        const articleCards = Array.from(document.getElementsByClassName('ArticleCard'));
        articleCards.forEach((el)=>{
            el.classList.remove('selectedArticle');
        });
        const selectedArticle = document.getElementById('articleCard' + i);
        selectedArticle.classList.add('selectedArticle');
    }

    const clearSelectedArticle = () => {
        console.log('Закрытие статьи');
        setSelectedArticle(null); 
        setSingleColumn(false); 
        navigate('/articles'); 
    }

    useEffect(() => {
        LoadArticles();
    }, []);

    useEffect(() => {
        if (articleId) {
            LoadSelectedArticle(articleId);
            setSingleColumn(true);
        }
    }, [articleId]);

  return (
    <>
        <div id="articles">
            <div id="allArticles" className={singleColumn ? "singleColumn" : ''}>
                <div id="searchArticle">
                    <input type="text" placeholder='Поиск' />
                    <div id="articleTags">
                        <label htmlFor=""><input type="checkbox" name="" id="" />Биология</label>
                        <label htmlFor=""><input type="checkbox" name="" id="" />Химия</label>
                        <label htmlFor=""><input type="checkbox" name="" id="" />Физика</label>
                        <label htmlFor=""><input type="checkbox" name="" id="" />IT</label>
                    </div>
                </div>
                <div id="articlesList" className={singleColumn ? "singleColumn" : ''}>
                    {articles.map((article, i)=>{
                        // console.log(user);
                        const ArticleLink = `/articles/${article.id}`;
                        return (
                            <NavLink to={ArticleLink} key={article.id} className='ArticleCard ' id={'articleCard' + i} onClick={(e)=>{LoadSelectedArticle(article.id); selectArticleFunc(e, i); setSingleColumn(true)} }>
                                <ArticleCard articleData={articles[i]} onClose={clearSelectedArticle}/>
                            </NavLink>
                        )
                    })}
                </div>
            </div>
            {selectedArticle &&
                <SelectedArticle articleData={selectedArticle} />
            }
        </div>
    </>
  )
}

export default Articles
