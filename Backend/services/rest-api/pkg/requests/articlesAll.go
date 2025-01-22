package requests

import (
	"database/sql"
	"fmt"
)

type ArticleAll struct {
	ID           int    `json:"id"`
	Title        string `json:"title"`
	HtmlLink     string `json:"html_link"`
	Completed    bool   `json:"completed"`
	AuthorId     int    `json:"author_id"`
	AuthorName   string `json:"author_name"`
	CreatingDate string `json:"creating_date"`
	Biology      bool   `json:"biology"`
	Chemistry    bool   `json:"chemistry"`
	It           bool   `json:"it"`
	Physics      bool   `json:"physics"`
	IsFavorite   bool   `json:"is_favorite"` // Указывает, находится ли статья в избранном
}

func GetAllArticles(db *sql.DB, userId int) ([]ArticleAll, error) {
	query := `
		SELECT a.id, a.title, a.HtmlLink, a.completed, a.author_id, 
		       CONCAT(u.FirstName, ' ', u.LastName) AS author_name, 
		       a.creating_date, a.biology, a.chemistry, a.it, a.physics,
		       EXISTS (
		       	SELECT 1 FROM fav_articles fa WHERE fa.user_id = ? AND fa.art_id = a.id
		       ) AS is_favorite
		FROM article a
		LEFT JOIN Users u ON a.author_id = u.ID
		ORDER BY creating_date DESC;
	`

	rows, err := db.Query(query, userId)
	if err != nil {
		return nil, fmt.Errorf("query execution failed: %w", err)
	}
	defer rows.Close()

	var articles []ArticleAll
	for rows.Next() {
		var article ArticleAll

		// Сканируем данные из строки результата
		err := rows.Scan(
			&article.ID,
			&article.Title,
			&article.HtmlLink,
			&article.Completed,
			&article.AuthorId,
			&article.AuthorName,
			&article.CreatingDate,
			&article.Biology,
			&article.Chemistry,
			&article.It,
			&article.Physics,
			&article.IsFavorite,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan row: %w", err)
		}

		// Добавляем статью в список
		articles = append(articles, article)
	}

	// Проверка на ошибки чтения строк
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error during rows iteration: %w", err)
	}

	return articles, nil
}
