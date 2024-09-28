package requests

import "database/sql"

type Dep struct {
	DepTtl string `json:"dep_ttl"`
	ProjID int    `json:"proj_id"`
}

func CreateDepartment(db *sql.DB, departments Dep) (int64, error) {
	query := `INSERT INTO Departaments (DepTtl, ProjID) VALUES (?, ?)`
	result, err := db.Exec(query, departments.DepTtl, departments.ProjID)
	if err != nil {
		return 0, err
	}

	//получаю айдишник нового отдела
	depID, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return depID, nil
}
