package requests

import (
	"database/sql"
	"errors"
)

type Task struct {
	IdEmployee int    `json:"id_employee"`
	Task       string `json:"task"`
	Progress   int    `json:"progress"`
}

func GetTaskByID(db *sql.DB, userID int) ([]Task, error) {
	query := `SELECT Task, Progress 
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
		if err := rows.Scan(&task.Task, &task.Progress); err != nil {
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
