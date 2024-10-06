package requests

import (
	"database/sql"
	"errors"
)

type User struct {
	ID             int    `json:"id"`
	FirstName      string `json:"first_name"`
	LastName       string `json:"last_name"`
	Surname        string `json:"surname"`
	Gender         string `json:"gender"`
	Birthday       string `json:"birthday"`
	FamilyStatus   string `json:"family_status"`
	HavingChildren int    `json:"having_children"`
	JobTitle       string `json:"job_title"`
	AcademicDegree string `json:"academic_degree"`
	DepID          int    `json:"dep_id"`
	WorkExperience int    `json:"work_experience"`
	Salary         int    `json:"salary"`
	PhoneNumber    string `json:"phone_number"`
	Email          string `json:"email"`
	RegDate        string `json:"reg_date"`
	Department     string `json:"department"`
	ProfilePicLink string `json:"profile_pic_link"`
}

func GetUser(db *sql.DB, id int) (*User, error) {
	query := `
		SELECT u.ID, u.FirstName, u.LastName, u.Surname, u.Gender, u.Birthday, u.FamilyStatus, 
		       u.HavingChildren, u.JobTitle, u.AcademicDegree, u.DepID, u.WorkExperience, 
		       u.Salary, u.PhoneNumber, u.Email, u.ProfilePicLink, d.DepTtl
		FROM Users u
		LEFT JOIN Departaments d ON u.DepID = d.DepID
		WHERE u.ID = ?
	`

	var user User
	err := db.QueryRow(query, id).Scan(
		&user.ID, &user.FirstName, &user.LastName, &user.Surname, &user.Gender, &user.Birthday,
		&user.FamilyStatus, &user.HavingChildren, &user.JobTitle, &user.AcademicDegree, &user.DepID,
		&user.WorkExperience, &user.Salary, &user.PhoneNumber, &user.Email, &user.ProfilePicLink, &user.Department,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil // Пользователь не найден
		}
		return nil, err
	}

	return &user, nil

}
