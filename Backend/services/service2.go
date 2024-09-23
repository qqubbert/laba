package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", "root:spiritbinge@tcp(127.0.0.1:3306)/bebra")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	fmt.Println("подключено к базе")

}
