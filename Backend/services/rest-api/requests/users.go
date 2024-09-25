package requests

import "database/sql"

type User struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	JobTitle  string `json:"job_title"`
	DepID     string `json:"dep_id"`
}

func GetUsers(db *sql.DB) ([]User, error) {
	query := `SELECT u.FirstName, u.LastName, u.JobTitle, d.DepTtl
		FROM Users u
		LEFT JOIN Departaments d ON u.DepID = d.DepID`
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var user User
		if err := rows.Scan(&user.FirstName, &user.LastName, &user.JobTitle, &user.DepID); err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return users, nil
}
