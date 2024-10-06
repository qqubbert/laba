package requests

import "database/sql"

type ArticleAll struct {
	ID           int      `json:"id"`
	Title        string   `json:"title"`
	Completed    bool     `json:"completed"`
	AuthorId     int      `json:"author_id"`
	AuthorName   string   `json:"author_name"` // Полное имя автора
	CreatingDate string   `json:"creating_date"`
	HtmlLink     string   `json:"html_link"` // Поле для ссылки на статью
	Tags         []string `json:"tags"`      // Список тегов
}

func GetAllArticles(db *sql.DB) ([]ArticleAll, error) {
	query := `
		SELECT a.id, a.title, a.completed, a.author_id, CONCAT(u.FirstName, ' ', u.LastName) AS AuthorName, a.creating_date, a.HtmlLink,
		       IFNULL(t.biology, false), IFNULL(t.chemistry, false), IFNULL(t.it, false), IFNULL(t.physics, false)
		FROM article a
		JOIN Users u ON a.author_id = u.ID
		LEFT JOIN article_tags t ON a.id = t.article_id
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
		if err := rows.Scan(&article.ID, &article.Title, &article.Completed, &article.AuthorId, &article.AuthorName, &article.CreatingDate, &article.HtmlLink, &biology, &chemistry, &it, &physics); err != nil {
			return nil, err
		}

		// Собираем теги с помощью switch
		var tags []string
		switch {
		case biology:
			tags = append(tags, "biology")
		case chemistry:
			tags = append(tags, "chemistry")
		case it:
			tags = append(tags, "it")
		case physics:
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
