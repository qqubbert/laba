package requests

import "database/sql"

type ArticleAll struct {
	ID           int      `json:"id"`
	Title        string   `json:"title"`
	HtmlLink     string   `json:"html_link"`
	Completed    bool     `json:"completed"`
	AuthorId     int      `json:"author_id"`
	AuthorName   string   `json:"author_name"`
	CreatingDate string   `json:"creating_date"`
	Tags         []string `json:"tags"`
}

func GetAllArticles(db *sql.DB) ([]ArticleAll, error) {
	query := `
		SELECT a.id, a.title, a.HtmlLink, a.completed, a.author_id, 
		       CONCAT(u.FirstName, ' ', u.LastName) AS author_name, a.creating_date,
		       a.biology, a.chemistry, a.it, a.physics
		FROM article a
		JOIN Users u ON a.author_id = u.ID
		WHERE a.completed = true
	`

	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var articles []ArticleAll
	for rows.Next() {
		var article ArticleAll
		var biology, chemistry, it, physics bool

		// Сканируем результаты
		if err := rows.Scan(&article.ID, &article.Title, &article.HtmlLink, &article.Completed,
			&article.AuthorId, &article.AuthorName, &article.CreatingDate,
			&biology, &chemistry, &it, &physics); err != nil {
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
		articles = append(articles, article)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return articles, nil
}
