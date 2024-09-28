package requests

import (
	"database/sql"
	"errors"
)

type Project struct {
	ProjTtl      string `json:"proj_ttl"`
	Deadlines    string `json:"deadlines"` // Формат даты: "YYYY-MM-DD"
	Budget       int    `json:"budget"`
	Requirements string `json:"requirements"`
	DepID        int    `json:"dep_id"`
	Progress     int    `json:"progress"`
}

func CheckDepartmentExists(db *sql.DB, depID int) (bool, error) {
	var exists bool
	query := `SELECT COUNT(*) FROM Departaments WHERE DepID = ?`
	err := db.QueryRow(query, depID).Scan(&exists)
	if err != nil {
		return false, err
	}
	return exists, nil
}

func CreateProject(db *sql.DB, project Project) (int64, error) {
	// Проверяем, существует ли отдел
	depExists, err := CheckDepartmentExists(db, project.DepID)
	if err != nil {
		return 0, err
	}
	if !depExists {
		return 0, errors.New("отдел с таким ID не существует")
	}

	// Вставляем проект в базу данных
	query := `INSERT INTO Projects (ProjTtl, Deadlines, Budget, Requirements, Dep_ID, Progress) 
			  VALUES (?, ?, ?, ?, ?, ?)`
	result, err := db.Exec(query, project.ProjTtl, project.Deadlines, project.Budget, project.Requirements, project.DepID, project.Progress)
	if err != nil {
		return 0, err
	}

	// Получаем ID нового проекта
	projID, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return projID, nil
}
