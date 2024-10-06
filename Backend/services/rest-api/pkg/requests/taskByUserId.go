package requests

import "database/sql"

type TaskByID struct {
	ID       int    `json:"id"`
	Task     string `json:"task"`
	Progress int    `json:"progress"`
}

func GetTaskByUserId(db *sql.DB, EmployeeId int) ([]TaskByID, error) {
	query := `SELECT ID, Task, Progress FROM tasks WHERE Id_Employee = ?`
	rows, err := db.Query(query, EmployeeId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tasks []TaskByID
	for rows.Next() {
		var task TaskByID
		err = rows.Scan(&task.ID, &task.Task, &task.Progress)
		if err != nil {
			return nil, err
		}
		tasks = append(tasks, task)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return tasks, nil
}
