package requests

import (
	"database/sql"
	"errors"
)

type Task struct {
	ID         int    `json:"id,omitempty"`
	IdEmployee int    `json:"id_employee,omitempty"`
	Task       string `json:"task,omitempty"`
	Progress   int    `json:"progress,omitempty"`
	Completed  bool   `json:"completed,omitempty"`
}

func GetTaskByID(db *sql.DB, userID int) ([]Task, error) {
	query := `SELECT ID, Task, Progress, Completed 
			  FROM tasks 
			  WHERE Id_Employee = ?
`
	rows, err := db.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tasks []Task
	for rows.Next() {
		var task Task
		if err := rows.Scan(&task.ID, &task.Task, &task.Progress, &task.Completed); err != nil {
			return nil, err
		}
		tasks = append(tasks, task)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	//проверяю есть ли задачи у пользователя
	if len(tasks) == 0 {
		return nil, errors.New("no tasks found")
	}
	return tasks, nil
}
