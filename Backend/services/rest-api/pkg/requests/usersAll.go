package requests

import "database/sql"

type FullUser struct {
	ID             int    `json:"id"`
	FirstName      string `json:"first_name"`
	LastName       string `json:"last_name"`
	JobTitle       string `json:"job_title"`
	Department     string `json:"department"`
	Permission     string `json:"permission"`
	Surname        string `json:"surname"`
	Gender         string `json:"gender"`
	Birthday       string `json:"birthday"`
	FamilyStatus   string `json:"family_status"`
	HavingChildren int    `json:"having_children"`
	AcademicDegree string `json:"academic_degree"`
	WorkExperience int    `json:"work_experience"`
	Salary         int    `json:"salary"`
	PhoneNumber    string `json:"phone_number"`
	Email          string `json:"email"`
	IsBlocked      bool   `json:"is_blocked"`
	ProfilePicLink string `json:"profile_pic_link"`
}

func GetAllUsers(db *sql.DB) ([]FullUser, error) {
	query := `SELECT u.ID, u.FirstName, u.LastName, u.JobTitle, d.DepTtl, 
	                 u.Permission, u.Surname, u.Gender, u.Birthday, u.FamilyStatus,
	                 u.HavingChildren, u.AcademicDegree, u.WorkExperience, 
	                 u.Salary, u.PhoneNumber, u.Email, u.Isblocked, u.ProfilePicLink
	          FROM Users u
	          LEFT JOIN Departaments d ON u.DepID = d.DepID
	          WHERE u.Isblocked = false`

	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []FullUser
	for rows.Next() {
		var user FullUser
		if err := rows.Scan(&user.ID, &user.FirstName, &user.LastName, &user.JobTitle, &user.Department,
			&user.Permission, &user.Surname, &user.Gender, &user.Birthday, &user.FamilyStatus,
			&user.HavingChildren, &user.AcademicDegree, &user.WorkExperience,
			&user.Salary, &user.PhoneNumber, &user.Email, &user.IsBlocked, &user.ProfilePicLink); err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return users, nil
}
