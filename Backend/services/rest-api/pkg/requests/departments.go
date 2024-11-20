package requests

import "database/sql"

type Dep struct {
	DepTtl string `json:"dep_ttl,omitempty"`
	ProjID int    `json:"proj_id,omitempty"`
	DepID  int    `json:"dep_id,omitempty"`
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

func GetAllDepartments(db *sql.DB) ([]Dep, error) {
	query := `SELECT DepID, DepTtl from Departaments`
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var departments []Dep
	for rows.Next() {
		var department Dep
		if err = rows.Scan(&department.DepID, &department.DepTtl); err != nil {
			return nil, err
		}
		departments = append(departments, department)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return departments, nil
}
