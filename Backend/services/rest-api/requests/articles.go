package requests

import "database/sql"

type Article struct {
	ID           int    `json:"id"`
	Title        string `json:"title"`
	Completed    bool   `json:"completed"`
	AuthorId     int    `json:"author_id"`
	CreatingDate string `json:"creating_date"`
}

func GetAllArticles(db *sql.DB) ([]Article, error) {
	query := `SELECT id, title, completed, author_id, creating_date
	FROM article
	`
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var articles []Article
	for rows.Next() {
		var article Article
		if err := rows.Scan(&article.ID, &article.Title, &article.Completed, &article.AuthorId, &article.CreatingDate); err != nil {
			return nil, err
		}
		articles = append(articles, article)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return articles, nil
}
