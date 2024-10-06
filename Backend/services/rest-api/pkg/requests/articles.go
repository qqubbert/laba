package requests

import (
	"database/sql"
	"errors"
)

type Article struct {
	ID           int      `json:"id"`
	Title        string   `json:"title"`
	Completed    bool     `json:"completed"`
	AuthorId     int      `json:"author_id"`
	CreatingDate string   `json:"creating_date"`
	HtmlLink     string   `json:"html_link"`
	AuthorName   string   `json:"author_name"`
	Tags         []string `json:"tags"`
}

func GetArticleById(db *sql.DB, id int) (*Article, error) {

	query := `
		SELECT a.id, a.title, a.completed, a.author_id, a.creating_date, a.HtmlLink,
		       CONCAT(u.FirstName, ' ', u.LastName, ' ', u.Surname) AS author_name
		FROM article a
		JOIN Users u ON a.author_id = u.ID
		WHERE a.id = ?
	`
	var article Article
	err := db.QueryRow(query, id).Scan(
		&article.ID, &article.Title, &article.Completed, &article.AuthorId,
		&article.CreatingDate, &article.HtmlLink, &article.AuthorName,
	)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}

	tagsQuery := `
		SELECT biology, chemistry, it, physics 
		FROM article_tags 
		WHERE article_id = ?
	`
	var tags []string
	var biology, chemistry, it, physics bool
	if err := db.QueryRow(tagsQuery, article.ID).Scan(&biology, &chemistry, &it, &physics); err == nil {
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
	}
	article.Tags = tags
	return &article, nil
}

func ShowComsById() {

}
