package requests

import (
	"database/sql"
	"errors"
	"fmt"
	"github.com/go-sql-driver/mysql"
)

type UserUdpate struct {
	Permission     string `json:"permission"`
	FirstName      string `json:"first_name"`
	LastName       string `json:"last_name"`
	Surname        string `json:"surname"`
	FamilyStatus   string `json:"family_status"`
	HavingChildren int    `json:"having_children"`
	JobTitle       string `json:"job_title"`
	AcademicDegree string `json:"academic_degree"`
	DepID          int    `json:"dep_id"`
	WorkExperience int    `json:"work_experience"`
	Salary         int    `json:"salary"`
	PhoneNumber    string `json:"phone_number"`
	Email          string `json:"email"`
	IsBlocked      bool   `json:"is_blocked"`
}

func UserUpdate(db *sql.DB, userID int, user UserUdpate) error {
	query := `UPDATE Users
	SET Permission = ?, FirstName = ?, LastName = ?, Surname = ?,
	FamilyStatus = ?, HavingChildren = ?, JobTitle = ?, AcademicDegree = ?,
	DepID = ?, WorkExperience = ?, Salary = ?, PhoneNumber = ?, Email = ?, Isblocked = ?
	WHERE ID = ?
	`

	_, err := db.Exec(query, user.Permission, user.FirstName, user.LastName, user.Surname,
		user.FamilyStatus, user.HavingChildren, user.JobTitle, user.AcademicDegree,
		user.DepID, user.WorkExperience, user.Salary, user.PhoneNumber, user.Email, user.IsBlocked, userID)
	if err != nil {
		if mysqlErr, ok := err.(*mysql.MySQLError); ok && mysqlErr.Number == 1062 {
			return errors.New("email already exists")
		}
		return fmt.Errorf("Could not update user: %v", err)
	}
	return nil
}
