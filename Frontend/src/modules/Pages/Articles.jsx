import { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import './Articles.css';
import ArticleCard from '../Cards/ArticleCard.jsx';
import SelectedArticle from '../Cards/SelectedArticle.jsx';

import plusIcon from '../../assets/PlusIcon.svg';
import searchIcon from '../../assets/SearchIcon.svg';
import ChemistryIcon from '../../assets/ChemistryIcon.svg';
import LeafIcon from '../../assets/LeafIcon.svg';
import RocketIcon from '../../assets/RocketIcon.svg';
import TerminalIcon from '../../assets/TerminalIcon.svg';
import BookmarkIcon from '../../assets/BookmarkIcon.svg';

function Articles() {
    const [articles, setArticles] = useState([]);
    const [singleColumn, setSingleColumn] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const { articleId } = useParams();
    const navigate = useNavigate();
    const [isArticlesLoaded, setIsArticlesLoaded] = useState(false);
    const [isFilters, setIsFilters] = useState(false);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [filters, setFilters] = useState({
        it: false,
        biology: false,
        physics: false,
        chemistry: false,
        title: "",
        favorite: false
    });

    const handleFilterChange = (key, value) => {
        console.log(key, ': ', value);
        setFilters(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    useEffect(() => {
        const filtered = articles.filter(article => {  
            return (
                (filters.title ? (article.title.toLocaleLowerCase()).includes((filters.title).toLocaleLowerCase()) : true) &&
                (filters.biology ? article.biology === filters.biology : true) &&
                (filters.it ? article.it === filters.it : true) &&
                (filters.chemistry ? article.chemistry === filters.chemistry : true) &&
                (filters.favorite ? article.is_favorite === filters.favorite : true) &&
                (filters.physics ? article.physics === filters.physics : true) // &&
            );
        });
        setFilteredArticles(filtered);
        setIsFilters(true);
        console.log(filteredArticles);
    }, [filters, articles]);
    
    const LoadArticles = async () => {
        try {  
            const response = await fetch("http://localhost:3000/rest-api-service/articles", {
                method: 'GET',
                credentials: 'include',
                withCredentials: true,
            });
            const responseData = await response.json();
            setArticles(responseData);
            setIsArticlesLoaded(true);
            console.log('Статьи загружены');
            console.log(responseData);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const LoadSelectedArticle = async (articleId) => {
        try {  
            if (isArticlesLoaded) {
                const articleExists = articles.some(article => article.id === parseInt(articleId));
                if (!articleExists) {
                    // const singleColumns = Array.from(document.getElementsByClassName('singleColumn'));
                    // singleColumns.forEach(el=>{
                    //     el.classList.remove('singleColumn');
                    // })
                    navigate('/articles'); 
                    return;
                    // console.log('пользователь не существует');
                }
                setSingleColumn(true);
                const response = await fetch(`http://localhost:3000/rest-api-service/articles/${articleId}`, {
                    method: 'GET',
                    credentials: 'include',
                    withCredentials: true,
                });
                const articleData = await response.json();
                setSelectedArticle(articleData);
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const clearSelectedArticle = () => {
        setSelectedArticle(null); 
        setSingleColumn(false); 
        navigate('/articles'); 
    };

    const selectArticleFunc = (i) => {
        const userCards = Array.from(document.getElementsByClassName('ArticleCard'));
        userCards.forEach((el)=>{
            el.classList.remove('SelectedArticleCard');
        });
        const selectedPerson = document.getElementById('articleCard'+i);
        selectedPerson.classList.add('SelectedArticleCard');
    }

    useEffect(() => {
        LoadArticles();
    }, []);

    useEffect(() => {
        if (articleId) {
            LoadSelectedArticle(articleId);
        }
    }, [isArticlesLoaded, articleId]);

    const articleReload = async () => {
        try {
            // Перезагрузить список статей
            await LoadArticles();
            console.log('Обновлены данные о статьях');
            
            // Убедиться, что статья существует и перезагрузить её
            if (selectedArticle?.id) {
                await LoadSelectedArticle(selectedArticle.id);
                selectArticleFunc(selectedArticle.id); // Применить выделение
            }
        } catch (error) {
            console.error("Ошибка при обновлении статьи:", error);
        }
    };
    

    return (
        <>
            <div id="articles">
                <div id="allArticles" className={singleColumn ? "singleColumn" : ''}>
                    <div id="searchArticle">
                        <div id="inputAndBtns">
                            <button onClick={()=>navigate('/newarticle')}>
                                <img src={plusIcon} alt="" />
                                <span>Новая статья</span>
                            </button>
                            <input type="text" placeholder='Поиск' onChange={(e) => handleFilterChange('title', e.target.value)}/>
                            <button><img src={searchIcon} alt="" /></button>
                        </div>
                        <div id="articleTags">
                            <div id="articleTagsLeft">
                                <label><input type="checkbox" onChange={(e) => handleFilterChange('biology', !filters.biology)}/>
                                <img src={LeafIcon} alt="" />
                                Биология
                                </label>
                                <label><input type="checkbox" onChange={(e) => handleFilterChange('chemistry', !filters.chemistry)}/>
                                <img src={ChemistryIcon} alt="" />
                                Химия
                                </label>
                                <label><input type="checkbox" onChange={(e) => handleFilterChange('physics', !filters.physics)}/>
                                <img src={RocketIcon} alt="" />
                                Физика
                                </label>
                                <label><input type="checkbox" onChange={(e) => handleFilterChange('it', !filters.it)}/>
                                <img src={TerminalIcon} alt="" />
                                IT
                                </label>
                            </div>
                            <div id="articleTagsRight">
                                <label>
                                    <input type="checkbox" 
                                        onChange={(e) => handleFilterChange('favorite', !filters.favorite)}
                                    />
                                        <img src={BookmarkIcon} alt="" />
                                        Избранные
                                    </label>
                                {/* <label><input type="checkbox" />Мои статьи</label> */}
                            </div>
                        </div>
                    </div>
                    <div id="articlesList" className={singleColumn ? "singleColumn" : ''}>
                        {articles.length >= 1 && articles && !isFilters && articles.map((article, i) => {
                            const ArticleLink = `/articles/${article.id}`;
                            return (
                                <NavLink 
                                    to={ArticleLink} 
                                    key={article.id} 
                                    id={`articleCard${article.id}`}
                                    className='ArticleCard' 
                                    title={article.title}
                                    onClick={(e) => { 
                                        LoadSelectedArticle(article.id); 
                                        setSingleColumn(true);
                                        selectArticleFunc(article.id);
                                    }}
                                >
                                    <ArticleCard articleData={article} />
                                </NavLink>
                            );
                        })}
                        {filteredArticles && isFilters && filteredArticles.map((article, i) => {
                            const ArticleLink = `/articles/${article.id}`;
                            return (
                                <NavLink 
                                    to={ArticleLink} 
                                    key={article.id} 
                                    id={`articleCard${article.id}`}
                                    className='ArticleCard' 
                                    title={article.title}
                                    onClick={(e) => { 
                                        LoadSelectedArticle(article.id); 
                                        setSingleColumn(true);
                                        selectArticleFunc(article.id);
                                    }}
                                >
                                    <ArticleCard articleData={article} author={true}/>
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
                {selectedArticle && 
                    <SelectedArticle articleData={selectedArticle} onClose={clearSelectedArticle} articleReload={()=>{articleReload()}}/>
                }
            </div>
        </>
    );
}

export default Articles;
