package requests

import (
	"database/sql"
)

type Task struct {
	IdEmployee int    `json:"id_employee"`
	Task       string `json:"task"`
	Progress   int    `json:"progress"`
}

func CreateTask(db *sql.DB, task Task) error {
	query := `INSERT INTO tasks (Id_Employee, Task, Progress) VALUES (?, ?, 0)`
	_, err := db.Exec(query, task.IdEmployee, task.Task)
	if err != nil {
		return nil
	}

	return nil
}
