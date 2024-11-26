package requests

import (
	"database/sql"
	"errors"
)

type Article struct {
	ID           int      `json:"id"`
	Title        string   `json:"title"`
	HtmlLink     string   `json:"html_link"`
	Completed    bool     `json:"completed"`
	AuthorId     int      `json:"author_id"`
	AuthorName   string   `json:"author_name"` // Полное имя автора
	CreatingDate string   `json:"creating_date"`
	Tags         []string `json:"tags"` // Список тегов
}

func GetArticleById(db *sql.DB, id int) (*Article, error) {
	query := `
		SELECT a.id, a.title, a.HtmlLink, a.completed, a.author_id, a.creating_date,
		       CONCAT(u.FirstName, ' ', u.LastName) AS author_name,
		       a.biology, a.chemistry, a.it, a.physics
		FROM article a
		JOIN Users u ON a.author_id = u.ID
		WHERE a.id = ?
	`

	var article Article
	var biology, chemistry, it, physics bool

	err := db.QueryRow(query, id).Scan(
		&article.ID, &article.Title, &article.HtmlLink, &article.Completed,
		&article.AuthorId, &article.CreatingDate, &article.AuthorName,
		&biology, &chemistry, &it, &physics,
	)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}

	// Формируем список тегов
	var tags []string
	if biology {
		tags = append(tags, "biology")
	}
	if chemistry {
		tags = append(tags, "chemistry")
	}
	if it {
		tags = append(tags, "it")
	}
	if physics {
		tags = append(tags, "physics")
	}
	article.Tags = tags

	return &article, nil
}

func AddToVadoriteArticles(db *sql.DB, userID, articleID int) error {
	queryCheck := `SELECT COUNT(*) FROM fav_articles WHERE art_id = ? AND user_id = ?`
	var count int
	err := db.QueryRow(queryCheck, articleID, userID).Scan(&count)
	if err != nil {
		return err
	}

	if count > 0 {
		// Если статья уже в избранном, удаляем её
		queryDelete := `DELETE FROM fav_articles WHERE art_id = ? AND user_id = ?`
		_, err := db.Exec(queryDelete, articleID, userID)
		if err != nil {
			return err
		}
	} else {
		// Если статьи нет в избранном, добавляем её
		queryInsert := `INSERT INTO fav_articles (art_id, user_id) VALUES (?, ?)`
		_, err := db.Exec(queryInsert, articleID, userID)
		if err != nil {
			return err
		}
	}

	return nil
}

func GetArticlesByAuthorID(db *sql.DB, authorID int) ([]Article, error) {
	query := `SELECT id, title, HtmlLink, completed, creating_date 
			  FROM article
			  WHERE author_id = ?`
	rows, err := db.Query(query, authorID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var articles []Article

	for rows.Next() {
		var article Article
		if err := rows.Scan(&article.ID, &article.Title, &article.HtmlLink, &article.Completed, &article.CreatingDate); err != nil {
			return nil, err
		}
		articles = append(articles, article)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return articles, nil
}
