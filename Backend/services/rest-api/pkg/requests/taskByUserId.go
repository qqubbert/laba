package requests

import "database/sql"

type TaskByID struct {
	ID         int    `json:"id,omitempty"`
	Task       string `json:"task,omitempty"`
	Progress   int    `json:"progress,omitempty"`
	IdEmployee int    `json:"id_employee,omitempty"`
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

func CreateTaskByEmployeeId(db *sql.DB, employeeId int, task TaskByID) error {
	query := `INSERT INTO tasks (Id_Employee, Task, Progress) VALUES (?, ?, ?)`

	_, err := db.Exec(query, employeeId, task.Task, task.Progress)
	if err != nil {
		return err
	}
	return nil
}
