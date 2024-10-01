import { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import './Articles.css';
import ArticleCard from '../Cards/ArticleCard.jsx';
import SelectedArticle from '../Cards/SelectedArticle.jsx';

function Articles() {
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
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const LoadSelectedArticle = async (articleId) => {
        try {  
            const response = await fetch(`http://localhost:3000/rest-api-service/articles/${articleId}`, {
                method: 'GET',
                credentials: 'include',
                withCredentials: true,
            });
            const articleData = await response.json();
            setSelectedArticle(articleData);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const clearSelectedArticle = () => {
        setSelectedArticle(null); 
        setSingleColumn(false); 
        navigate('/articles'); 
    };

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
                            <label><input type="checkbox" />Биология</label>
                            <label><input type="checkbox" />Химия</label>
                            <label><input type="checkbox" />Физика</label>
                            <label><input type="checkbox" />IT</label>
                        </div>
                    </div>
                    <div id="articlesList" className={singleColumn ? "singleColumn" : ''}>
                        {articles.map((article, i) => {
                            const ArticleLink = `/articles/${article.id}`;
                            return (
                                <NavLink 
                                    to={ArticleLink} 
                                    key={article.id} 
                                    className='ArticleCard' 
                                    onClick={(e) => { 
                                        LoadSelectedArticle(article.id); 
                                        setSingleColumn(true);
                                    }}
                                >
                                    <ArticleCard articleData={article} />
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
                {selectedArticle && 
                    <SelectedArticle articleData={selectedArticle} onClose={clearSelectedArticle} />
                }
            </div>
        </>
    );
}

export default Articles;
