package requests

import "database/sql"

type ArticleComment struct {
	Id        int    `json:"id"`
	ArticleId int    `json:"article_id"`
	AuthorId  int    `json:"author_id"`
	Comm      string `json:"comm"`
	Author    string `json:"author"`
	Pfp       string `json:"pfp"`
}

func GetCommentsByArticleId(db *sql.DB, articleID int) ([]ArticleComment, error) {
	query := `
		SELECT ac.id, ac.article_id, ac.author_id, ac.comm, CONCAT(u.FirstName, ' ', u.LastName) AS author, u.ProfilePicLink AS pfp
		FROM article_comms ac
		JOIN Users u ON ac.author_id = u.ID
		WHERE ac.article_id = ?
	`
	rows, err := db.Query(query, articleID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var comments []ArticleComment
	for rows.Next() {
		var comment ArticleComment
		if err := rows.Scan(&comment.Id, &comment.ArticleId, &comment.AuthorId, &comment.Comm, &comment.Author, &comment.Pfp); err != nil {
			return nil, err
		}
		comments = append(comments, comment)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}
	return comments, nil
}
