package requests

import (
	"database/sql"
)

type UserPFP struct {
	ID             int    `json:"id,omitempty"`
	ProfilePicLink string `json:"profile_pic_link,omitempty"`
}

func CreatePFP(db *sql.DB, userID int, avatarURL string) error {
	query := `UPDATE Users SET ProfilePicLink = ? WHERE ID = ?`
	_, err := db.Exec(query, avatarURL, userID)
	return err
}
