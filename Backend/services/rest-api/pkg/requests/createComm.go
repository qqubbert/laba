package requests

import "database/sql"

type CreateComment struct {
	ArticleID int    `json:"article_id"`
	AuthorID  int    `json:"author_id"`
	Comm      string `json:"comm"`
}

func AddComment(db *sql.DB, articleID int, authorID int, comm string) error {
	query := `INSERT INTO article_comms (article_id, author_id, comm) VALUES (?, ?, ?)`
	_, err := db.Exec(query, articleID, authorID, comm)
	return err
}
