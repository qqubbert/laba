package requests

import "database/sql"

type TaskByID struct {
	ID         int    `json:"id,omitempty"`
	Task       string `json:"task,omitempty"`
	Progress   int    `json:"progress,omitempty"`
	IdEmployee int    `json:"id_employee,omitempty"`
}

func CreateTaskByEmployeeId(db *sql.DB, employeeId int, task TaskByID) error {
	query := `INSERT INTO tasks (Id_Employee, Task, Progress) VALUES (?, ?, ?)`

	_, err := db.Exec(query, employeeId, task.Task, task.Progress)
	if err != nil {
		return err
	}
	return nil
}
